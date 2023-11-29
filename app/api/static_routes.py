from flask import Blueprint, send_from_directory
from werkzeug.exceptions import NotFound

static_routes = Blueprint('static', __name__)

@static_routes.route('/', defaults={'path': 'index.html'}, methods=['GET'])
@static_routes.route('/<path:path>', methods=['GET'])
def get_static_file(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    try:
        return send_from_directory("../react-app/dist", path)
    except NotFound:

        return send_from_directory("../react-app/dist","index.html")
