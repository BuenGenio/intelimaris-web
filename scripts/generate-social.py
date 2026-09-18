"""Regenerate the site's original vector social cards (optional: Python + CairoSVG).
The checked-in PNGs are used by production; deployment has no Python dependency.
"""
from pathlib import Path
from html import escape
import cairosvg
import base64

out = Path(__file__).resolve().parents[1] / 'public/assets/social'
out.mkdir(parents=True, exist_ok=True)
cards = {
    'home': ('CONNECTED BOATING', ['Your day on the water.', 'Connected.']),
    'hardware': ('CONNECTED SYSTEMS', ['Marine hardware.', 'Made for your vessel.']),
    'audiences': ('YOUR PERSPECTIVE', ['Find your view', 'on the water.']),
    'marinas': ('INTELIMARINA + DOCK PASS', ['From approach', 'to alongside.']),
    'waterwayz': ('WATERWAYZ', ['Your whole boating', 'experience. Connected.']),
    'geospatial': ('SURVEY & GEOSPATIAL', ['A closer look', 'at the waterfront.']),
    'company': ('THE PEOPLE BEHIND THE PLATFORM', ['Technology for', 'life on the water.']),
    'platform': ('THE INTELIMARIS PLATFORM', ['Navigate. Monitor.', 'Arrive.']),
}
wordmark = base64.b64encode((out.parent / 'wordmark.png').read_bytes()).decode()
for slug, (label, lines) in cards.items():
    title = ''.join(f'<tspan x="66" y="{280 + i * 75}">{escape(line)}</tspan>' for i, line in enumerate(lines))
    grid = ''.join(f'<path d="M{x} 0v630"/>' for x in range(894, 1200, 64)) + ''.join(f'<path d="M864 {y}h336"/>' for y in range(38, 630, 64))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#ffffff"/><rect x="864" width="336" height="630" fill="#172f42"/>
<g stroke="#315065" stroke-width="1" fill="none">{grid}</g>
<g stroke="#729bb4" stroke-width="1.5" fill="none"><circle cx="1012" cy="208" r="96"/><circle cx="1012" cy="208" r="60"/><path d="M912 519V386l158-104v-92" stroke="#9ac4df" stroke-width="3"/><circle cx="912" cy="519" r="7" fill="#172f42"/><circle cx="1070" cy="190" r="7" fill="#172f42"/></g>
<path d="m1060 158 10-22 10 22-10-5Z" fill="#d3e3ed"/>
<image x="66" y="52" width="265" height="68" href="data:image/png;base64,{wordmark}"/>
<path d="M66 153h730" stroke="#c5cdd1"/>
<text x="66" y="208" font-family="DejaVu Sans,sans-serif" font-size="14" letter-spacing="2" fill="#25639a">{escape(label)}</text>
<text font-family="DejaVu Sans,sans-serif" font-size="57" letter-spacing="-2.5" font-weight="bold" fill="#242c38">{title}</text>
<text x="66" y="460" font-family="DejaVu Sans,sans-serif" font-size="19" fill="#556371">Navigation · Vessel monitoring · Marina operations</text>
<path d="M66 528h730" stroke="#c5cdd1"/>
<text x="66" y="572" font-family="DejaVu Sans,sans-serif" font-size="20" fill="#25639a">intelimaris.com</text>
<text x="1150" y="574" text-anchor="end" font-family="DejaVu Sans,sans-serif" font-size="13" letter-spacing="2" fill="#b0c5d3">ON THE WATER</text></svg>'''
    (out / f'{slug}.svg').write_text(svg)
    cairosvg.svg2png(bytestring=svg.encode(), write_to=str(out / f'{slug}.png'))
print(f'Generated {len(cards)} social cards.')
