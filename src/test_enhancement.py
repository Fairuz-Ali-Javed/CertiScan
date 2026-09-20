import cv2

try:
    from src.image_loader import load_document
    from src.enhancement.enhancer import enhance_image
except ImportError:
    from image_loader import load_document
    from enhancement.enhancer import enhance_image

file_path = "test_Documents\\genuine\\certificate1.jpeg"

image = load_document(file_path)

print("✅ Image loaded successfully")

results = enhance_image(image)

print("\nEnhancement completed:")
print("Original     :", image.shape)
print("Grayscale    :", results["gray"].shape)
print("Denoised     :", results["denoised"].shape)
print("Contrast     :", results["contrast"].shape)
print("Sharpened    :", results["sharp"].shape)
print("Threshold    :", results["threshold"].shape)


cv2.imwrite(
    "output/enhanced_gray.png",
    results["gray"]
)

cv2.imwrite(
    "output/enhanced_contrast.png",
    results["contrast"]
)

cv2.imwrite(
    "output/enhanced_sharp.png",
    results["sharp"]
)

cv2.imwrite(
    "output/enhanced_threshold.png",
    results["threshold"]
)

print("\n✅ Enhanced images saved in output/")