from flask_wtf import FlaskForm
from wtforms import IntegerField, FieldList, FormField
from wtforms.validators import DataRequired

class ItemForm(FlaskForm):
  id = IntegerField('id', validators=[DataRequired()])
  order = IntegerField('order', validators=[DataRequired()])

class StepOrderListForm(FlaskForm):
  orders = FieldList(FormField(ItemForm))
