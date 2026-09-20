try:
    from qr_data_adapter import adapt_qr_data
except (ImportError, ValueError):
    try:
        from verification.qr_data_adapter import adapt_qr_data
    except ImportError:
        from src.verification.qr_data_adapter import adapt_qr_data


# =========================================
# TEST E-WAY BILL
# =========================================

eway_data = {
    "eway_bill_number": "181000001348",
    "generation_date": "9/23/2012",
    "generation_time": "2:25:00 PM",
    "generated_by": "29ckjpm7659c1Z0"
}

eway_result = adapt_qr_data(
    "E-Way Bill",
    eway_data
)

print()
print("E-WAY BILL")
print("--------------------------------")
print(eway_result)


# =========================================
# TEST URL
# =========================================

url_data = {
    "url": "https://unstop.com/certificate-preview/ABC123",
    "domain": "unstop.com",
    "path": "/certificate-preview/ABC123"
}

url_result = adapt_qr_data(
    "URL",
    url_data
)

print()
print("URL")
print("--------------------------------")
print(url_result)


# =========================================
# TEST JSON
# =========================================

json_data = {
    "studentName": "Kajal Dixit",
    "certificateNo": "CERT123",
    "courseName": "Machine Learning",
    "issueDate": "10/08/2026"
}

json_result = adapt_qr_data(
    "JSON",
    json_data
)

print()
print("JSON")
print("--------------------------------")
print(json_result)
