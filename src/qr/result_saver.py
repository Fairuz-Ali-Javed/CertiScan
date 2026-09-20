import json
from pathlib import Path


def save_result(result):
    """
    Save QR result as JSON.
    """

    output_folder = Path("output") / "qr_results"

    output_folder.mkdir(
        parents=True,
        exist_ok=True
    )

    output_file = output_folder / "result.json"

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            result,
            file,
            indent=4,
            ensure_ascii=False
        )

    return output_file