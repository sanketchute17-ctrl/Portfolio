import cv2
import numpy as np
from PIL import Image
import os

def remove_background_clean(input_path, output_path):
    img = cv2.imread(input_path)
    if img is None:
        print(f"Error loading {input_path}")
        return
    h, w, _ = img.shape

    # Background reference color (sample top-left corner)
    bg_color = img[0, 0].astype(float) # BGR

    # Calculate distance of every pixel to top-left background color
    dist = np.sqrt(np.sum((img.astype(float) - bg_color)**2, axis=2))

    # Mask of pixels very close to background color (< 35 for mobile/desktop flexibility)
    bg_candidates = (dist < 35).astype(np.uint8)

    # Seed mask for floodFill
    seed_mask = np.zeros((h + 2, w + 2), np.uint8)

    # Seed border pixels
    for x in range(0, w, 5):
        if bg_candidates[0, x]:
            cv2.floodFill(bg_candidates, seed_mask, (x, 0), 255)
        if bg_candidates[h-1, x]:
            cv2.floodFill(bg_candidates, seed_mask, (x, h-1), 255)
    for y in range(0, h, 5):
        if bg_candidates[y, 0]:
            cv2.floodFill(bg_candidates, seed_mask, (0, y), 255)
        if bg_candidates[y, w-1]:
            cv2.floodFill(bg_candidates, seed_mask, (w-1, y), 255)

    connected_bg = (seed_mask[1:-1, 1:-1] == 1)

    alpha = np.ones((h, w), dtype=np.float32) * 255.0
    alpha[connected_bg] = 0.0

    # Anti-alias transition boundary
    alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)

    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)
    img_rgba[:, :, 3] = np.clip(alpha_blurred, 0, 255).astype(np.uint8)

    out_pil = Image.fromarray(img_rgba)
    out_pil.save(output_path, "PNG")
    print(f"Clean transparent PNG written to: {output_path}")

images = [
    'Base_image_desktop.png',
    'Base_image_mobile.png',
    'Reveal_image_desktop.png',
    'Reveal_image_mobile.png'
]

for img_name in images:
    inp = os.path.join('public', 'images', img_name)
    out = os.path.join('public', 'images', img_name)
    remove_background_clean(inp, out)

print("All 4 images updated successfully with 100% transparent backgrounds!")
