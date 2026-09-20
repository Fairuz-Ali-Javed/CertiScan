from urllib.parse import urlparse


def parse_url(data):
    """
    Parse and structure a URL QR payload.
    """

    result = {
        "url": None,
        "domain": None,
        "path": None,
        "scheme": None
    }

    if not data:
        return result

    data = data.strip()

    # Make sure it is actually a URL
    if not data.startswith(("http://", "https://")):
        return result

    result["url"] = data

    # Parse URL
    parsed = urlparse(data)

    result["scheme"] = parsed.scheme
    result["domain"] = parsed.netloc
    result["path"] = parsed.path

    return result