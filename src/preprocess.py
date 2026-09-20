import cv2


def resize(image, scale):
    """
    Resize image by given scale.
    """

    height, width = image.shape[:2]

    new_width = int(width * scale)
    new_height = int(height * scale)

    resized = cv2.resize(
        image,
        (new_width, new_height),
        interpolation=cv2.INTER_CUBIC
    )

    return resized