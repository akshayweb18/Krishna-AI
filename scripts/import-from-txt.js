#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const txtPath = path.join(process.cwd(), 'public', 'gita-note.txt')
const outPath = path.join(process.cwd(), 'src', 'lib', 'gita.json')

if (!fs.existsSync(txtPath)) {
    console.error('Text file not found at', txtPath)
    process.exit(1)
}

const raw = fs.readFileSync(txtPath, 'utf8')
let text = raw.replace(/\r/g, '\n')

// normalize spacing
text = text.replace(/\n{2,}/g, '\n\n')

let gita = { title: 'Bhagavad Gita (imported from txt)', chapters: [] }
try {
    const existing = require(outPath)
    if (existing && Array.isArray(existing.chapters)) gita = existing
} catch (e) {
    // no existing
}

// Heading detection: lines containing the word 'अध्याय' or common ordinal+अध्याय
const headingRegex = /(^|\n)\s*(?:अध्याय\b[^\n]*|पहला अध्याय|दूसरा अध्याय|तीसरा अध्याय|चौथा अध्याय|प(?:ा|ाँ|ँ)चव(?:ा|ों)? अध्याय|छठ[वॉो]* अध्याय|सातव(?:ा|व)ं अध्याय|आठव(?:ा|व)ं अध्याय|नव(?:ा|ं) अध्याय|दसव(?:ा|ं) अध्याय|ग्यारहव(?:ा|ं) अध्याय|बारहव(?:ा|ं) अध्याय|तेरहव(?:ा|ं) अध्याय|चौदहव(?:ा|ं) अध्याय|पंद्रहव(?:ा|ं) अध्याय|सोलहव(?:ा|ं) अध्याय|सत्रहव(?:ा|ं) अध्याय|अठारहव(?:ा|ं) अध्याय)/gi

const matches = []
let m
while ((m = headingRegex.exec(text)) !== null) {
    matches.push({ index: m.index + (m[1] ? 1 : 0), title: (m[0] || '').trim() })
}

let parts = []
if (matches.length >= 1) {
    for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index
        const end = i + 1 < matches.length ? matches[i + 1].index : text.length
        const chunk = text.slice(start, end).trim()
        parts.push(chunk)
    }
} else {
    // fallback: if no headings found, split by 'अर्जुन उवाच' or by equal parts
    const splitBy = /अर्जुन उवाच|संजय उवाच|धृतराष्ट्र उवाच/gi
    const r = text.split(splitBy).map(s => s.trim()).filter(Boolean)
    if (r.length >= 18) parts = r
    else {
        const approx = Math.ceil(text.length / 18)
        for (let i = 0; i < 18; i++) {
            const s = i * approx
            const e = Math.min((i + 1) * approx, text.length)
            parts.push(text.slice(s, e).trim())
        }
    }
}

// Map parts to existing chapters sequentially
for (let i = 0; i < Math.min(parts.length, gita.chapters.length); i++) {
    const chunk = parts[i]
    if (!chunk || chunk.length < 10) continue
    gita.chapters[i].verses = [{ id: 1, sanskrit: '', hindi: chunk.trim(), english: '' }]
}

fs.writeFileSync(outPath, JSON.stringify(gita, null, 2), 'utf8')
console.log('Imported text into', outPath)
