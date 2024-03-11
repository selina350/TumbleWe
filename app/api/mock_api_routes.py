from flask import Blueprint, jsonify, session, request
from app.models import MockApi, db, Application
from app.forms import MockApiForm

from flask_login import current_user, login_required
from app.utils.validate_errors import validation_errors_to_error_messages
from app.utils.subdomain_helper import extract_subdomain
from wtforms import ValidationError

mock_api_routes = Blueprint('mock_apis', __name__)




#all mock apis that belong to the current application
@mock_api_routes.route('/applications/<int:applicationId>/mockApis', methods=['GET'])
@login_required
def get_all_mock_apis(applicationId):
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
      return {"error":"application doesn't exist"},404
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403
    mock_apis = MockApi.query.filter(MockApi.applicationId == applicationId)
    return {'mockApis': [mockApi.to_dict() for mockApi in mock_apis]}


#create a new mock api
@mock_api_routes.route('/applications/<int:applicationId>/mockApis', methods=['POST'])
@login_required
def create_mock_api(applicationId):
    form = MockApiForm()
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
        return {"error":"application doesn't exist"},404
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_mock_api= MockApi(
            applicationId=application.id,
            method=data["method"],
            path=data["path"],
            responseType=data["responseType"],
            responseBody=data["responseBody"]
        )

        db.session.add(new_mock_api)
        db.session.commit()
        return new_mock_api.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



#edit an exiting mock api
@mock_api_routes.route('/mockApis/<int:mockApiId>', methods=['PUT'])
@login_required
def edit_step(mockApiId):
    mock_api = MockApi.query.filter(MockApi.id == mockApiId).first()
    if not mock_api:
        return {'error': 'mock_api not found'}, 404
    application = Application.query.filter(Application.id == mock_api.applicationId).first()
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403

    form = MockApiForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        mock_api.method=data["method"]
        mock_api.path=data["path"]
        mock_api.responseType=data["responseType"]
        mock_api.responseBody=data["responseBody"]

        db.session.commit()
        return mock_api.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#delete the current mock api
@mock_api_routes.route("/mockApis/<int:mockApiId>", methods=['DELETE'])
@login_required
def delete_mock_api(mockApiId):
    mock_api = MockApi.query.filter(MockApi.id == mockApiId).first()
    if not mock_api:
        return {'error': 'mock_api not found'}, 404
    application = Application.query.filter(Application.id == mock_api.applicationId).first()
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403
    db.session.delete(mock_api)
    db.session.commit()
    return {'message': 'Successfully deleted!'}


