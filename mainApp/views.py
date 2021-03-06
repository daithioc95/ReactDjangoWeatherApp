import requests
import environ
from rest_framework.response import Response
from rest_framework.views import APIView
from . serializer import *
from dotenv import load_dotenv
load_dotenv()
import os
from decouple import config 

env = environ.Env()

class SearchedLocation(APIView):
    # Api which takes city name and returns weather data
    def get(self, request):
        searched_location_data = []
        if request.query_params.get('name'):
            param = request.query_params.get('name')
            url = f"http://api.openweathermap.org/data/2.5/weather?q={param}&units=metric&appid={config('WEATHER_API')}"
        else:
            param = request.query_params.get('id')
            url = f"http://api.openweathermap.org/data/2.5/weather?id={param}&units=metric&appid={config('WEATHER_API')}"
        Result_location_data = requests.get(url.format(param)).json()
        if Result_location_data['cod']==200:
            # Convert api result from farrenheight to celcius
            # tempToCel = round(((Result_location_data['main']['temp'] - 32) * 5/9),1)
            # Return only relevant dat from API
            weather = {
                    'city' : Result_location_data['name'],
                    'id': Result_location_data['id'],
                    'temperature' : Result_location_data['main']['temp'],
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
        # Return error code so frontend can identify if location cannot be found
        else:
            weather = {'cod': Result_location_data['cod']}
            searched_location_data.append(weather)
        return Response(searched_location_data)