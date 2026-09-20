def normalize_text(value):
    """
    Normalize a value before comparison.
    """

    if value is None:
        return None

    value = str(value)

    # Remove extra spaces
    value = " ".join(value.split())

    # Case-insensitive comparison
    value = value.lower().strip()

    return value


def normalize_record(data):
    """
    Convert extracted data into a common schema.
    """

    return {
        "name": normalize_text(
            data.get("name")
        ),

        "certificate_id": normalize_text(
            data.get("certificate_id")
        ),

        "course": normalize_text(
            data.get("course")
        ),

        "issue_date": normalize_text(
            data.get("issue_date")
        )
    }