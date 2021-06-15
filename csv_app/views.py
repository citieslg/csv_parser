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



# @login_required(login_url='/login/')
# def newschema(request, **kwargs):
# 	print('*******')
# 	print('newschema with request = ', request)
# 	# print('request instance = ', request.__dict__)
# 	# print('request form = ',request.form)
# 	print('request method = ',request.method)
# 	if request.method == 'POST':
# 		for i in request.__dict__:
# 			print('\n'+ i + ':')
# 			print('val: \n', request.__dict__[i])
# 		# print('	POST, data = ',request.POST)
# 		form = DataSchemaForm(request.POST)
# 		form1 = ColumnForm()
# 		form2 = TypescoreForm()
# 		form3 = TypetimeForm()
# 		form4 = TypestatusForm()
# 	else:
# 		form = DataSchemaForm()
# 		form1 = ColumnForm()
# 		form2 = TypescoreForm()
# 		form3 = TypetimeForm()
# 		form4 = TypestatusForm()
# 	return render(request, './csv_app/newschema.html',context={'form': form, 'form1': form1, 'form2': form2, 'form3': form3, 'form4': form4})
