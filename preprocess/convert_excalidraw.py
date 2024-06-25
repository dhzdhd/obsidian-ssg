import re
import sys
import os
from pathlib import Path
from lzstring import LZString

# https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/7ee316a605f54dcf8305024726dde252b5765a2d/src/ExcalidrawData.ts#L120
DRAWING_COMPRESSED_REG = (
    r"(\n##? Drawing\n[^`]*(?:```compressed\-json\n))([\s\S]*?)(```\n)"
)

md_folder = sys.argv[1]


for dir_path, _, file_paths in os.walk(md_folder):
    for md_file in file_paths:
        file_path = Path(f"{dir_path}/{md_file}")

        if str(file_path).endswith(".excalidraw.md"):
            with open(file_path, "r", encoding="utf8", errors="ignore") as f:
                content = f.read()

                encoded_json = (
                    re.split(DRAWING_COMPRESSED_REG, content)[2]
                    .replace("\n", "")
                    .replace("\r", "")
                )
                json = LZString.decompressFromBase64(encoded_json)

            with open(file_path, "w", encoding="utf8") as f:
                f.write(json)
