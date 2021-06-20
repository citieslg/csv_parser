test = {'csrfmiddlewaretoken': ['8P5HtlqHrrQjqjwqTZoRdjf5pXzyy6oywDI2LYlvzJAzaOt8Z7zx1DZsP2vFF2cJ'], 'name': ['None'], 'column_separator': [','], 'string_cherecter': ["'"], 'score_type_select_1_1_2': ['h'], 'compair_1_1_2': ['=='], 'score_input_name_1_1_2': ['0'], 'match_type_1_2': ['n'], 'time_name_from_1_2': ['0'], 'time_name_to_1_2': ['130']}
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from django.forms.widgets import TextInput, Select
from django import forms

from .models import (
	User,
	Dataschema,
	# Column,
	# Typestatus,
	# Typescore,
	# Typetime
	)


class LoginForm(AuthenticationForm):

	def __init__(self, request=None, *args, **kwargs):
		super().__init__(*args,**kwargs)
		self.fields['username'].label = ''
		self.fields['password'].label = ''
		self.fields['username'].widget.attrs.update(
			{'name': 'username',
			'placeholder': 'Username...',
			'class': 'form-control'}
			)
		self.fields['password'].widget.attrs.update(
			{'name': 'password',
			'placeholder': 'Password...',
			'class': 'form-control'}
			)




class DataSchemaForm(ModelForm):
	# STATE ROW CONST
	STATE_NAME = "name_state_1"
	STATE_SELECT = "name_select_state_1"
	# TIME ROW CONST
	TIME_NAME = "_time_"# logicoperator + TIME_NAME + order
	TIME_SELECT = "match_type_"
	TIME_INPUT_FROM = "time_name_from_"
	TIME_INPUT_TO = "time_name_to_"
	# STATE ROW CONST
	SCORE_NAME = "_score_"# logicoperator + SCORE_NAME + order
	SCORE_SELECT = "score_type_select_"
	SCORE_COMPAIR = "compair_"
	# total, home, guest consts
	SCORE_INPUT_VALUE = "score_input_name_"
	# compairson consts
	SCORE_INPUT_HOME = "score_name_home_"
	SCORE_INPUT_GUEST = "score_name_guest_"

	class Meta:

		model = Dataschema
		fields = [
			'name',
			'column_separator',
			'string_cherecter'
			]
		widgets = {
			'name' : TextInput(attrs={'class':'form-control'}),
			'column_separator' : Select(attrs={'class':'form-control custom-select'}),
			'string_cherecter' : Select(attrs={'class':'form-control custom-select'}),
		}
		labels = {
			'name': 'Name:',
			'column_separator': 'Column separator:',
			'string_cherecter': 'String_cherecter:',
		}

	def __init__(self, instances = None, *args, **kwargs):
		super().__init__(instances, *args, **kwargs)


	def clean(self):
		new_cleaned_data = super().clean()
		if new_cleaned_data['name'] == 'None':
			raise ValidationError({'name': "Enter some value for the field!"})
		return new_cleaned_data

	def save(self, *args, **kwargs):
		super.save(args,kwargs)

