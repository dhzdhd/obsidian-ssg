// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// export default function PDFViewer(props: { url: string }) {
//   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//   const [numPages, setNumPages] = useState<number>();
//   function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//     setNumPages(numPages);
//   }
//   console.log(`http://localhost:4321${props.url}`);
//   const url = new URL(`http://localhost:4321${props.url}`);

//   return (
//     <Document
//       file={{ url: `http://localhost:4321/sample.pdf` }}
//       onLoadSuccess={onDocumentLoadSuccess}
//     >
//       <div className="overflow-y-auto overflow-x-hidden max-h-screen">
//         {numPages &&
//           Array.from({ length: numPages }, (_, index) => index + 1).map(
//             (pageNumber) => <Page pageNumber={pageNumber} />
//           )}
//       </div>
//     </Document>
//   );
// }
