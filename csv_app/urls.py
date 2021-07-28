from django.urls import path, include
from django.views.generic import RedirectView
from django.contrib.auth import views
from .views import (
	Login,
	dataschemas,
	newschema,
	delete_schema,
	schema_info,
	get_csv_files,
	
	)


urlpatterns = [
	path('', RedirectView.as_view(url='/login/', permanent=True)),
	path('login/', Login.as_view(), name='login'),
	path('logout/', views.LogoutView.as_view(), name='logout'),
	path('dataschemas/', dataschemas, name='dataschemas'),
	path('newschema/', newschema, name='newschema'),
	path('delete/<int:schema_id>/', delete_schema, name='delete_schema'),
	path('schemainfo/<str:schema_id>/', schema_info, name='schema_info'),
	path('csvfiles/<str:schema_name>/csv-files/', get_csv_files, name='get_csv_files')
	# path('testadd/', addingfields),
	# path('newschema/', SchemaView.as_view(), name='newschema'),
	# path('viewschema/<str:name>/', viewschema, name='viewschema'),

]




