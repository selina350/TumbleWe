from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError

def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter a name.')
  if len(name) > 50:
    raise ValidationError('Name is too long.')

# def validateUrl(form, field):
#   url = field.data
#   if not url:
#     raise ValidationError('Please enter an url.')

def validateSelector(form, field):
  selector = field.data
  if not selector:
    raise ValidationError('Please enter a selector.')

def validateType(form,field):
  type = field.data
  if not type:
    raise ValidationError("Please enter a type")

class StepForm(FlaskForm):
  audioFileName = StringField('audioFileName',validators=[Length(max=200)])
  name = StringField('name', validators=[DataRequired(), Length(max=50), validateName])
  selector =StringField('selector', validators=[DataRequired(), validateSelector])
  url = StringField('url', validators=[Length(max=200)])
  type = SelectField("type", choices=["input", "buttonClick"], validators=[DataRequired(),validateType])
  innerHTML = StringField('url', validators=[Length(max=200)])
  order = IntegerField('order')
