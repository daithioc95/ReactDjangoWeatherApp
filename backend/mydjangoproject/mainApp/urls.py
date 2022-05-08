from django.urls import path
from . import views
from mainApp.views import *


urlpatterns = [
    path('apisearchcall/', SearchedLocation.as_view()),
]