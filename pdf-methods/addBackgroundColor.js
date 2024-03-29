const { PDFDocument, rgb } = require("pdf-lib");
const pdfArray = require("./pdfArray");

async function addBackgroundColor(fileInput, backgroundColor) {
  const file = fileInput.files[0];
  const arrayBuffer = await pdfArray(file);

  const inputPdfDoc = await PDFDocument.load(arrayBuffer);
  const inputPages = inputPdfDoc.getPages();

  const outputPdfDoc = await PDFDocument.create(); // creating a separate PDF document for the output
  const copiedPages = await outputPdfDoc.copyPages(
    inputPdfDoc,
    inputPages.map((_, i) => i)
  );

  copiedPages.forEach((page) => {
    outputPdfDoc.addPage(page);
    page.drawRectangle({
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
      color: rgb(backgroundColor[0], backgroundColor[1], backgroundColor[2]),
    });
  });

  const modifiedBytes = await outputPdfDoc.save();
  const bgColoredPdfDoc = await PDFDocument.load(modifiedBytes);

  return bgColoredPdfDoc;
}

module.exports = addBackgroundColor;
