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
            if Result_location_data['cod'] ==200:
                tempToCel = round(((Result_location_data['main']['temp'] - 32) * 5/9),1)
                weather = {
                            'city' : Result_location_data['name'],
                            'id': Result_location_data['id'],
                            'temperature' : tempToCel,
                            'brief' : Result_location_data['weather'][0]['main'],
                            'description' : Result_location_data['weather'][0]['description'],
                            'icon' : Result_location_data['weather'][0]['icon'],
                            'humidity': Result_location_data['main']['humidity'],
                            'pressure': Result_location_data['main']['pressure'],
                            'windspeed': Result_location_data['wind']['speed'],
                            'cod': Result_location_data['cod'],
                            'country': Result_location_data['sys']['country']
                                }
                searched_location_data.append(weather)
                print(weather)
            else:
                weather = {'cod': Result_location_data['cod']}
                searched_location_data.append(weather)
            return Response(searched_location_data)