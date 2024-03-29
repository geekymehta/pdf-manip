const PDFLib = require("pdf-lib");

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(new Uint8Array(reader.result));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function encryptPDF(inputFile, password) {
  const pdfBytes = await readFile(inputFile);
  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
  await pdfDoc.encrypt({ password });
  return pdfDoc;
}

module.exports = encryptPDF;

// const PDFLib = require("pdf-lib");

// import fetch from "node-fetch";

// async function encryptPDF(inputPath, password) {
//   const response = await fetch(inputPath);
//   const pdfBytes = await response.arrayBuffer();
//   const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
//   await pdfDoc.encrypt({ password });
//   return pdfDoc;
//   //   const encryptedBytes = await pdfDoc.save();

//   //   // Create a Blob from the encrypted PDF bytes
//   //   const blob = new Blob([encryptedBytes], { type: "application/pdf" });

//   //   // Create a download link for the encrypted PDF
//   //   const link = document.createElement("a");
//   //   link.href = URL.createObjectURL(blob);
//   //   link.download = "encrypted.pdf";
//   //   link.textContent = "Download encrypted PDF";

//   //   return link;
// }

// module.exports = encryptPDF;
