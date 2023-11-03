from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, URLField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

def validateName(form, field):
  name = field.data
  if not name:
    raise ValidationError('Please enter a name.')
  if len(name) > 50:
    raise ValidationError('Name is too long.')
# def validateType(form, field):
#   type = field.data
#   if not type:
#     raise ValidationError('Please select a type.')
#   if len(type) > 50:
#     raise ValidationError('Length of type is too long.')
def validateImage(form, field):
  image = field.data
  if not image:
    raise ValidationError('Please enter an image url.')

def validateSelector(form, field):
  selector = field.data
  if not selector:
    raise ValidationError('Please enter a selector.')

class StepForm(FlaskForm):
#   address = StringField('address', validators=[DataRequired(), Length(max=50), validateAddress])
#   city = StringField('city', validators=[DataRequired(), Length(max=50), validateCity])
#   state = StringField('state', validators=[DataRequired(), validateState])
#   lat = FloatField('lat', validators=[DataRequired(), NumberRange(min=-90, max=90), validateLat])
#   lng = FloatField('lng', validators=[DataRequired(), NumberRange(min=-180, max=180), validateLng])
  name = StringField('name', validators=[DataRequired(), Length(max=50), validateName])
#   type = SelectField('type', choices=["Chinese", "American",
#     "Fast Food", "Mexican", "Pizza", "Sushi", "Thai", "Burgers", "Indian", "Wings", "Italian", "BBQ", "Vegan", "Sandwich"], validators=[DataRequired(), validateType])
  imageUrl = URLField('image', validators=[DataRequired(), validateImage])
  selector =StringField('selector', validators=[DataRequired(), validateSelector])
