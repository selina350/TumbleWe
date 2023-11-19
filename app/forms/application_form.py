from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, URLField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError


def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter a name.')
  if len(name) > 50:
    raise ValidationError('Name is too long.')

class ApplicationForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), Length(max=50), validateName])

