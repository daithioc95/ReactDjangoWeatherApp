from django.urls import path
from . import views
from mainApp.views import *


urlpatterns = [
    path('apicall/', ReactView.as_view()),
    path('apisearchcall/', SearchedLocation.as_view()),
]