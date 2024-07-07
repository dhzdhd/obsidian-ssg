from spire.pdf import PdfDocument, FileFormat
import sys
import os
from pathlib import Path


# ! Too slow to be viable, takes upwards of 20 seconds per file

md_folder = sys.argv[1]


for dir_path, _, file_paths in os.walk(md_folder):
    for md_file in file_paths:
        file_path = Path(f"{dir_path}/{md_file}")

        if str(file_path).endswith(".pdf"):
            save_path = file_path.with_suffix(".html")
            doc = PdfDocument()

            doc.LoadFromFile(str(file_path))
            doc.ConvertOptions.SetPdfToHtmlOptions(False, True, 1, False)
            doc.SaveToFile(str(save_path), FileFormat.HTML)

            doc.Close()
