from flask import Blueprint, jsonify, session, request
from app.models import Step, db, Application
from app.forms import StepForm

from flask_login import current_user, login_required
from app.utils.validate_errors import validation_errors_to_error_messages
from app.utils.subdomain_helper import extract_subdomain

step_routes = Blueprint('steps', __name__)




#all steps that belong to the current application
@step_routes.route('/applications/<int:applicationId>/steps', methods=['GET'])
@login_required
def get_all_steps(applicationId):
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
      return {"error":"application doesn't exist"},404
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403
    steps = Step.query.filter(Step.applicationId == applicationId)
    return {'steps': [step.to_dict() for step in steps]}


#create a new step
@step_routes.route('/applications/<int:applicationId>/steps', methods=['POST'])
@login_required
def create_step(applicationId):
    form = StepForm()
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
        return {"error":"application doesn't exist"},404
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_step= Step(
            applicationId=application.id,
            name=data["name"],
            url=data["url"],
            selector=data["selector"],
            type=data["type"]
        )

        db.session.add(new_step)
        db.session.commit()
        return new_step.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#edit an exiting step
@step_routes.route('/steps/<int:stepId>', methods=['PUT'])
@login_required
def edit_step(stepId):
    step = Step.query.filter(Step.id == stepId).first()
    if not step:
        return {'error': 'Step not found'}, 404
    application = Application.query.filter(Application.id == step.applicationId).first()
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403

    form = StepForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        step.name=data["name"]
        step.url=data["url"]
        step.selector=data["selector"]
        step.type=data["type"]
        db.session.commit()
        return step.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#delete the current step
@step_routes.route("/steps/<int:stepId>", methods=['DELETE'])
@login_required
def delete_step(stepId):
    step = Step.query.filter(Step.id == stepId).first()
    if not step:
        return {'error': 'Step not found'}, 404
    application = Application.query.filter(Application.id == step.applicationId).first()
    if application.ownerId != current_user.id:
      return jsonify({"error": "Unauthorized"}), 403
    db.session.delete(step)
    db.session.commit()
    return {'message': 'Successfully deleted!'}

#public api to get steps of an application by subdomain name
@step_routes.route("/steps", methods=['GET'])
def get_steps_by_app_name():
   # Get the 'Origin' header from the request
    origin = request.headers.get('Origin')

    # Check if the request has a valid 'Origin' header
    if not origin:
        return {"error": 'No Origin header in the request'}, 404

    # Extract subdomain from 'Origin' header
    app_name = extract_subdomain(origin)
    application = Application.query.filter(Application.name == app_name).first()

    if not application:
        return {"error":"application doesn't exist"},404

    steps = Step.query.filter(Step.applicationId == application.id)
    return {'steps': [step.to_dict() for step in steps]}
