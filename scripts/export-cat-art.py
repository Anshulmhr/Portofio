"""Align the generated cells to a common ground line; export a compact atlas."""
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[1]
master = Image.open(root / 'docs/art-masters/wizard-cat-sprites-master.png').convert('RGBA')
atlas = Image.new('RGBA', (384, 256))
for row in range(2):
    for column in range(3):
        cell = master.crop((column*512, row*512, (column+1)*512, (row+1)*512))
        bbox = cell.getchannel('A').point(lambda value: 255 if value > 40 else 0).getbbox()
        if not bbox:
            raise ValueError('Empty sprite cell')
        dx = round(256 - (bbox[0] + bbox[2]) / 2)
        dy = 470 - bbox[3]
        aligned = Image.new('RGBA', (512, 512))
        aligned.alpha_composite(cell, (dx, dy))
        frame = aligned.resize((128, 128), Image.Resampling.NEAREST)
        atlas.alpha_composite(frame, (column*128, row*128))
atlas.save(root / 'public/art/cat-sprites.webp', lossless=True, method=6)
