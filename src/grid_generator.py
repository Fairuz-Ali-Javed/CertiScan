def generate_grid(image, rows=3, cols=3):
    """
    Split image into rows × cols grids.

    Returns:
        [
            (1, crop1),
            (2, crop2),
            ...
        ]
    """

    height, width = image.shape[:2]

    cell_height = height // rows
    cell_width = width // cols

    grids = []

    number = 1

    for r in range(rows):

        for c in range(cols):

            x1 = c * cell_width
            y1 = r * cell_height

            if c == cols - 1:
                x2 = width
            else:
                x2 = (c + 1) * cell_width

            if r == rows - 1:
                y2 = height
            else:
                y2 = (r + 1) * cell_height

            crop = image[y1:y2, x1:x2]

            grids.append((number, crop))

            number += 1

    return grids