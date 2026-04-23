Importing `public/fts.txt` into `src/lib/gita.json`

Quick steps:

1. Ensure `public/fts.txt` exists (you already added it).
2. Install node deps if not already:

```bash
pnpm install
```

3. Run the parser:

```bash
pnpm run import:fts
```

What the script does:
- Scans `public/fts.txt` for paragraphs and chapter headings (simple heuristics).
- Attaches paragraph chunks to the nearest detected chapter in `src/lib/gita.json` (updates `verses[0].hindi`).

Notes and next steps:
- This is a best-effort parser for the FTS export. If content isn't placed correctly, paste the `src/lib/gita.json` chapter or the relevant `public/fts.txt` section and I'll refine the rules.
- If your PDF is scanned (no selectable text), we'll need an OCR step (Tesseract) instead.
