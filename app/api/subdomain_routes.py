import os
from flask import Blueprint,request, Response
from app.utils.s3_helper import get_s3_object
from bs4 import BeautifulSoup
from werkzeug.exceptions import NotFound

subdomain_routes = Blueprint('subdomain', __name__)
SERVER_NAME = os.environ.get('SERVER_NAME')

#all applications that belong to the current user
@subdomain_routes.route('/', defaults={'filename': 'index.html'})
@subdomain_routes.route('/<path:filename>')
def get_subdomain_files(subdomain, filename):
    print('subdomain', subdomain)
    print('filename', filename)
    if subdomain == 'www':
        # Let the request continue to the next handler
        return NotFound()
    response = get_s3_object(filename)
    if filename == 'index.html':
        # Assuming 'response.data' contains the original HTML content
        soup = BeautifulSoup(response.data, 'html.parser')

        # Create a script tag with a src attribute
        script_tag = soup.new_tag('script', src=f'//{SERVER_NAME}/subdomain.js')

        # Append the script tag to the head section
        head_tag = soup.head
        if head_tag:
            head_tag.append(script_tag)
        else:
            # If there is no head section, create one and append the script tag
            head_tag = soup.new_tag('head')
            soup.html.insert(0, head_tag)
            head_tag.append(script_tag)

        # Get the modified HTML
        modified_html = str(soup)
        response.data = modified_html

    return response

    # return redirect("/api/users/me", code=301)
    # return f'Hello from {subdomain}! File /{filename}'
