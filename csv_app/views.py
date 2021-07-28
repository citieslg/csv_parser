from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.core.paginator import Paginator
from django.shortcuts import (
	render,
	HttpResponse,
	reverse,
	redirect,
	get_object_or_404,
	)
from .models import (
	Userprofile,
	Dataschema,
	User,
	Parser,
	)
from .forms import (
	LoginForm,
	DataSchemaForm,
	# Parser,
	# TypetimeForm,
	# TypestatusForm,
	# ColumnForm
	)
from .utils import get_filters_dict, save_filters


import time
import json



def paginator(queryset, item_on_page=2, request_page=1):
	paginator = Paginator(queryset, item_on_page)
	return paginator.get_page(request_page)


# Create your views here.
class Login(LoginView):

	template_name = './csv_app/login.html'
	form_class = LoginForm


	def get(self, request, *args, **kwargs):
		return render(request,
					self.template_name,
					context={'form': self.form_class})
		if request.user.is_authenticated:
			return redirect('/dataschemas/')
		else:
			return render(request, 
						self.template_name, 
						context={'form': self.form_class})



@login_required(login_url='/login/')
def dataschemas(request):
	if request.method == 'POST':
		print('AJAX = ',request.is_ajax())
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		body_id = body['id']
		# schema = get_object_or_404(Dataschema, id=body_id)
		# obj = XMLfile.objects.create()
	try:
		schemas = request.user.userprofile.dataschemas.all()
		num_page = request.GET.get('page')
		page_obj = paginator(queryset=schemas, request_page=num_page)
	except AttributeError as error:
		print('No Data for the user ', error)
		page_obj = []
	# xml_data = XMLfile.objects.first()
	parser = Parser.objects.first()
	return render(request, 
				'./csv_app/dataschemas.html',
				context={
					'objects': page_obj,
					'parser': parser,
					# 'xml_data_date': xml_data
					})



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



@login_required(login_url='/login/')
def schema_info(request, schema_id):
	schema = get_object_or_404(Dataschema, id=schema_id)
	filters_list = schema.get_columns()
	return render(request, './csv_app/schemainfo.html', context={'filters': filters_list})


@login_required(login_url='/login/')
def get_csv_files(request, schema_name):
	return render(request, './csv_app/csvfiles.html')




def ajax():
	dataschema = get()
	# if getnew already True layout countdown
	dataschema.getnew = True
	lastXML = XMLfile.objects.first()
	lastCSV = get()
	if lastCSV.date == lastXML.date:
		send_to_celery_task()
		return countdown
	if lastCSV.date < lastXML.date:
		createnewfileCSV()
		# in a template update column with lastupdateCSV
		return {"responce 200"}
