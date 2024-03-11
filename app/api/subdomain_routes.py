import os
from flask import Blueprint,request, Response, abort, jsonify
import json
from app.utils.s3_helper import get_s3_object
from bs4 import BeautifulSoup
from app.models import db, Application, MockApi

subdomain_routes = Blueprint('subdomain', __name__, subdomain="<subdomain>")
UI_SERVER_NAME = os.environ.get('UI_SERVER_NAME')

#all applications that belong to the current user
@subdomain_routes.route('/', defaults={'pathname': 'index.html'})
@subdomain_routes.route('/<path:pathname>')
def get_subdomain_files(subdomain, pathname):
    print('subdomain', subdomain)
    print('pathname', pathname)

    application = Application.query.filter(Application.name == subdomain).first()
    if not application:
        return {"error":"application doesn't exist"}, 404

    # check mock api
    mock_api = MockApi.query.filter(MockApi.path == "/" + pathname).first()

    if mock_api:
        print("mock_api",mock_api)
        try:
        # Try to convert the JSON string to a Python object
            data = json.loads(mock_api.responseBody)
        except json.JSONDecodeError:
        # Handle the case where the JSON decoding fails
            return jsonify({'error': 'Invalid JSON'}), 400
        print("mock_api.responseBody",mock_api.responseBody)

        return jsonify(data), 200

    # get file
    response, status_code = get_s3_object(pathname, application.id)
    print("application.id",application.id)
    if status_code != 200:
        return response, status_code

    if response and pathname == 'index.html':
        # Assuming 'response.data' contains the original HTML content
        soup = BeautifulSoup(response.data, 'html.parser')

        # Create a script tag with a src attribute
        script_tag = soup.new_tag('script', src=f'//www.{UI_SERVER_NAME}/subdomain.js')

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
