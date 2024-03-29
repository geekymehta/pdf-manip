const { PDFDocument } = require("pdf-lib");
const pdfArray = require("./pdfArray");

async function reversePDF(file) {
  const arrayBuffer = await pdfArray(file);
  //   const file = fileInput.files[0];
  //   const arrayBuffer = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const { pages } = pdfDoc;

  const reversedPages = pages.reverse();

  const reversedPDF = await PDFDocument.create();
  for (const page of reversedPages) {
    const [copiedPage] = await reversedPDF.copyPages(pdfDoc, [
      pdfDoc.getPageIndex(page),
    ]);
    reversedPDF.addPage(copiedPage);
  }

  const reversedBytes = await reversedPDF.save();

  //   const blob = new Blob([reversedBytes], { type: "application/pdf" });
  //   return blob;
  //    or
  //   const reversedPDFDoc = await pdfArrayToBlob(reversedBytes);
  //   or return reversedPDFDoc;

  const reversedPdfDoc = await PDFDocument.load(reversedBytes);
  return reversedPdfDoc;
}

module.exports = reversePDF;
