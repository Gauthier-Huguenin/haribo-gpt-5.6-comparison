#!/usr/bin/env python3
"""Measure static artifacts produced by each model without external dependencies."""

from __future__ import annotations

import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODELS = ("sol", "terra", "luna")


class ArtifactParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.dom_elements = 0
        self.images = 0
        self.links = 0
        self.landmarks = 0
        self.h1_elements = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        self.dom_elements += 1
        self.images += tag == "img"
        self.links += tag == "a"
        self.landmarks += tag in {"header", "nav", "main", "aside", "footer"} or (
            tag == "section" and ("aria-label" in attributes or "aria-labelledby" in attributes)
        )
        self.h1_elements += tag == "h1"


def measure(model: str) -> dict[str, int]:
    folder = ROOT / model
    html = (folder / "index.html").read_bytes()
    parser = ArtifactParser()
    parser.feed(html.decode("utf-8"))

    asset_bytes = sum(path.stat().st_size for path in (folder / "assets").iterdir() if path.is_file())

    return {
        "html_bytes": len(html),
        "css_bytes": (folder / "styles.css").stat().st_size,
        "javascript_bytes": (folder / "script.js").stat().st_size,
        "asset_bytes": asset_bytes,
        "dom_elements": parser.dom_elements,
        "images": parser.images,
        "links": parser.links,
        "landmarks": parser.landmarks,
        "h1_elements": parser.h1_elements,
    }


def main() -> None:
    print(json.dumps({model: measure(model) for model in MODELS}, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
