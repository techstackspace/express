import pdfParse from 'pdf-parse';
import fs from 'fs';

export async function extractPdfContent(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}
