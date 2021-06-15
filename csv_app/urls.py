from django.urls import path, include
from django.views.generic import RedirectView
from django.contrib.auth import views
from .views import (
	Login,
	dataschemas,
	# newschema,
	# SchemaView,
	)


urlpatterns = [
    path('', RedirectView.as_view(url='/login/', permanent=True)),
    path('login/', Login.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('dataschemas/', dataschemas, name='dataschemas'),
    # path('newschema/', newschema, name='newschema'),
    # path('newschema/', SchemaView.as_view(), name='newschema'),
    # path('viewschema/<str:name>/', viewschema, name='viewschema'),

]




