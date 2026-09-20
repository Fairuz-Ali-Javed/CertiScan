import cv2

try:
    from src.preprocess import resize
    from src.grid_generator import generate_grid
    from src.enhancement.enhancer import enhance_image
except ImportError:
    from preprocess import resize
    from grid_generator import generate_grid
    from enhancement.enhancer import enhance_image


# =========================================================
# BASIC QR DETECTION
# =========================================================

def detect(detector, image):
    """
    Try to detect QR from an image.
    """

    data, points, _ = detector.detectAndDecode(image)

    if data != "":
        return data, points

    return None, None


# =========================================================
# MULTI-SCALE DETECTION
# =========================================================

def detect_multiscale(detector, image):
    """
    Try different image scales.
    """

    scales = [1.5, 2, 3, 4]

    for scale in scales:

        resized = resize(image, scale)

        data, points = detect(detector, resized)

        if data:
            return data, points, f"{scale}x Scale"

    return None, None, None


# =========================================================
# GRID DETECTION
# =========================================================

def detect_grid(detector, image):
    """
    Divide image into grids and scan each grid.
    """

    grids = generate_grid(image)

    for number, crop in grids:

        data, points = detect(detector, crop)

        if data:
            return data, points, f"Grid {number}"

    return None, None, None


# =========================================================
# GRID + MULTI-SCALE
# =========================================================

def detect_grid_multiscale(detector, image):
    """
    Scan every grid at multiple scales.
    """

    grids = generate_grid(image)

    scales = [2, 3]

    for number, crop in grids:

        for scale in scales:

            resized = resize(crop, scale)

            data, points = detect(detector, resized)

            if data:
                return data, points, f"Grid {number} ({scale}x)"

    return None, None, None


# =========================================================
# COMPLETE NORMAL IMAGE PIPELINE
# =========================================================

def scan_normal(detector, image):
    """
    Run all existing detection techniques
    on the original image.
    """

    # --------------------------
    # Original
    # --------------------------

    data, points = detect(detector, image)

    if data:
        return data, points, "Original"


    # --------------------------
    # Multi Scale
    # --------------------------

    data, points, method = detect_multiscale(
        detector,
        image
    )

    if data:
        return data, points, method


    # --------------------------
    # Grid
    # --------------------------

    data, points, method = detect_grid(
        detector,
        image
    )

    if data:
        return data, points, method


    # --------------------------
    # Grid + Multi Scale
    # --------------------------

    data, points, method = detect_grid_multiscale(
        detector,
        image
    )

    if data:
        return data, points, method


    return None, None, None


# =========================================================
# ENHANCED IMAGE PIPELINE
# =========================================================

def scan_enhanced(detector, image):
    """
    Apply image enhancement techniques and
    try QR detection on enhanced versions.
    """

    enhanced_images = enhance_image(image)

    for name, processed_image in enhanced_images.items():

        # --------------------------
        # Enhanced Original
        # --------------------------

        data, points = detect(
            detector,
            processed_image
        )

        if data:
            return data, points, f"Enhanced - {name}"


        # --------------------------
        # Enhanced Multi Scale
        # --------------------------

        data, points, method = detect_multiscale(
            detector,
            processed_image
        )

        if data:
            return data, points, f"Enhanced - {name} - {method}"


        # --------------------------
        # Enhanced Grid
        # --------------------------

        data, points, method = detect_grid(
            detector,
            processed_image
        )

        if data:
            return data, points, f"Enhanced - {name} - {method}"


        # --------------------------
        # Enhanced Grid + Multi Scale
        # --------------------------

        data, points, method = detect_grid_multiscale(
            detector,
            processed_image
        )

        if data:
            return data, points, f"Enhanced - {name} - {method}"


    return None, None, None


# =========================================================
# MAIN QR SCANNER
# =========================================================

def scan_qr(image):
    # Accept either a file path (str) or an already‑loaded image (numpy array)
    if isinstance(image, str):
        # Load image from path using OpenCV
        img = cv2.imread(image)
    else:
        # Assume the caller already provided a cv2‑compatible image array
        img = image
    if img is None:
        return None, None, None

    detector = cv2.QRCodeDetector()

    # =====================================================
    # STEP 1: ORIGINAL IMAGE
    # =====================================================

    data, points, method = scan_normal(
        detector,
        img
    )

    if data:
        return data, points, method

    # =====================================================
    # STEP 2: IMAGE ENHANCEMENT
    # =====================================================

    data, points, method = scan_enhanced(
        detector,
        img
    )

    if data:
        return data, points, method

    # =====================================================
    # QR NOT FOUND
    # =====================================================

    return None, None, None

    if data:
        return data, points, method


    # =====================================================
    # QR NOT FOUND
    # =====================================================

    return None, None, None