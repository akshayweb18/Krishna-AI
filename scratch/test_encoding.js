const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'fts.txt');
if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf16le');
    console.log(content.slice(0, 1000));
} else {
    console.log('File not found');
}
