<script lang="ts">
  import PdfViewer from "svelte-pdf";

  export let url: string;

  //   import * as PDFJS from "pdfjs-dist";
  //   import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

  //   async function loadPDF(node: any, data: { url: string }) {
  //     const loadingTask = PDFJS.getDocument(data.url);
  //     const pdf = await loadingTask.promise;
  //     const page = await pdf.getPage(1);

  //     const scale = 1;
  //     const viewport = page.getViewport({ scale });
  //     const canvas = node;

  //     const context = canvas.getContext("2d");

  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;
  //     const renderContext = {
  //       canvasContext: context,
  //       viewport: viewport,
  //     };

  //     await page.render(renderContext);
  //   }
</script>

<PdfViewer
  data={undefined}
  {url}
  showButtons={[]}
  showBorder={false}
  scale={1}
/>
<!-- <canvas use:loadPDF={{ url: url }}></canvas> -->
