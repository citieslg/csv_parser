from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm

from .models import (
	User,
	Dataschema,
	Column,
	Typestatus,
	Typescore,
	Typetime
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
	# have to check if model exist in DB so redifine DataSchemaForm with some factory_form_set_method

	def __init__(self, instances = None, *args, **kwargs):
		print('IN INIT ModelForm')
		print('INIT args = ', args)
		print('INIT kwargs = ', kwargs)
		super().__init__(*args, **kwargs)



	class Meta:

		model = Dataschema
		fields = [
			'string_cherecter',
			'column_separator',
			'name'
			]



class ColumnForm(ModelForm):

	# def __init__

	class Meta:
		model = Column
		fields = ['name', 'order', 'logicoperator']



class TypestatusForm(ModelForm):

	class Meta:
		model = Typestatus
		fields = ['status']



class TypetimeForm(ModelForm):

	class Meta:
		model = Typetime
		fields = ['match_status', 'valfrom', 'valto']



class TypescoreForm(ModelForm):

	class Meta:
		model = Typescore
		fields = ['score', 'comparison', 'valfirst', 'valsecond']