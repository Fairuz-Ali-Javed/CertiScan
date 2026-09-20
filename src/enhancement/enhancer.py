import cv2
from .grayscale import to_grayscale
from .denoise import denoise
from .clahe import apply_clahe
from .sharpen import sharpen
from .threshold import apply_threshold


def enhance_image(image):
    """
    Complete image enhancement pipeline.

    Returns:
        Dictionary containing different processed versions
        of the input image.
    """

    gray = to_grayscale(image)

    denoised = denoise(gray)

    contrast = apply_clahe(denoised)

    sharp = sharpen(contrast)

    threshold = apply_threshold(sharp)

    return {
        "gray": gray,
        "denoised": denoised,
        "contrast": contrast,
        "sharp": sharp,
        "threshold": threshold
    }