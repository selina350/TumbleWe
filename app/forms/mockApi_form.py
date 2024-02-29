from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError


def validateMethod(form, field):
  method = field.data
  if not method:
    raise ValidationError('Please enter a method.')
  if len(method) > 50:
    raise ValidationError('method is too long.')


def validatePath(form, field):
  path = field.data
  if not path:
    raise ValidationError('Please enter a path.')

def validateType(form,field):
  type = field.data
  if not type:
    raise ValidationError("Please enter a type")

def validateBody(form,field):
  body = field.data
  if not body:
    raise ValidationError("Please enter a body")

class MockApiForm(FlaskForm):
  method = StringField('method', choices=["GET", "PUT","CREATE","DELETE"],validators=[DataRequired(), Length(max=50), validateMethod])
  path =StringField('path', validators=[DataRequired(), validatePath])
  type = StringField('responseType', choices=["TEXT", "JSON"],validators=[DataRequired(),validateType])
  body = SelectField("responseBody", validators=[DataRequired(),validateBody])
