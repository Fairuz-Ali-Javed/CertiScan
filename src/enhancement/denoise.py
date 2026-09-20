import cv2


def denoise(image):

    return cv2.fastNlMeansDenoising(
        image,
        None,
        h=10,
        templateWindowSize=7,
        searchWindowSize=21
    )