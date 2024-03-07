import re
import sys
import os
from pathlib import Path

md_folder = sys.argv[1]
pattern = r"(\!\[.*\]\(.+\))"
link_pattern = r"\(.*\)"


def substitute(s: str) -> str:
    link = re.findall(link_pattern, s[0])[0]
    print(link)

    if not any(
        [link.startswith("(./"), link.startswith("(.\\"), link.startswith("(https://")]
    ):
        return re.sub(link_pattern, f"(./{link[1:-1]})", s[0]).replace("%20", " ")
    return s[0].replace("%20", " ")


for dir_path, _, file_paths in os.walk(md_folder):
    for md_file in file_paths:
        file_path = Path(f"{dir_path}/{md_file}")

        if str(file_path).endswith(".md"):
            with open(file_path, "r", encoding="utf8", errors="ignore") as f:
                content = re.sub(pattern, substitute, f.read())

            with open(file_path, "w", encoding="utf8") as f:
                f.write(content)
