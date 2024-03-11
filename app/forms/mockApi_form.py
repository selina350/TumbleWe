from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
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
  responseType = field.data
  if not responseType:
    raise ValidationError("Please enter a type")

def validateBody(form,field):
  responseBody = field.data
  if not responseBody:
    raise ValidationError("Please enter a body")

class MockApiForm(FlaskForm):
  method = SelectField('method', choices=["GET", "PUT","POST","DELETE"],validators=[DataRequired(), Length(max=50), validateMethod])
  path =StringField('path', validators=[DataRequired(), validatePath])
  responseType = SelectField('responseType', choices=["TEXT", "JSON"],validators=[DataRequired(),validateType])
  responseBody = StringField("responseBody", validators=[DataRequired(),validateBody])
