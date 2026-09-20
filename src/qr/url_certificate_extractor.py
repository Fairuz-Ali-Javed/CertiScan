import requests
from bs4 import BeautifulSoup


def extract_certificate_from_url(url):
    """
    Try to extract certificate information
    from a verification URL.
    """

    result = {
        "name": None,
        "certificate_id": None,
        "course": None,
        "issue_date": None,
        "issuer": None,
        "url": url
    }

    try:
        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        if response.status_code != 200:
            return result

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # Page text
        text = soup.get_text(
            " ",
            strip=True
        )

        print()
        print("URL PAGE STATUS")
        print("--------------------------------")
        print("HTTP Status :", response.status_code)
        print("Page Length :", len(text))

        # Save basic title information
        if soup.title:
            result["page_title"] = soup.title.get_text(
                strip=True
            )

        return result

    except requests.RequestException as error:

        print()
        print("❌ URL extraction failed")
        print(error)

        return result