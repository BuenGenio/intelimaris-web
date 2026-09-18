#!/usr/bin/env python3
"""Prepare marketing screenshots from the product screen gallery.

Crops away dev-only chrome (the capture-mode overlay, unreachable-service
notices) and emits responsive WebP plus a blur-up placeholder.
"""

import json
import subprocess
from pathlib import Path

from PIL import Image

SRC = Path.home() / "Projects/workspace/docs/screen-gallery/shots"
OUT = Path(__file__).resolve().parent.parent / "public/assets/shots"
WIDTHS = [1600, 1280, 960, 640]
LQIP_WIDTH = 24

# crop: (left, top, right, bottom) in source pixels, or None for the full frame.
# patches: rectangles painted with a colour sampled at `sample`, to remove
# dev-only overlays that would misrepresent the product.
SHOTS = {
    "waterwayz-route": {
        "src": "130-flow_finding_a_marina_then_another_4.png",
        "crop": (0, 128, 1600, 857),
        "patches": [((372, 648), (740, 690), (400, 630))],
    },
    "waterwayz-map": {
        "src": "029-w_wanderer_map.png",
        "crop": (0, 128, 1600, 857),
        "patches": [],
    },
    "waterwayz-marina-card": {
        "src": "133-flow_finding_a_marina_then_another_7.png",
        "crop": (0, 128, 1600, 857),
        "patches": [],
    },
    "waterwayz-discover": {
        "src": "128-flow_finding_a_marina_then_another_2.png",
        "crop": (0, 128, 1600, 857),
        "patches": [],
    },
    "waterwayz-sensors": {
        "src": "030-w_wanderer_sensors.png",
        "crop": (0, 100, 1600, 1411),
        "patches": [],
    },
    "pms-berth-layout": {
        "src": "047-w_bahia_mar_layout.png",
        "crop": (0, 100, 1600, 857),
        "patches": [((545, 17), (765, 45), (900, 30))],
    },
    "pms-dock-editor": {
        "src": "114-w_las_olas_dock_layout.png",
        "crop": (0, 100, 1600, 857),
        "patches": [],
    },
    "pms-dashboard": {
        "src": "035-w_bahia_mar_dashboard.png",
        "crop": (0, 100, 1600, 1486),
        "patches": [],
    },
    "pms-operations": {
        "src": "074-w_bahia_mar_staff.png",
        "crop": (0, 100, 1600, 2029),
        "patches": [],
    },
    "dock-host-dashboard": {
        "src": "105-w_las_olas_dock_dashboard.png",
        "crop": (0, 100, 1600, 1328),
        "patches": [],
    },
}


def encode_avif(png: Path, dest: Path) -> bool:
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(png),
        "-c:v", "libaom-av1", "-still-picture", "1", "-crf", "34",
        "-cpu-used", "6", "-pix_fmt", "yuv420p", str(dest),
    ]
    return subprocess.run(cmd, capture_output=True).returncode == 0


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {}

    for name, spec in SHOTS.items():
        img = Image.open(SRC / spec["src"]).convert("RGB")
        if spec["crop"]:
            img = img.crop(spec["crop"])

        for (x0, y0), (x1, y1), sample in spec["patches"]:
            fill = img.getpixel(sample)
            img.paste(fill, (x0, y0, x1, y1))

        ratio = img.height / img.width
        sources = []
        for w in WIDTHS:
            if w > img.width:
                continue
            resized = img.resize((w, round(w * ratio)), Image.LANCZOS)
            webp = OUT / f"{name}-{w}.webp"
            resized.save(webp, "WEBP", quality=82, method=6)
            tmp_png = OUT / f"{name}-{w}.tmp.png"
            resized.save(tmp_png)
            avif = OUT / f"{name}-{w}.avif"
            has_avif = encode_avif(tmp_png, avif)
            tmp_png.unlink()
            sources.append({"width": w, "avif": has_avif})

        lqip = img.resize((LQIP_WIDTH, max(1, round(LQIP_WIDTH * ratio))), Image.LANCZOS)
        lqip.save(OUT / f"{name}-lqip.webp", "WEBP", quality=40)

        manifest[name] = {
            "width": img.width,
            "height": img.height,
            "widths": [s["width"] for s in sources],
            "avif": all(s["avif"] for s in sources),
        }
        print(f"{name:24} {img.width}x{img.height}  avif={manifest[name]['avif']}")

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
