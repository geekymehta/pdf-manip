// ./pdf-methods/compressPDF.js
const { PDFDocument } = require("pdf-lib");
const pdfArray = require("./pdfArray");

async function compressPDF(file, quality = 0.7) {
  try {
    const arrayBuffer = await pdfArray(file);

    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const { pages } = pdfDoc;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { height, width } = page.getSize();
      page.setSize(width * quality, height * quality);
    }

    const compressedBytes = await pdfDoc.save();
    const compressedPDFDoc = await PDFDocument.load(compressedBytes);

    return compressedPDFDoc;
  } catch (error) {
    console.error("Error compressing PDF:", error);
    throw error;
  }
}

module.exports = compressPDF;
