import os
from flask import Blueprint,request, Response, abort
from app.utils.s3_helper import get_s3_object
from bs4 import BeautifulSoup
from app.models import db, Application

subdomain_routes = Blueprint('subdomain', __name__, subdomain="<subdomain>")
SERVER_NAME = os.environ.get('SERVER_NAME')

#all applications that belong to the current user
@subdomain_routes.route('/', defaults={'filename': 'index.html'})
@subdomain_routes.route('/<path:filename>')
def get_subdomain_files(subdomain, filename):
    print('subdomain', subdomain)
    print('filename', filename)

    application = Application.query.filter(Application.name == subdomain).first()
    if not application:
        return {"error":"application doesn't exist"}, 404

    response, status_code = get_s3_object(filename, application.id)
    if status_code != 200:
        return response, status_code

    if response and filename == 'index.html':
        # Assuming 'response.data' contains the original HTML content
        soup = BeautifulSoup(response.data, 'html.parser')

        # Create a script tag with a src attribute
        script_tag = soup.new_tag('script', src=f'//www.{SERVER_NAME}/subdomain.js')

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
        response.headers['Content-Type'] = 'text/html'

    return response

    # return redirect("/api/users/me", code=301)
    # return f'Hello from {subdomain}! File /{filename}'
