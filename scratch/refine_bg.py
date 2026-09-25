import cv2
import numpy as np
from PIL import Image

def remove_backdrop(input_path, output_path):
    img = cv2.imread(input_path)
    h, w, _ = img.shape

    # Convert to LAB for luminance and chroma
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    # White backdrop has high L (Luminance > 210 in 0-255 scale) and near-zero chroma (a ~ 128, b ~ 128)
    chroma = np.sqrt((a.astype(float) - 128)**2 + (b.astype(float) - 128)**2)
    
    # Backdrop probability mask: high L and low chroma
    is_white_bg = (l > 215) & (chroma < 12)

    # Perform floodFill connected component analysis from image borders to reach all backdrop pixels
    bg_seed_mask = np.zeros((h + 2, w + 2), np.uint8)
    ff_img = img.copy()

    # Seeds along edges
    border_seeds = []
    for x in range(0, w, 20):
        border_seeds.append((x, 0))
        border_seeds.append((x, h - 1))
    for y in range(0, h, 20):
        border_seeds.append((0, y))
        border_seeds.append((w - 1, y))

    lo = (15, 15, 15)
    up = (15, 15, 15)

    for seed in border_seeds:
        # Only seed if pixel is whitish
        px_l = l[seed[1], seed[0]]
        if px_l > 190:
            cv2.floodFill(ff_img, bg_seed_mask, seed, (0, 0, 0), lo, up, cv2.FLOODFILL_FIXED_RANGE)

    floodfilled_bg = bg_seed_mask[1:-1, 1:-1] == 1

    # Combine floodfill with white color mask
    final_bg_mask = floodfilled_bg | (is_white_bg & floodfilled_bg)

    # Refine Alpha Channel
    alpha = np.ones((h, w), dtype=np.float32) * 255.0

    # Distance to pure white in BGR space
    diff = np.max(np.abs(img.astype(float) - [255.0, 255.0, 255.0]), axis=2)

    # Hard background
    alpha[final_bg_mask] = 0.0

    # Anti-aliasing / soft edge transition for pixels near the border
    bg_dist = cv2.distanceTransform((final_bg_mask == 0).astype(np.uint8), cv2.DIST_L2, 3)
    edge_zone = (bg_dist > 0) & (bg_dist < 3)
    alpha[edge_zone] = np.clip((bg_dist[edge_zone] / 3.0) * 255.0, 0, 255)

    # Convert to RGBA
    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)
    img_rgba[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)

    out_pil = Image.fromarray(img_rgba)
    out_pil.save(output_path, "PNG")
    print(f"Processed: {output_path}")

remove_backdrop('public/images/Base_image_desktop.png', 'scratch/Base_image_desktop_transparent.png')
remove_backdrop('public/images/Reveal_image_desktop.png', 'scratch/Reveal_image_desktop_transparent.png')
