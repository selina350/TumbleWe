from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, URLField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models import Application


def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter a name.')
  if len(name) > 50:
    raise ValidationError('Name is too long.')

def name_exists(form, field):
    # Checking if app's name exists
    name = field.data

    app = Application.query.filter(Application.name == name).first()
    if app :
       raise ValidationError("This name already exists.")
    


class ApplicationForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(max=50), validateName, name_exists])
