import cv2
import numpy as np

try:
    import fitz
except ImportError:
    fitz = None


def load_document(file_path):
    """
    Loads either an image or the first page of a PDF.
    """

    # IMAGE FILES
    if file_path.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):

        image = cv2.imread(file_path)

        if image is None:
            raise Exception("Unable to load image.")

        return image


    # PDF FILES
    elif file_path.lower().endswith(".pdf"):
        if fitz is None:
            raise ImportError("PyMuPDF (fitz) is required to load PDF documents. Please install PyMuPDF.")

        pdf = fitz.open(file_path)

        page = pdf.load_page(0)

        pix = page.get_pixmap()

        img = np.frombuffer(pix.samples, dtype=np.uint8)

        img = img.reshape(pix.height, pix.width, pix.n)

        image = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        return image

    else:

        raise Exception("Unsupported File Format.")