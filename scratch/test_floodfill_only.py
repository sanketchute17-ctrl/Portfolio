import cv2
import numpy as np
from PIL import Image

def remove_background_clean(input_path, output_path):
    img = cv2.imread(input_path)
    h, w, _ = img.shape

    # Background reference color (sample top-left corner)
    bg_color = img[0, 0].astype(float) # BGR

    # Calculate distance of every pixel to top-left background color
    dist = np.sqrt(np.sum((img.astype(float) - bg_color)**2, axis=2))

    # Mask of pixels very close to background color (< 30)
    bg_candidates = (dist < 32).astype(np.uint8)

    # Connected components starting from image edges ONLY
    # Create seed mask for floodFill
    seed_mask = np.zeros((h + 2, w + 2), np.uint8)

    # Seed all border pixels that are bg_candidates
    for x in range(w):
        if bg_candidates[0, x]:
            cv2.floodFill(bg_candidates, seed_mask, (x, 0), 255)
        if bg_candidates[h-1, x]:
            cv2.floodFill(bg_candidates, seed_mask, (x, h-1), 255)
    for y in range(h):
        if bg_candidates[y, 0]:
            cv2.floodFill(bg_candidates, seed_mask, (0, y), 255)
        if bg_candidates[y, w-1]:
            cv2.floodFill(bg_candidates, seed_mask, (w-1, y), 255)

    # Connected background mask is where seed_mask == 1
    connected_bg = (seed_mask[1:-1, 1:-1] == 1)

    # Create smooth alpha channel
    alpha = np.ones((h, w), dtype=np.float32) * 255.0

    # Calculate smooth transition for pixels near bg boundary
    # Distance of background pixels to foreground:
    fg_mask = ~connected_bg
    fg_dist = cv2.distanceTransform(fg_mask.astype(np.uint8), cv2.DIST_L2, 5)

    # Set background alpha
    alpha[connected_bg] = 0.0

    # Anti-alias transition boundary (1-2px blur at edge)
    alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)

    # Convert to RGBA
    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)
    img_rgba[:, :, 3] = np.clip(alpha_blurred, 0, 255).astype(np.uint8)

    out_pil = Image.fromarray(img_rgba)
    out_pil.save(output_path, "PNG")
    print(f"Clean background removal saved: {output_path}")

remove_background_clean('public/images/Base_image_desktop.png', 'scratch/Base_desktop_clean.png')
remove_background_clean('public/images/Reveal_image_desktop.png', 'scratch/Reveal_desktop_clean.png')
