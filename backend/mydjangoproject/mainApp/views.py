from django.shortcuts import render
import requests
from .models import City
from .forms import CityForm
import environ
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from . serializer import *
from dotenv import load_dotenv
load_dotenv()
import os


env = environ.Env()


class SearchedLocation(APIView):

    def get(self, request):
        searched_location_data = []
        print(request.query_params.get('name'))
        city = request.query_params.get('name')
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={os.getenv('WEATHER_API')}"
        Result_location_data = requests.get(url.format(city)).json()
        searched_location_data.append(Result_location_data)
        print(searched_location_data)
        return Response(searched_location_data)