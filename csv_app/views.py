from django.shortcuts import render, HttpResponse, reverse
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from .models import (
	Userprofile,
	Dataschema
	)
from .forms import (
	LoginForm,
	DataSchemaForm,
	# TypescoreForm,
	# TypetimeForm,
	# TypestatusForm,
	# ColumnForm
	)



# Create your views here.
class Login(LoginView):

	template_name = './csv_app/login.html'
	form_class = LoginForm


	def get(self, request, *args, **kwargs):
		return render(request, self.template_name, context={'form': self.form_class})
		if request.user.is_authenticated:
			print('I am going redirect to dataschemas')
			return redirect('/dataschemas/')
		else:
			print('try to loging enter username password')
			return render(request, self.template_name, context={'form': self.form_class})



@login_required(login_url='/login/')
def dataschemas(request):
	try:
		schemas = request.user.userprofile.dataschemas.all()
	except AttributeError as error:
		print('No Data for the user ', error)
		schemas = []
	return render(request, './csv_app/dataschemas.html', context={'schemas': schemas})



@login_required(login_url='/login/')
def newschema(request, **kwargs):
	print("f newschema")
	if request.method == 'POST':
		# request.POST._mutable = True
		# a = request.POST.copy()
		# print("A = ", a)
		print("Data = ",request.POST)
		# form = DataSchemaForm(request.POST)
		# rows_dict = request.POST.dict()
		# if form.is_valid():
		# 	print("FORM is VALID")
		# else:
		# 	form.errors['name'].error_class += ' text-danger'
	else:
		print("GET")
		# form = DataSchemaForm()
	print("\n+++++++++++++++++++++++++")
	# for i in request.__dict__.keys():
	# 	print("Key",i)
	# 	print("Value",request.__dict__[i])
	# print("\n+++++++++++++++++++++++++")
	request.GET._mutable = True
	request.POST._mutable = True
	# print(request.GET._)
	# print("GET = ",request.get('data'))
	return render(request, './csv_app/newschema.html')#,context={"form":form})


def addingfields(request):
	if request.method == 'POST':
		print(request.POST)
	return render(request, './csv_app/test.html')
