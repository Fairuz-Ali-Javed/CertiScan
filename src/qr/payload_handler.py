import json
import re


try:
    from .secure_qr_parser import parse_secure_qr
except (ImportError, ValueError):
    from qr.secure_qr_parser import parse_secure_qr


# =========================================
# GOVERNMENT SECURE QR CHECK
# =========================================

def is_secure_qr(data):
    """
    Check whether the payload follows the
    secure QR structure we have observed.
    """
    return parse_secure_qr(data).get("is_valid", False)


# =========================================
# PAYLOAD CLASSIFICATION
# =========================================

def classify_payload(data):
    """
    Identify the type of QR payload.
    """

    if not data:
        return "Unknown"

    data = data.strip()


    # --------------------------------
    # URL
    # --------------------------------

    if data.startswith(("http://", "https://")):
        return "URL"


    # --------------------------------
    # E-Way Bill
    # --------------------------------

    if re.search(
        r"EWB\s*No",
        data,
        re.IGNORECASE
    ):
        return "E-Way Bill"


    # --------------------------------
    # Government Secure QR
    # --------------------------------

    if is_secure_qr(data):
        return "Government Secure QR"


    # --------------------------------
    # Other JSON
    # --------------------------------

    try:

        json.loads(data)

        return "JSON"

    except (json.JSONDecodeError, TypeError):

        pass


    # --------------------------------
    # Plain Text
    # --------------------------------

    return "Plain Text"


# =========================================
# PAYLOAD INFORMATION
# =========================================

def get_payload_info(data, method=None):
    """
    Create structured information from
    the decoded QR payload.
    """

    if not data:

        return {
            "qr_detected": False,
            "detection_method": method,
            "qr_type": "Unknown",
            "data_length": 0,
            "decoded_data": None
        }


    qr_type = classify_payload(data)


    return {
        "qr_detected": True,
        "detection_method": method,
        "qr_type": qr_type,
        "data_length": len(data),
        "decoded_data": data
    }