import sys
from pathlib import Path

_root = str(Path(__file__).resolve().parents[2])
if _root not in sys.path:
    sys.path.insert(0, _root)

from src.qr.url_browser_extractor import extract_certificate_from_url





url = "https://unstop.com/certificate-preview/514a9233-d670-48e5-85b9-e5506a360b64"


result = extract_certificate_from_url(url)


print()
print("================================")
print("EXTRACTED CERTIFICATE DATA")
print("================================")

for key, value in result.items():
    print(f"{key} : {value}")