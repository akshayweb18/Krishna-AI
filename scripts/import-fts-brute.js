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

const raw = fs.readFileSync(ftsPath, 'utf8').replace(/\r/g, '')

// Split at each occurrence of the word 'अध्याय' (keep the word at the start of each segment)
let parts = raw.split(/(?=\bअध्याय\b)/i).map(s => s.trim()).filter(Boolean)

// If not enough explicit chapter markers, try alternate splits
if (parts.length < 18) {
    const alt = raw.split(/(?=\bअथ\b|\bप्रथम\b|\bपहला\b)/i).map(s => s.trim()).filter(Boolean)
    if (alt.length > parts.length) parts = alt
}

// If we still don't have 18 segments, distribute paragraphs across chapters as a fallback
if (parts.length < 18) {
    const paragraphs = raw.split(/\n\s*\n+/).map(s => s.trim()).filter(Boolean)

    if (paragraphs.length >= 18) {
        const per = Math.ceil(paragraphs.length / 18)
        parts = Array.from({ length: 18 }, (_, i) => paragraphs.slice(i * per, (i + 1) * per).join('\n\n').trim())
        console.log('import-fts-brute: used paragraph distribution fallback (', paragraphs.length, 'paragraphs ->', parts.length, 'parts )')
    } else if (parts.length > 0) {
        // Expand the existing smaller parts to 18 by repeating the last available segment
        const last = parts[parts.length - 1] || ''
        parts = Array.from({ length: 18 }, (_, i) => parts[i] || last)
        console.log('import-fts-brute: expanded', parts.length, 'parts by repeating last segment')
    } else {
        // No obvious parts found — use paragraphs even if fewer than 18, pad with empty strings
        parts = Array.from({ length: 18 }, (_, i) => paragraphs[i] || '')
        console.log('import-fts-brute: no chapter markers found; assigned available paragraphs to chapters (may be sparse)')
    }
}

const gita = JSON.parse(fs.readFileSync(gitaPath, 'utf8'))

// Overwrite chapters 1..18 with the extracted parts (best-effort)
for (let i = 0; i < 18; i++) {
    const ch = gita.chapters[i]
    const text = parts[i] || ''
    ch.verses = []
    if (text) ch.verses.push({ id: 1, sanskrit: '', hindi: text.trim(), english: '' })
}

fs.writeFileSync(gitaPath, JSON.stringify(gita, null, 2), 'utf8')
console.log('import-fts-brute: mapped', Math.min(parts.length, 18), 'segments to chapters 1-18')
console.log('Wrote', gitaPath)
