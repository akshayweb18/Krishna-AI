#!/usr/bin/env node
// Simple PDF import script: reads public/Geeta Prabodhini_text.pdf
// and populates src/lib/gita.json chapter texts (placed into the `hindi` field).

const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')

const pdfPath = path.join(process.cwd(), 'public', 'Geeta Prabodhini_text.pdf')
const outPath = path.join(process.cwd(), 'src', 'lib', 'gita.json')

if (!fs.existsSync(pdfPath)) {
    console.error('PDF not found at', pdfPath)
    process.exit(1)
}

const dataBuffer = fs.readFileSync(pdfPath)

pdf(dataBuffer).then(function (data) {
    let text = (data.text || '').replace(/\r/g, '\n')
    // normalize multiple empty lines
    text = text.replace(/\n{2,}/g, '\n\n')

    let gita = { title: 'Bhagavad Gita (imported)', chapters: [] }
    try {
        const existing = require(outPath)
        if (existing && Array.isArray(existing.chapters)) {
            gita = existing
        }
    } catch (e) {
        // no existing file
    }

    // Attempt to detect chapter headings in Hindi (अध्याय) or English (Chapter)
    const chapHeadingRegex = /(?:^|\n)(अध्याय\s*[०-९0-9]+(?:[^\n]*)|Chapter\s+\d+(?:[^\n]*))/g
    const chapMatches = []
    let m
    while ((m = chapHeadingRegex.exec(text)) !== null) {
        chapMatches.push({ index: m.index + (m[0].startsWith('\n') ? 1 : 0), text: m[1] || m[0] })
    }

    if (chapMatches.length >= 2) {
        // split by detected headings
        for (let i = 0; i < chapMatches.length; i++) {
            const start = chapMatches[i].index
            const end = i + 1 < chapMatches.length ? chapMatches[i + 1].index : text.length
            const chunk = text.slice(start, end).trim()
            // try to extract chapter number from heading
            const numMatch = chapMatches[i].text.match(/(\d+|[०-९]+)/)
            let chapNum = i + 1
            if (numMatch) {
                chapNum = parseInt(numMatch[0].replace(/[०-९]/g, (d) => '०१२३४५६७८९'.indexOf(d))) || chapNum
            }
            const chapIndex = chapNum - 1
            if (!gita.chapters[chapIndex]) gita.chapters[chapIndex] = { id: chapNum, name: chapMatches[i].text.trim(), subtitle: '', verses: [] }
            // split verses within a chapter by verse numbers (Devanagari or Arabic)
            const verseRegex = /(?:\n|^)\s*([०-९]+|[0-9]+)\s*[)\.:\-\u0964]?/g
            const verseIndices = []
            let vm
            while ((vm = verseRegex.exec(chunk)) !== null) {
                verseIndices.push({ index: vm.index + (vm[0].startsWith('\n') ? 1 : 0), num: vm[1] })
            }

            if (verseIndices.length >= 1) {
                for (let v = 0; v < verseIndices.length; v++) {
                    const s = verseIndices[v].index
                    const e = v + 1 < verseIndices.length ? verseIndices[v + 1].index : chunk.length
                    const vtext = chunk.slice(s, e).trim()
                    const vid = parseInt(verseIndices[v].num.replace(/[०-९]/g, (d) => '०१२३४५६७८९'.indexOf(d))) || v + 1
                    function stripLeadingNum(str) {
                        return str.replace(/^\s*(?:[0-9]+|[०-९]+)[\)\.\:\-–—\s]*/, '').trim()
                    }
                    function splitSanskritHindi(block) {
                        const textB = block.trim()
                        const hasDanda = /॥|।/.test(textB)
                        if (hasDanda) {
                            const idx2 = textB.indexOf('॥')
                            const idx1 = textB.indexOf('।')
                            let idx = -1
                            let len = 0
                            if (idx2 >= 0) { idx = idx2; len = 2 } else if (idx1 >= 0) { idx = idx1; len = 1 }
                            if (idx >= 0) {
                                const sans = stripLeadingNum(textB.slice(0, idx + len))
                                const rest = textB.slice(idx + len).trim()
                                return { sanskrit: sans, hindi: rest }
                            }
                        }
                        const lines = textB.split(/\n+/).map(s => s.trim()).filter(Boolean)
                        if (lines.length >= 2 && lines[0].length < 80) {
                            let sans = stripLeadingNum(lines[0])
                            if (lines[1].length < 80) sans = sans + '\n' + stripLeadingNum(lines[1])
                            const rest = lines.slice(sans.split(/\n/).length).join('\n').trim()
                            return { sanskrit: sans.trim(), hindi: rest }
                        }
                        return { sanskrit: '', hindi: textB }
                    }
                    const parts = splitSanskritHindi(vtext)
                    function isDevanagari(s) { return /[\u0900-\u097F]/.test(s) }
                    const verseObj = { id: vid, sanskrit: '', hindi: '', english: '' }
                    if (parts.sanskrit) {
                        if (isDevanagari(parts.sanskrit)) verseObj.sanskrit = parts.sanskrit
                        else verseObj.english = (verseObj.english ? verseObj.english + '\n' : '') + parts.sanskrit
                    }
                    if (parts.hindi) {
                        if (isDevanagari(parts.hindi)) verseObj.hindi = parts.hindi
                        else verseObj.english = (verseObj.english ? verseObj.english + '\n' : '') + parts.hindi
                    }
                    // if nothing detected, put full text into hindi by default
                    if (!verseObj.sanskrit && !verseObj.hindi && !verseObj.english) verseObj.hindi = vtext
                    gita.chapters[chapIndex].verses.push(verseObj)
                }
            } else {
                // whole chapter as single block - attempt to split sanskrit vs hindi
                function stripLeadingNum(str) {
                    return str.replace(/^\s*(?:[0-9]+|[०-९]+)[\)\.\:\-–—\s]*/, '').trim()
                }
                function splitSanskritHindi(block) {
                    const textB = block.trim()
                    const hasDanda = /॥|।/.test(textB)
                    if (hasDanda) {
                        const idx2 = textB.indexOf('॥')
                        const idx1 = textB.indexOf('।')
                        let idx = -1
                        let len = 0
                        if (idx2 >= 0) { idx = idx2; len = 2 } else if (idx1 >= 0) { idx = idx1; len = 1 }
                        if (idx >= 0) {
                            const sans = stripLeadingNum(textB.slice(0, idx + len))
                            const rest = textB.slice(idx + len).trim()
                            return { sanskrit: sans, hindi: rest }
                        }
                    }
                    const lines = textB.split(/\n+/).map(s => s.trim()).filter(Boolean)
                    if (lines.length >= 2 && lines[0].length < 80) {
                        let sans = stripLeadingNum(lines[0])
                        if (lines[1].length < 80) sans = sans + '\n' + stripLeadingNum(lines[1])
                        const rest = lines.slice(sans.split(/\n/).length).join('\n').trim()
                        return { sanskrit: sans.trim(), hindi: rest }
                    }
                    return { sanskrit: '', hindi: textB }
                }
                const parts = splitSanskritHindi(chunk)
                function isDevanagari(s) { return /[\u0900-\u097F]/.test(s) }
                const verseObj = { id: 1, sanskrit: '', hindi: '', english: '' }
                if (parts.sanskrit) {
                    if (isDevanagari(parts.sanskrit)) verseObj.sanskrit = parts.sanskrit
                    else verseObj.english = (verseObj.english ? verseObj.english + '\n' : '') + parts.sanskrit
                }
                if (parts.hindi) {
                    if (isDevanagari(parts.hindi)) verseObj.hindi = parts.hindi
                    else verseObj.english = (verseObj.english ? verseObj.english + '\n' : '') + parts.hindi
                }
                if (!verseObj.sanskrit && !verseObj.hindi && !verseObj.english) verseObj.hindi = chunk
                gita.chapters[chapIndex].verses = [verseObj]
            }
        }
        console.log('Imported using detected chapter headings:', chapMatches.length)
    } else {
        // fallback: try to split by 'अध्याय' occurrences more loosely
        const looseCh = [...text.matchAll(/अध्याय/gi)]
        if (looseCh.length >= 2) {
            const positions = looseCh.map((x) => x.index)
            for (let i = 0; i < positions.length; i++) {
                const start = positions[i]
                const end = i + 1 < positions.length ? positions[i + 1] : text.length
                const chunk = text.slice(start, end).trim()
                const chapIndex = i
                if (!gita.chapters[chapIndex]) gita.chapters[chapIndex] = { id: chapIndex + 1, name: `Chapter ${chapIndex + 1}`, subtitle: '', verses: [] }
                gita.chapters[chapIndex].verses = [{ id: 1, sanskrit: '', hindi: chunk, english: '' }]
            }
            console.log('Imported using loose "अध्याय" matches')
        } else {
            // final fallback: split into 18 approx parts
            const parts = 18
            const approx = Math.ceil(text.length / parts)
            for (let i = 0; i < parts; i++) {
                const start = i * approx
                const end = Math.min((i + 1) * approx, text.length)
                const chunk = text.slice(start, end).trim()
                if (!gita.chapters[i]) gita.chapters[i] = { id: i + 1, name: `Chapter ${i + 1}`, subtitle: '', verses: [] }
                gita.chapters[i].verses = [{ id: 1, sanskrit: '', hindi: chunk, english: '' }]
            }
            console.log('Fallback import: split text into 18 parts')
        }
    }

    fs.writeFileSync(outPath, JSON.stringify(gita, null, 2), 'utf8')
    console.log('Wrote', outPath)
})
    .catch(function (err) {
        console.error('PDF parse error', err)
        process.exit(1)
    })
