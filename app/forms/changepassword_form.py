from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, URLField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from flask_login import current_user
from app.models import User

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if current_user.is_authenticated and current_user.username == username:
        user = User.query.filter(User.username == username).all()
        if len(user) > 1:
            raise ValidationError('Username is already in use.')
    else:
        user = User.query.filter(User.username == username).first()
        if user:
            raise ValidationError('Username is already in use.')

def validateOldPassword(form, field):
  oldPassword = field.data

  if not oldPassword:
    raise ValidationError('Please enter a password.')
  if len(oldPassword) > 20:
    raise ValidationError('Password is too long.')
  if not current_user.check_password(oldPassword):
    raise ValidationError('Wrong password.')

def validateNewPassword(form, field):
  newPassword = field.data

  if not newPassword:
    raise ValidationError('Please enter a password.')
  if len(newPassword) > 20:
    raise ValidationError('Password is too long.')

class ChangePasswordForm(FlaskForm):
  username = StringField('username',validators=[DataRequired(), Length(max=20), username_exists])
  oldPassword = StringField('password', validators=[DataRequired(), Length(max=20), validateOldPassword])
  newPassword = StringField('password', validators=[DataRequired(), Length(max=20), validateNewPassword])
