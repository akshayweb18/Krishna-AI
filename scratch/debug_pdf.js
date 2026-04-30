const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(process.cwd(), 'public', 'Geeta Prabodhini_text.pdf');
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('scratch/pdf_text_debug.txt', data.text);
    console.log('Saved PDF text to scratch/pdf_text_debug.txt');
}).catch(err => {
    console.error(err);
});
