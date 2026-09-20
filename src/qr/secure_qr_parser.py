import base64
import binascii
import json


def parse_secure_qr(data):
    """
    Parse a Government Secure QR payload.

    Extracts verified structural metadata and preserves the original
    Base64 secure payload without decryption or cryptographic speculation.
    """
    result = {
        "is_valid": False,
        "error": None,
        "version": None,
        "identifier": None,
        "flag": None,
        "secure_payload": None,
        "base64_decoded_length": 0,
        "verification_status": None,
    }

    if not data:
        result["error"] = "Empty or missing QR data"
        return result

    if isinstance(data, str):
        data_str = data.strip()
        try:
            payload = json.loads(data_str)
        except (json.JSONDecodeError, TypeError) as e:
            result["error"] = f"Invalid JSON payload: {e}"
            return result
    elif isinstance(data, list):
        payload = data
    else:
        result["error"] = f"Unsupported payload type: {type(data).__name__}"
        return result

    if not isinstance(payload, list):
        result["error"] = "Payload must be a JSON array"
        return result

    if len(payload) != 4:
        result["error"] = f"Expected 4 array elements, got {len(payload)}"
        return result

    if not all(isinstance(item, str) for item in payload):
        result["error"] = "All payload elements must be strings"
        return result

    version = payload[0]
    identifier = payload[1]
    flag = payload[2]
    secure_payload = payload[3]

    if version != "3":
        result["error"] = f"Unsupported version: {version!r}"
        return result

    if identifier != "1":
        result["error"] = f"Unsupported identifier: {identifier!r}"
        return result

    if flag not in ("Y", "N"):
        result["error"] = f"Invalid flag: {flag!r} (expected 'Y' or 'N')"
        return result

    if len(secure_payload) < 100:
        result["error"] = f"Secure payload too short ({len(secure_payload)} chars)"
        return result

    # Decode Base64 ONLY to measure decoded byte length
    try:
        decoded_bytes = base64.b64decode(secure_payload, validate=True)
    except (binascii.Error, ValueError) as e:
        result["error"] = f"Invalid Base64 payload: {e}"
        return result

    result["is_valid"] = True
    result["version"] = version
    result["identifier"] = identifier
    result["flag"] = flag
    result["secure_payload"] = secure_payload
    result["base64_decoded_length"] = len(decoded_bytes)
    result["verification_status"] = "OFFICIAL_VERIFICATION_REQUIRED"
    return result