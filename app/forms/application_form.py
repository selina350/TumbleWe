from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Application


def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter a name.')
  if len(name) > 50:
    raise ValidationError('Name is too long.')
  if len(list(name.split(" "))) >1:
     raise ValidationError('No space is allowed in name.')

def name_exists(form, field):
    # Checking if app's name exists
    name = field.data

    app = Application.query.filter(Application.name == name).first()
    if app :
       raise ValidationError("This name already exists.")



class ApplicationForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(max=50), validateName, name_exists])
