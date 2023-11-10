from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import SignUpForm
from app.utils.validate_errors import validation_errors_to_error_messages
user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

#get the current user
@user_routes.route('/me')
def user():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}

#edit the current user
@user_routes.route('/me', methods=['PUT'])
@login_required
def update_user_info():
  user = User.query.get(current_user.id)

  form = SignUpForm(obj=user)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    user.email=form.data['email']
    user.username=form.data['username']
    user.password=form.data['password']
    db.session.commit()
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete the current user
@user_routes.route('/me', methods=['DELETE'])
@login_required
def delete_user():
  user = User.query.get(current_user.id)
  if not user:
     return {"error":"user not found"}, 404
  db.session.delete(user)
  db.session.commit()
  return { 'message': 'Deleted successfully' }
