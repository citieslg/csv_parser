from django.shortcuts import render, HttpResponse, reverse, redirect, get_object_or_404
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from .models import (
	Userprofile,
	Dataschema,
	User,
	)
from .forms import (
	LoginForm,
	DataSchemaForm,
	# TypescoreForm,
	# TypetimeForm,
	# TypestatusForm,
	# ColumnForm
	)
from .utils import get_filters_dict, save_filters


# Create your views here.
class Login(LoginView):

	template_name = './csv_app/login.html'
	form_class = LoginForm


	def get(self, request, *args, **kwargs):
		return render(request,
					self.template_name,
					context={'form': self.form_class})
		if request.user.is_authenticated:
			print('I am going redirect to dataschemas')
			return redirect('/dataschemas/')
		else:
			print('try to loging enter username password')
			return render(request, 
						self.template_name, 
						context={'form': self.form_class})



@login_required(login_url='/login/')
def dataschemas(request):
	try:
		schemas = request.user.userprofile.dataschemas.all()
	except AttributeError as error:
		print('No Data for the user ', error)
		schemas = []
	return render(request, 
				'./csv_app/dataschemas.html', 
				context={'schemas': schemas})



@login_required(login_url='/login/')
def newschema(request, **kwargs):
	print("f newschema")
	if request.method == 'POST':
		user = request.user
		form = DataSchemaForm(user, request.POST)
		if form.is_valid():
			# get dict with all keys: values exclude crftoken and 
			# name, column_separator and string characters
			# to pass them to utils.save_filters function
			new_filters = get_filters_dict(request.POST.dict())
			print(new_filters)
			new_schema = form.save(commit=False)
			new_schema.profile = \
						User.objects.get(username=request.user).userprofile
			# have to get name to find the Schema for utils.save_filters func
			name = new_schema.name
			schema = new_schema.save()
			save_filters(dict_request=new_filters,
						user_name=user,
						name_schema=name)
			return redirect('/dataschemas/')
		else:
			form.errors['name'].error_class += ' text-danger'
	else:
		form = DataSchemaForm()
	return render(request, './csv_app/newschema.html',context={"form":form})


@login_required(login_url='/login/')
def delete_schema(request,schema_id):
	print("We are in the function", schema_id, type(schema_id))
	schema = get_object_or_404(Dataschema, id=schema_id)
	if request.method == 'POST':
		print("POST!!!!")
		return redirect('/dataschemas/')
	return render(request, 'csv_app/delete_schema.html', context={"schema": schema})
	# have to create new template to confirm delete
	# the def has to delete all csvfiles too
	# one way to delete it
	# https://www.geeksforgeeks.org/delete-view-function-based-views-django/
	# other way
	# https://stackoverflow.com/questions/40861518/delete-model-object-in-django-using-jquery-ajax
	# https://stackoverflow.com/questions/55599924/django-delete-object-using-ajax-or-javascript-with-confirm


@login_required(login_url='/login/')
def schema_info(request, schema_name):
	# schema = get_object_or_404(Dataschema, id=kwargs.pop('schema_id'))
	return render(request, './csv_app/schemainfo.html')


@login_required(login_url='/login/')
def get_csv_files(request, schema_name):
	return render(request, './csv_app/csvfiles.html')