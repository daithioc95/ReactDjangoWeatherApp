from django.urls import path
from . import views
from favourites.views import *

urlpatterns = [
    path('getuserfavs/', GetUserFavourites.as_view()),
]