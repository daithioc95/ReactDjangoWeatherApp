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

class GetUserFavourites(APIView):
    def get(self, request):
        print(request)
        return Response("usefaves")

    
