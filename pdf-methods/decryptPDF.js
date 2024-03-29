const PDFLib = require("pdf-lib");
const pdfArray = require("./pdfArray");

async function decryptPDF(inputPath, password) {
  //inputPath: This is a string that represents the URL of the PDF file you want to decrypt. The function fetches the PDF file from this URL.
  const response = await fetch(inputPath);

  const pdfBytes = await pdfArray(response);
  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes, { password });
  return pdfDoc;
  //   const decryptedBytes = await pdfDoc.save();

  //   // Create a Blob from the decrypted PDF bytes
  //   const blob = new Blob([decryptedBytes], { type: "application/pdf" });

  //   // Create a download link for the decrypted PDF
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "decrypted.pdf";
  //   link.textContent = "Download decrypted PDF";

  //   return link;
}

module.exports = decryptPDF;
