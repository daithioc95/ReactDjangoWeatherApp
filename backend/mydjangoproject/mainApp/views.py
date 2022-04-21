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

# Create your views here.
# @api_view(['POST'])
class ReactView(APIView):

    def get(self, request):
        weather_data = []
        cities = City.objects.all()
        # Sort out secret key when city is undefinded
        city = 'Dublin'
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={os.getenv('WEATHER_API')}"
        city_weather = requests.get(url.format('Dublin')).json()
        weather_data.append(city_weather)
        return Response(weather_data)


    def post(self, request):
        weather_data = []
        print('form post')
        city = request.data['name']
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={os.getenv('WEATHER_API')}"
        city_weather = requests.get(url.format(city)).json()
        weather_data.append(city_weather)
        print(city_weather)
        # form = CityForm(request.POST)
        # form.save()
        return Response(weather_data)

class SearchedLocation(APIView):

    def get(self, request):
        searched_location_data = []
        print(request.query_params.get('name'))
        city = request.query_params.get('name')
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={os.getenv('WEATHER_API')}"
        Result_location_data = requests.get(url.format(city)).json()
        searched_location_data.append(Result_location_data)
        return Response(searched_location_data)


        # if request.method == 'POST':
        #     print('form post')
        #     form = CityForm(request.POST)
        #     form.save()

        # form = CityForm()

        # weather_data = []
        # for city in cities:
        #     try:
        #         city_weather = requests.get(url.format(city)).json()

        #         weather = {
        #             'city' : city,
        #             'temperature' : city_weather['main']['temp'],
        #             'description' : city_weather['weather'][0]['description'],
        #             'icon' : city_weather['weather'][0]['icon'],
        #             'humidity': city_weather['main']['humidity'],
        #             'pressure': city_weather['main']['pressure'],
        #             'country': city_weather['sys']['country'],
        #             'sunrise': city_weather['sys']['sunrise'],
        #             'sunset': city_weather['sys']['sunset'],
        #             'windspeed': city_weather['wind']['speed']
        #         }

        #         weather_data.append(weather)
        #         print(city)
        #     except KeyError:
        #         print('KeyError')
        #         pass

        # context = {'weather_data': weather_data, 'form': form}

        # return render(request, 'index.html', context)
        