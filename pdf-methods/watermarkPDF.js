const { PDFDocument, rgb } = require("pdf-lib");

const pdfArray = require("./pdfArray");

async function watermarkPDF(fileInput, watermarkText = "CONFIDENTIAL") {
  const file = fileInput.files[0];
  const arrayBuffer = await pdfArray(file);
  // const arrayBuffer = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();

  for (let pageNum = 0; pageNum < totalPages; pageNum++) {
    const page = pdfDoc.getPage(pageNum);
    const { width, height } = page.getSize();
    const textFont = await pdfDoc.embedFont("Helvetica");
    const fontSize = 50;

    page.drawText(watermarkText, {
      x: width / 2,
      y: height / 2,
      font: textFont,
      fontSize,
      color: rgb(0.7, 0.7, 0.7), // Adjust color as needed
      rotate: 45,
    });
  }

  return pdfDoc;
}

module.exports = watermarkPDF;

// Example usage:
// const fileInput = document.getElementById('fileInput');
// fileInput.addEventListener('change', () => watermarkPDF(fileInput, 'Watermark Text'));
