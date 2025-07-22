const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(file) {
  if (!file) return '';

  if (file.mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(file.path);
    const parsed = await pdfParse(dataBuffer);
    return parsed.text;
  }

  if (file.mimetype.includes('wordprocessingml.document')) {
    const result = await mammoth.extractRawText({ path: file.path });
    return result.value;
  }

  return '';
}

module.exports = { extractText };
