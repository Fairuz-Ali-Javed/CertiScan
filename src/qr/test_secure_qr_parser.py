import base64
import json
import pytest
from pathlib import Path

from src.qr.secure_qr_parser import parse_secure_qr
from src.qr.payload_handler import is_secure_qr, classify_payload
from src.qr_scanner import scan_qr

GENUINE_SAMPLE_B64 = (
    "Ae1seJTUByZAtrzKOGSAsr5Pt6GVMSBM1CGYofpgsSQueoXF8sxaGKpkq651+2tRUQF1drnE1mce"
    "Wq9LUemkvReyfijWWZFsVurJ/on84rq6bj/6oaLJEuLjz3DIfWdpavkCkPkVTjCCAZRTL9vttzL/"
    "do8Zi08wK1NGwNhPcrABx7wWOF1tOiE5P7VEGGw2Hgy1AxV8SlVdHxbMq11D7WOxKNfzKa743Bx"
    "acbGQ09zd4EQYmuq2ndEYafVFZFWVm00LSwJgRZKeOBjWVoGC6cZCBNXav8Dk7t4tfkmrodV5bml"
    "laRoqpLlD9k5SdsmJPiOeCvsDM7xDKJ6f+GtVmrrCBgWmp6Ji+HImLIiKH0pWf6HrShoVq4k7jvo"
    "pAOaCYiKV2MIi"
)

GENUINE_JSON_STRING = json.dumps(["3", "1", "Y", GENUINE_SAMPLE_B64])


def test_parse_genuine_sample_string():
    result = parse_secure_qr(GENUINE_JSON_STRING)

    assert result["is_valid"] is True
    assert result["version"] == "3"
    assert result["identifier"] == "1"
    assert result["flag"] == "Y"
    assert result["secure_payload"] == GENUINE_SAMPLE_B64
    assert result["base64_decoded_length"] == 294
    assert result["verification_status"] == "OFFICIAL_VERIFICATION_REQUIRED"
    assert result["error"] is None


def test_parse_from_image():
    cert_path = Path(__file__).resolve().parents[2] / "test_Documents" / "genuine" / "certificate4.webp"
    raw_data, _, method = scan_qr(str(cert_path))
    assert raw_data is not None

    result = parse_secure_qr(raw_data)
    assert result["is_valid"] is True
    assert result["version"] == "3"
    assert result["identifier"] == "1"
    assert result["flag"] == "Y"
    assert result["base64_decoded_length"] == 294
    assert result["verification_status"] == "OFFICIAL_VERIFICATION_REQUIRED"


def test_parse_valid_flag_n():
    payload = json.dumps(["3", "1", "N", GENUINE_SAMPLE_B64])
    result = parse_secure_qr(payload)

    assert result["is_valid"] is True
    assert result["flag"] == "N"
    assert result["base64_decoded_length"] == 294
    assert result["verification_status"] == "OFFICIAL_VERIFICATION_REQUIRED"


def test_parse_empty_and_none():
    assert parse_secure_qr(None)["is_valid"] is False
    assert parse_secure_qr("")["is_valid"] is False
    assert parse_secure_qr("   ")["is_valid"] is False
    assert "empty" in parse_secure_qr(None)["error"].lower()


def test_parse_invalid_json():
    result = parse_secure_qr("not a json string")
    assert result["is_valid"] is False
    assert "json" in result["error"].lower()


def test_parse_not_a_list():
    result = parse_secure_qr(json.dumps({"version": "3", "id": "1"}))
    assert result["is_valid"] is False
    assert "array" in result["error"].lower()


@pytest.mark.parametrize("bad_length_list", [
    ["3", "1", "Y"],
    ["3", "1", "Y", GENUINE_SAMPLE_B64, "extra"],
    [],
])
def test_parse_wrong_element_count(bad_length_list):
    result = parse_secure_qr(json.dumps(bad_length_list))
    assert result["is_valid"] is False
    assert "4" in result["error"]


def test_parse_non_string_elements():
    result = parse_secure_qr(json.dumps([3, 1, "Y", GENUINE_SAMPLE_B64]))
    assert result["is_valid"] is False
    assert "string" in result["error"].lower()


def test_parse_unsupported_version():
    result = parse_secure_qr(json.dumps(["2", "1", "Y", GENUINE_SAMPLE_B64]))
    assert result["is_valid"] is False
    assert "version" in result["error"].lower()


def test_parse_unsupported_identifier():
    result = parse_secure_qr(json.dumps(["3", "2", "Y", GENUINE_SAMPLE_B64]))
    assert result["is_valid"] is False
    assert "identifier" in result["error"].lower()


def test_parse_invalid_flag():
    result = parse_secure_qr(json.dumps(["3", "1", "X", GENUINE_SAMPLE_B64]))
    assert result["is_valid"] is False
    assert "flag" in result["error"].lower()


def test_parse_payload_too_short():
    short_b64 = base64.b64encode(b"short payload").decode("ascii")
    result = parse_secure_qr(json.dumps(["3", "1", "Y", short_b64]))
    assert result["is_valid"] is False
    assert "short" in result["error"].lower()


def test_parse_corrupted_base64():
    corrupted_b64 = "!" * 120
    result = parse_secure_qr(json.dumps(["3", "1", "Y", corrupted_b64]))
    assert result["is_valid"] is False
    assert "base64" in result["error"].lower()


def test_payload_handler_integration():
    assert is_secure_qr(GENUINE_JSON_STRING) is True
    assert classify_payload(GENUINE_JSON_STRING) == "Government Secure QR"

    # Invalid payloads must not be classified as Government Secure QR
    bad_payload = json.dumps(["3", "1", "X", GENUINE_SAMPLE_B64])
    assert is_secure_qr(bad_payload) is False
    assert classify_payload(bad_payload) != "Government Secure QR"
