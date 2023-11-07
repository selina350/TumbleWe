from flask import Blueprint, jsonify, session, request
from app.models import db, Application
from app.forms import ApplicationForm

from flask_login import current_user, login_required
from app.utils.validate_errors import validation_errors_to_error_messages

application_routes = Blueprint('applications', __name__)




#all applications that belong to the current user
@application_routes.route('', methods=['GET'])
@login_required
def get_all_applications():
    userId = current_user.id
    applications = Application.query.filter(Application.ownerId == userId)
    return {'applications': [application.to_dict() for application in applications]}


#create a new application
@application_routes.route('', methods=['POST'])
@login_required
def create_application():
    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_application = Application(
            ownerId=current_user.id,
            name=data["name"]
        )

        db.session.add(new_application)
        db.session.commit()
        return new_application.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#edit an exiting application
@application_routes.route('/<int:applicationId>', methods=['PUT'])
@login_required
def edit_application(applicationId):
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
        return {'error': 'Application not found'}, 404
    if application.ownerId != current_user.id:
        return {'error': 'Unauthorized'}, 403
    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        # application.ownerId=current_user.id,
        application.name=data["name"]
        db.session.commit()
        return application.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#delete the current application
@application_routes.route("/<int:applicationId>", methods=['DELETE'])
@login_required
def delete_application(applicationId):
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
        return {'error': 'Application not found'}, 404
    if application.ownerId != current_user.id:
        return {'error': 'Unauthorized'}, 403
    db.session.delete(application)
    db.session.commit()
    return {'message': 'Successfully deleted!'}
