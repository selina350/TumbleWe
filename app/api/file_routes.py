from flask import Blueprint, jsonify, session, request
from app.models import File, db, Application
from app.forms import FileForm

from flask_login import current_user, login_required
from app.utils.validate_errors import validation_errors_to_error_messages
from app.utils.s3_helper import delete_s3_object, copy_s3_object

file_routes = Blueprint('files', __name__)




#all files that belong to the current application
@file_routes.route('/applications/<int:applicationId>/files', methods=['GET'])
@login_required
def get_all_files(applicationId):
    application = Application.query.filter(Application.id == applicationId).first()
    if not application:
        return {"error":"application doesn't exist"},404
    if application.ownerId != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403
    files = File.query.filter(File.applicationId == applicationId)
    return {'files': [file.to_dict() for file in files]}


#create a new file
@file_routes.route('/applications/<int:applicationId>/files', methods=['POST'])
@login_required
def create_file(applicationId):
    form = FileForm()
    application = Application.query.filter(Application.id == applicationId).first()

    if not application:
        return {"application doesn't exist"},404
    if application.ownerId != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        copy_s3_object(data["name"], applicationId)
        existing_file = File.query.filter(File.name == data["name"]).first()
        if existing_file:
            return jsonify({"error": "file with this name already exists"}), 200
        new_file = File(
            applicationId=application.id,
            name=data["name"],
            url=data["url"]
        )

        db.session.add(new_file)
        db.session.commit()
        return new_file.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#edit an exiting file
@file_routes.route('/files/<int:fileId>', methods=['PUT'])
@login_required
def edit_file(fileId):
    file = File.query.filter(File.id == fileId).first()
    if not file:
        return {'error': 'File not found'}, 404
    application = Application.query.filter(Application.id==file.applicationId).first()
    if application.ownerId != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403
    form = FileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        file.name=data["name"]
        file.url=data["url"]
        db.session.commit()
        return file.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete the current file
@file_routes.route("/files/<int:fileId>", methods=['DELETE'])
@login_required
def delete_file(fileId):
    file = File.query.filter(File.id == fileId).first()
    if not file:
        return {'error': 'File not found'}, 404
    application = Application.query.filter(Application.id==file.applicationId).first()
    if application.ownerId != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403
    print(file.name)
    delete_s3_object(file.name, application.id)
    db.session.delete(file)
    db.session.commit()
    return {'message': 'Successfully deleted!'}
