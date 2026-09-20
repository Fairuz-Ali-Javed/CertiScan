def classify_qr(data):

    if not data:
        return "Unknown"

    data = data.strip()

    # URL
    if data.startswith("http://") or data.startswith("https://"):
        return "URL"

    # Government Secure QR (JSON + encrypted payload)
    if data.startswith("[") and len(data) > 150:
        return "Government Secure QR"

    # JSON Object
    if data.startswith("{"):
        return "JSON"

    # Long encrypted string
    if len(data) > 300:
        return "Encrypted"

    return "Plain Text"