from urllib.parse import urlparse

def extract_subdomain(origin):
    parsed_url = urlparse(origin)
    # Split the hostname into parts using dot as separator
    parts = parsed_url.hostname.split('.')

    # Check if there are at least two parts (subdomain and domain)
    if len(parts) >= 2:
        # Return the subdomain (the first part)
        return parts[0]
    else:
        return None
