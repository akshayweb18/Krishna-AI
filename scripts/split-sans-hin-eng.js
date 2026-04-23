const fs = require('fs')
const path = require('path')

const gitaPath = path.join(__dirname, '..', 'src', 'lib', 'gita.json')
if (!fs.existsSync(gitaPath)) {
    console.error('src/lib/gita.json not found')
    process.exit(1)
}

const gita = JSON.parse(fs.readFileSync(gitaPath, 'utf8'))

function looksLikeSanskrit(s) {
    if (!s) return false
    // contains danda or double danda
    if (/॥|\u0964/.test(s)) return true
    // short line heuristic
    const words = s.trim().split(/\s+/).filter(Boolean)
    if (words.length <= 12 && s.length < 160) return true
    return false
}

let changed = 0
for (const ch of gita.chapters) {
    if (!ch.verses) ch.verses = []
    for (const v of ch.verses) {
        // source text could be in v.hindi (from import) or v.sanskrit
        const source = (v.hindi || v.sanskrit || '').trim()
        if (!source) continue

        // if already split, skip
        if ((v.sanskrit && v.sanskrit.trim()) || (v.hindi && v.hindi.trim() && v.sanskrit && v.sanskrit.trim())) continue

        // try paragraph split
        const paras = source.split(/\n\s*\n+/).map(s => s.trim()).filter(Boolean)
        let sans = ''
        let hin = ''
        if (paras.length >= 2) {
            if (looksLikeSanskrit(paras[0])) {
                sans = paras[0]
                hin = paras.slice(1).join('\n\n')
            } else if (looksLikeSanskrit(paras[paras.length - 1])) {
                // sometimes translation first, verse at end
                sans = paras[paras.length - 1]
                hin = paras.slice(0, paras.length - 1).join('\n\n')
            } else {
                // default: first para is translation
                hin = paras.join('\n\n')
            }
        } else {
            // single paragraph: try line split
            const lines = source.split(/\n+/).map(s => s.trim()).filter(Boolean)
            if (lines.length >= 2 && looksLikeSanskrit(lines[0])) {
                sans = lines[0]
                hin = lines.slice(1).join('\n')
            } else {
                // fallback: if contiene danda, treat as sanskrit
                if (looksLikeSanskrit(source)) {
                    sans = source
                    hin = ''
                } else {
                    hin = source
                }
            }
        }

        // assign fields
        if (sans) v.sanskrit = sans
        if (hin) v.hindi = hin
        changed++
    }
}

fs.writeFileSync(gitaPath, JSON.stringify(gita, null, 2), 'utf8')
console.log('split-sans-hin-eng: updated', changed, 'verse objects in', gitaPath)
