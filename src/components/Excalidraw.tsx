import { exportToCanvas, loadFromBlob } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";

type Props = {};

function ExcalidrawViewer({}: Props) {
  const [canvasUrl, setCanvasUrl] = useState("");

  useEffect(() => {
    const execPromise = async () => {
      const file = await fetch("sample.excalidraw");
      const blob = await file.blob();
      const content = await loadFromBlob(blob, null, null);

      const canvas = await exportToCanvas({
        elements: content.elements,
        appState: {
          ...content.appState,
          exportWithDarkMode: true,
        },
        files: content.files,
      });
      setCanvasUrl(canvas.toDataURL());
    };
    execPromise();
  }, []);

  return (
    <div className="export export-canvas w-full">
      <img className="w-full" src={canvasUrl} alt="Excalidraw canvas" />
    </div>
  );
}

export default ExcalidrawViewer;
