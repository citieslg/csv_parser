from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from django.forms.widgets import TextInput, Select
from django import forms

from .models import (
	User,
	Dataschema,
	Userprofile,
	# Column,
	# Typestatus,
	# Typescore,
	# Typetime
	)

import datetime as dt


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


	class Meta:

		model = Dataschema
		fields = [
			'name',
			'column_separator',
			'string_cherecter'
			]
		widgets = {
			'name' : TextInput(attrs={'class':'form-control'}),
			'column_separator' : Select(attrs=\
										{'class':'form-control custom-select'}),
			'string_cherecter' : Select(attrs=\
										{'class':'form-control custom-select'}),
		}
		labels = {
			'name': 'Name:',
			'column_separator': 'Column separator:',
			'string_cherecter': 'String_cherecter:',
		}

	def __init__(self, user_name=None, *args, **kwargs):
		self.user_name = user_name
		super().__init__(*args, **kwargs)

	def clean(self):
		new_cleaned_data = super().clean()
		if new_cleaned_data['name'] == 'None':
			raise ValidationError({'name': "Enter some value for the field!"})
		# get all schemas namr for the user
		try:
			user_profile = User.objects.get(username=self.user_name).userprofile
			schema = \
				Dataschema.objects.filter(profile=\
											user_profile).get(name=\
													new_cleaned_data['name'])
			new_cleaned_data['name']+= " " + \
								dt.datetime.now().strftime("%Y-%m-%d-%H.%M.%S")
		except:
			pass
		return new_cleaned_data

	def save(self,commit=True):
		print("SAVE", commit)
		res = super().save(commit=False)
		schema_name = res.name
		if commit:
			res.save()
			return schema_name
		return res


