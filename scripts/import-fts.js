const fs = require('fs')
const path = require('path')

const ftsPath = path.join(__dirname, '..', 'public', 'fts.txt')
const gitaPath = path.join(__dirname, '..', 'src', 'lib', 'gita.json')

if (!fs.existsSync(ftsPath)) {
    console.error('public/fts.txt not found. Place the FTS export at public/fts.txt')
    process.exit(1)
}
if (!fs.existsSync(gitaPath)) {
    console.error('src/lib/gita.json not found. Run this from the project root.')
    process.exit(1)
}

const gita = JSON.parse(fs.readFileSync(gitaPath, 'utf8'))

const raw = fs.readFileSync(ftsPath, 'utf8').replace(/\r/g, '')

const devanagariDigits = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' }
function devanagariToArabic(s) {
    return s.replace(/[०-९]/g, d => devanagariDigits[d])
}

function ordinalWordToNumber(s) {
    if (!s) return null
    s = s.toLowerCase()
    const map = {
        'पहला': 1, 'प्रथम': 1,
        'दूसरा': 2, 'द्वितीय': 2, 'द्वितीयो': 2,
        'तीसरा': 3, 'तृतीय': 3,
        'चौथा': 4, 'चौथ': 4,
        'पांच': 5, 'पाँच': 5, 'पाँचवों': 5, 'पंच': 5, 'पंचवां': 5, 'पंचम': 5,
        'छठ': 6, 'छठा': 6,
        'सप्तम': 7, 'सात': 7,
        'अष्टम': 8, 'अाठ': 8, 'अठारह': 18,
        'नवम': 9, 'नव': 9,
        'दशम': 10, 'दश': 10,
        'एकादश': 11, 'द्वादश': 12,
        'तेरह': 13, 'चौदह': 14, 'पंद्रह': 15, 'सोलह': 16, 'सत्रह': 17, 'अठारह': 18
    }
    for (const k of Object.keys(map)) if (s.includes(k)) return map[k]
    return null
}

// Find candidate chapter headings across the text
const headingRegex = /अध्याय|अथ\s*प्रथ|\bपहला\b|\bप्रथम\b|\bदूसरा\b|\bद्वितीय\b|\bतीसरा\b|\bतृतीय\b|\bचौथा\b|\bपंच|\bपाँच|\bछठ|\bसप्तम\b|\bअष्टम\b|\bनवम\b|\bदशम\b|\bएकादश\b|\bद्वादश\b|तेरह|चौदह|पंद्रह|सोलह|सत्रह|अठारह/gi

const indices = []
let m
while ((m = headingRegex.exec(raw)) !== null) {
    indices.push({ index: m.index, match: m[0] })
}

// If no headings found, fallback to paragraph-splitting behavior
if (indices.length === 0) {
    const paragraphs = raw.split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean)
    let current = null
    let assigned = 0
    for (const p of paragraphs) {
        // try to extract any chapter number
        const mnum = p.match(/अध्याय[^\d०-९]*(\d+|[०-९]+)/i)
        let num = null
        if (mnum && mnum[1]) num = parseInt(devanagariToArabic(mnum[1]), 10)
        if (!num) {
            const ord = ordinalWordToNumber(p.slice(0, 60))
            if (ord) num = ord
        }
        if (num && gita.chapters[num - 1]) current = num
        if (current && gita.chapters[current - 1]) {
            const ch = gita.chapters[current - 1]
            if (!ch.verses) ch.verses = []
            ch.verses.push({ id: ch.verses.length + 1, sanskrit: '', hindi: p, english: '' })
            assigned++
        }
    }
    fs.writeFileSync(gitaPath, JSON.stringify(gita, null, 2), 'utf8')
    console.log('import-fts: fallback paragraphs processed:', paragraphs.length, 'assigned:', assigned)
    console.log('Wrote', gitaPath)
    process.exit(0)
}

// Build segments from heading indices
const segments = []
for (let i = 0; i < indices.length; i++) {
    const start = indices[i].index
    const end = (i + 1 < indices.length) ? indices[i + 1].index : raw.length
    const header = raw.slice(start, Math.min(start + 120, end))
    const body = raw.slice(start, end)
    segments.push({ header, body, start })
}

let assigned = 0
let lastChapter = null
for (const seg of segments) {
    // try to detect number in header
    let num = null
    const digitMatch = seg.header.match(/([0-9]+|[०-९]+)/)
    if (digitMatch) {
        num = parseInt(devanagariToArabic(digitMatch[1]), 10)
    }
    if (!num) num = ordinalWordToNumber(seg.header)
    if (!num && lastChapter) num = lastChapter
    if (!num) {
        // try to find 'अध्याय' followed by name and later a number inside body
        const late = seg.body.match(/अध्याय[^\d०-९]*(\d+|[०-९]+)/i)
        if (late && late[1]) num = parseInt(devanagariToArabic(late[1]), 10)
    }
    if (!num) continue
    lastChapter = num
    if (gita.chapters && gita.chapters[num - 1]) {
        const ch = gita.chapters[num - 1]
        if (!ch.verses) ch.verses = []
        // remove the heading words from the body for cleanliness
        let body = seg.body
        // strip common heading prefix
        body = body.replace(/^([\s\S]*?\bअध्याय\b[\s\S]{0,120})/i, '').trim()

        // Verse splitting heuristics
        function splitIntoVerses(text) {
            const verses = []
            // Try explicit numbered verses (Devanagari or Arabic)
            const numRegex = /(?:^|\n)\s*([0-9]+|[०-९]+)\s*[\.)\-:\u0964\u0965]?/g
            let match
            const positions = []
            while ((match = numRegex.exec(text)) !== null) {
                positions.push({ idx: match.index, label: match[1] })
            }
            if (positions.length >= 2) {
                for (let i = 0; i < positions.length; i++) {
                    const start = positions[i].idx
                    const end = (i + 1 < positions.length) ? positions[i + 1].idx : text.length
                    let v = text.slice(start, end).trim()
                    // remove leading number token
                    v = v.replace(/^(?:[\s\n]*([0-9]+|[०-९]+)\s*[\.)\-:\u0964\u0965]?)/, '').trim()
                    if (v) verses.push(v)
                }
                return verses
            }

            // Try splitting by double-newlines (paragraphs)
            const paras = text.split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean)
            if (paras.length > 1) return paras

            // Try splitting by danda/verse terminator '॥' or full stop '।' clusters
            const dandaSplit = text.split(/॥+|\u0964+/).map(p => p.trim()).filter(Boolean)
            if (dandaSplit.length > 1) return dandaSplit

            // Fallback: single chunk
            return [text.trim()]
        }

        const verses = splitIntoVerses(body)
        for (const v of verses) {
            ch.verses.push({ id: ch.verses.length + 1, sanskrit: '', hindi: v, english: '' })
            assigned++
        }
    }
}

fs.writeFileSync(gitaPath, JSON.stringify(gita, null, 2), 'utf8')
console.log('import-fts: segments processed:', segments.length, 'assigned:', assigned)
console.log('Wrote', gitaPath)
