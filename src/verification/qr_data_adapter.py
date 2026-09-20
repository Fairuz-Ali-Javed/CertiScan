try:
    from .data_normalizer import normalize_text
except (ImportError, ValueError):
    from data_normalizer import normalize_text


def create_empty_record():
    """
    Common structure used for all QR types.
    """

    return {
        "name": None,
        "certificate_id": None,
        "course": None,
        "issue_date": None,
        "document_number": None,
        "issuer": None,
        "verification_url": None
    }


def adapt_eway_bill(eway_data):
    """
    Convert E-Way Bill parser output
    into the common QR schema.
    """

    record = create_empty_record()

    record["document_number"] = normalize_text(
        eway_data.get("eway_bill_number")
    )

    record["issue_date"] = normalize_text(
        eway_data.get("generation_date")
    )

    return record

def adapt_url(url_data):
    """
    Convert URL verification data into
    the common comparable QR schema.
    """

    record = create_empty_record()

    record["name"] = normalize_text(
        url_data.get("name")
    )

    record["certificate_id"] = normalize_text(
        url_data.get("certificate_id")
        or url_data.get("certificateId")
        or url_data.get("certificateNo")
    )

    record["course"] = normalize_text(
        url_data.get("course")
        or url_data.get("courseName")
    )

    record["issue_date"] = normalize_text(
        url_data.get("issue_date")
        or url_data.get("issueDate")
        or url_data.get("date")
    )

    record["issuer"] = normalize_text(
        url_data.get("issuer")
        or url_data.get("domain")
    )

    record["verification_url"] = normalize_text(
        url_data.get("url")
    )

    return record


def adapt_json(json_data):
    """
    Convert a generic JSON QR payload into
    the common comparable QR schema.

    Handles both snake_case and camelCase keys.
    """

    record = create_empty_record()

    record["name"] = normalize_text(
        json_data.get("name")
        or json_data.get("studentName")
        or json_data.get("recipientName")
    )

    record["certificate_id"] = normalize_text(
        json_data.get("certificate_id")
        or json_data.get("certificateId")
        or json_data.get("certificateNo")
        or json_data.get("cert_id")
    )

    record["course"] = normalize_text(
        json_data.get("course")
        or json_data.get("courseName")
        or json_data.get("program")
    )

    record["issue_date"] = normalize_text(
        json_data.get("issue_date")
        or json_data.get("issueDate")
        or json_data.get("date")
        or json_data.get("issuedOn")
    )

    record["issuer"] = normalize_text(
        json_data.get("issuer")
        or json_data.get("issuedBy")
        or json_data.get("organization")
    )

    record["verification_url"] = normalize_text(
        json_data.get("verification_url")
        or json_data.get("verificationUrl")
        or json_data.get("url")
    )

    return record


def adapt_secure_qr(secure_data):
    """
    Convert Government Secure QR parser output into
    the common comparable QR schema.

    The encrypted payload is NOT decrypted.
    Only structural fields and status are mapped.
    """

    record = create_empty_record()

    # No certificate fields can be extracted
    # without decryption.  Return the empty record
    # so downstream code gets NOT_AVAILABLE for all
    # comparison fields rather than a key error.
    if isinstance(secure_data, dict) and secure_data.get("verification_status"):
        record["verification_status"] = secure_data["verification_status"]

    return record


def adapt_qr_data(qr_type, data):
    """
    Dispatch to the correct adapter based on QR type
    and return a common comparable QR schema dict.

    Supported types:
    - "E-Way Bill"
    - "URL"
    - "JSON"
    - "Government Secure QR"

    Unknown types return an empty record.
    """

    if qr_type == "E-Way Bill":
        return adapt_eway_bill(data)

    if qr_type == "URL":
        return adapt_url(data)

    if qr_type == "JSON":
        return adapt_json(data)

    if qr_type == "Government Secure QR":
        return adapt_secure_qr(data)

    # Unknown / Plain Text → return empty record
    return create_empty_record()