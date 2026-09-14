#!/usr/bin/env python3
"""Fail-closed publication inventory and preview-asset checks."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path


ENTRY_RE = re.compile(r"@(?!comment\b)\w+\s*\{\s*([^,\s]+)\s*,", re.IGNORECASE)
FIELD_RE = re.compile(r"^\s*(\w+)\s*=\s*\{(.*)\}\s*,?\s*$")
TOP_KEY_RE = re.compile(r"^([A-Za-z0-9_-]+):\s*$")
ASSET_RE = re.compile(r"^\s+(?:image|poster|animation):\s*['\"]?([^'\"\s]+)")
TITLE_RE = re.compile(r"\btitle\s*=\s*\{([^}]+)\}", re.IGNORECASE | re.DOTALL)
LIQUID_COMMENT_RE = re.compile(r"\{%\s*comment\s*%\}.*?\{%\s*endcomment\s*%\}", re.DOTALL)
IMAGE_INPUT_SUFFIXES = {".jpg", ".jpeg", ".png", ".tiff", ".gif"}
VALIDATED_IMAGE_SUFFIXES = IMAGE_INPUT_SUFFIXES | {".webp"}


def bib_keys(path: Path) -> list[str]:
    return ENTRY_RE.findall(path.read_text(encoding="utf-8"))


def bib_entries(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    starts = list(ENTRY_RE.finditer(text))
    return {
        match.group(1): text[match.start() : (starts[index + 1].start() if index + 1 < len(starts) else len(text))]
        for index, match in enumerate(starts)
    }


def yaml_inventory(path: Path) -> tuple[set[str], list[str]]:
    keys: set[str] = set()
    assets: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if match := TOP_KEY_RE.match(line):
            keys.add(match.group(1))
        if match := ASSET_RE.match(line):
            assets.append(match.group(1))
    return keys, assets


def audit(root: Path, site: Path | None = None, validate_images: bool = False) -> list[str]:
    failures: list[str] = []
    public_path = root / "_bibliography/papers.bib"
    paused_path = root / "_bibliography/ecrl-paused.bib"
    public_list = bib_keys(public_path)
    paused_list = bib_keys(paused_path)
    public, paused = set(public_list), set(paused_list)
    if len(public_list) != len(public):
        failures.append("papers.bib contains duplicate keys")
    if len(paused_list) != len(paused):
        failures.append("paused bibliography contains duplicate keys")
    for key in sorted(public & paused):
        failures.append(f"{key}: cannot be public and paused")

    public_surfaces = list((root / "_news").glob("*.md")) + list((root / "_projects").glob("*.md"))
    about = root / "_pages/about.md"
    if about.is_file():
        public_surfaces.append(about)
    paused_titles = TITLE_RE.findall(paused_path.read_text(encoding="utf-8"))
    for surface in public_surfaces:
        visible_source = LIQUID_COMMENT_RE.sub("", surface.read_text(encoding="utf-8"))
        for title in paused_titles:
            if " ".join(title.split()) in " ".join(visible_source.split()):
                failures.append(f"paused title exposed in {surface.relative_to(root)}: {title}")

    figures, figure_assets = yaml_inventory(root / "_data/publication_previews.yml")
    demos, demo_assets = yaml_inventory(root / "_data/publication_demos.yml")
    metadata_keys = figures | demos
    for key in sorted(metadata_keys - public - paused):
        failures.append(f"{key}: preview metadata has no public or paused bibliography entry")

    entries = bib_entries(public_path)
    for key in sorted(public):
        has_legacy_preview = re.search(r"^\s*preview\s*=", entries[key], re.MULTILINE) is not None
        if key not in metadata_keys and not has_legacy_preview:
            failures.append(f"{key}: no preview metadata or legacy preview")

    preview_root = root / "assets/img/publication_preview"
    image_inputs: dict[Path, list[Path]] = {}
    for path in (root / "assets/img").rglob("*"):
        if path.is_file() and path.suffix.lower() in IMAGE_INPUT_SUFFIXES:
            image_inputs.setdefault(path.with_suffix(""), []).append(path)
    for paths in image_inputs.values():
        if len(paths) > 1:
            failures.append("image derivative collision: " + ", ".join(str(path.relative_to(root)) for path in paths))
    for asset in figure_assets + demo_assets:
        path = preview_root / asset
        if not path.is_file():
            failures.append(f"missing preview asset: {asset}")

    demo_paths = [preview_root / asset for asset in demo_assets]
    animations = [
        path
        for path in demo_paths
        if "poster" not in path.stem and path.suffix.lower() in {".gif", ".webp"} and path.is_file()
    ]
    posters = [path for path in demo_paths if "poster" in path.stem and path.is_file()]
    for path in posters:
        if path.stat().st_size > 30_000:
            failures.append(f"demo poster exceeds 30 KB: {path.name} ({path.stat().st_size} bytes)")
    for path in animations:
        if path.stat().st_size > 700_000:
            failures.append(f"demo animation exceeds 700 KB: {path.name} ({path.stat().st_size} bytes)")
    if sum(path.stat().st_size for path in animations) > 1_300_000:
        failures.append("combined demo animations exceed 1.3 MB")

    if site is not None:
        index = site / "index.html"
        if not index.is_file():
            failures.append(f"built homepage missing: {index}")
        else:
            html = index.read_text(encoding="utf-8")
            rendered = re.findall(r'id="([^"]+)"\s+class="publication-body"', html)
            if set(rendered) != public or len(rendered) != len(public):
                failures.append(f"built homepage inventory differs: expected {sorted(public)}, found {rendered}")
            for key in sorted(paused):
                if f'id="{key}"' in html:
                    failures.append(f"{key}: paused entry rendered on homepage")
        if validate_images:
            generated = [
                path
                for path in (site / "assets/img/publication_preview").rglob("*")
                if path.is_file() and path.suffix.lower() in VALIDATED_IMAGE_SUFFIXES
            ]
            for path in generated:
                result = subprocess.run(["identify", str(path)], capture_output=True, text=True, check=False)
                if result.returncode:
                    failures.append(f"generated image cannot be decoded: {path.relative_to(site)}")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--site", type=Path)
    parser.add_argument("--validate-images", action="store_true")
    args = parser.parse_args()
    failures = audit(args.root.resolve(), args.site.resolve() if args.site else None, args.validate_images)
    if failures:
        print("PUBLICATION INVENTORY FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1
    print(f"PUBLICATION INVENTORY OK: {len(bib_keys(args.root / '_bibliography/papers.bib'))} public papers")
    return 0


if __name__ == "__main__":
    sys.exit(main())
