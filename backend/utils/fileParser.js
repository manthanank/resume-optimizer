const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(file) {
  if (!file) return '';

  if (file.mimetype === 'application/pdf') {
    const parsed = await pdfParse(file.buffer);
    return parsed.text;
  }

  if (file.mimetype.includes('wordprocessingml.document')) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }

  return '';
}

module.exports = { extractText };
