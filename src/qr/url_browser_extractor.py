import re
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright


def extract_certificate_from_url(url):
    """
    Open certificate URL in a real browser
    and extract certificate information.
    """

    result = {
        "name": None,
        "certificate_id": None,
        "course": None,
        "issue_date": None,
        "issuer": None,
        "url": url
    }

    # Derive initial issuer from input URL domain
    try:
        parsed_initial = urlparse(url)
        initial_domain = parsed_initial.netloc.lower()
        if initial_domain.startswith("www."):
            initial_domain = initial_domain[4:]
        if initial_domain:
            result["issuer"] = initial_domain
    except Exception:
        pass

    browser = None

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=True
            )

            try:
                page = browser.new_page()

                page.goto(
                    url,
                    wait_until="networkidle",
                    timeout=30000
                )

                page.wait_for_timeout(3000)

                print()
                print("================================")
                print("BROWSER URL EXTRACTION")
                print("================================")

                print()
                print("Page URL :", page.url)
                print("Title    :", page.title())

                # --------------------------------
                # ISSUER (derived from final page URL)
                # --------------------------------
                final_parsed = urlparse(page.url)
                final_domain = final_parsed.netloc.lower()
                if final_domain.startswith("www."):
                    final_domain = final_domain[4:]
                if final_domain:
                    result["issuer"] = final_domain

                text = page.locator("body").inner_text()

                print()
                print("Rendered Page Text")
                print("--------------------------------")
                print(text[:5000])

                # --------------------------------
                # COURSE / ACHIEVEMENT
                # --------------------------------
                lines = [
                    line.strip()
                    for line in text.splitlines()
                    if line.strip()
                ]

                for i, line in enumerate(lines):
                    # Robust detection of "You've earned a certificate!" allowing optional extra characters/emojis
                    if (
                        re.search(r"you've earned a certificate!", line, re.IGNORECASE)
                        or re.search(r"earned a certificate!", line, re.IGNORECASE)
                    ):
                        if i + 1 < len(lines):
                            result["course"] = lines[i + 1]
                        break

                # Additional NetAcad field extraction
                for i, line in enumerate(lines):
                    lowered = line.lower()
                    if "issued for" in lowered:
                        if i + 1 < len(lines):
                            result["name"] = lines[i + 1]
                    elif "issued by" in lowered:
                        if i + 1 < len(lines):
                            result["issuer"] = lines[i + 1]
                    elif "issued date" in lowered:
                        if i + 1 < len(lines):
                            result["issue_date"] = lines[i + 1]
                # Heuristic extraction of course title (NetAcad)
                if result.get("issuer") and not result.get("course"):
                    for i, line in enumerate(lines):
                        if line.strip() == result["issuer"]:
                            # next non-empty line is likely the course title
                            j = i + 1
                            while j < len(lines) and not lines[j].strip():
                                j += 1
                            if j < len(lines):
                                candidate = lines[j].strip()
                                if candidate.lower() not in ("description", "course"):
                                    result["course"] = candidate
                            break
                # --------------------------------
                # ISSUE DATE
                # --------------------------------
                date_match = re.search(
                    r"Issued on:\s*(.+)",
                    text,
                    re.IGNORECASE
                )

                if date_match:
                    result["issue_date"] = date_match.group(1).strip()

            finally:
                if browser:
                    browser.close()
                    browser = None

    except Exception as error:
        print()
        print("❌ Browser extraction failed")
        print(error)

    finally:
        if browser:
            try:
                browser.close()
            except Exception:
                pass

    return result