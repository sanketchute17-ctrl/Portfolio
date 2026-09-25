import cv2
import numpy as np
from PIL import Image

def process_image(input_path, output_path):
    img = cv2.imread(input_path)
    h, w, c = img.shape
    
    # Create mask: background seeds from corners/edges
    # FloodFill from top-left (0,0), top-right (w-1, 0), bottom-left (0, h-1)
    mask = np.zeros((h + 2, w + 2), np.uint8)
    
    # Create a copy for floodfilling
    ff_img = img.copy()
    
    # Floodfill tolerance
    lo_diff = (8, 8, 8)
    up_diff = (8, 8, 8)
    
    # Seeds along left edge, top edge, and top-right edge where background lives
    seeds = [(0, 0), (w - 1, 0), (0, h // 2), (w // 4, 0), (w // 2, 0), (3 * w // 4, 0)]
    for seed in seeds:
        cv2.floodFill(ff_img, mask, seed, (0, 0, 0), lo_diff, up_diff, cv2.FLOODFILL_FIXED_RANGE)
    
    # The mask contains 1 where floodfilled
    bg_mask = mask[1:-1, 1:-1] == 1
    
    # Refine mask with smooth alpha channel (anti-aliasing)
    # Convert BGR to RGBA
    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)
    
    # Compute color distance to pure background white [253, 253, 253] for soft edges
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Alpha map: 0 for bg, 255 for fg
    alpha = np.ones((h, w), dtype=np.uint8) * 255
    
    # Set floodfilled bg pixels to alpha 0
    alpha[bg_mask] = 0
    
    # Feather / anti-alias edge pixels
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    img_rgba[:, :, 3] = alpha_blurred
    
    # Save PNG with transparency
    out_pil = Image.fromarray(img_rgba)
    out_pil.save(output_path, "PNG")
    print(f"Saved transparent PNG to {output_path}")

process_image('public/images/Base_image_desktop.png', 'scratch/Base_image_desktop_no_bg.png')
process_image('public/images/Reveal_image_desktop.png', 'scratch/Reveal_image_desktop_no_bg.png')
