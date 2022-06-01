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
    # Function to add or remove items from favourites
    def post(self, request):
        username = request.data['params']['user']
        locationId = request.data['params']['id']
        AlreadyStored = UserFavourites.objects.all().filter(user=username)
        if AlreadyStored.count() == 0:
            # Create
            FavObj = UserFavourites.objects.create(user=username, favourites = {'id': [locationId]})
            print("create")
        else:
            # Update
            if request.data['params']['state']==True:
                print("Add")
                # FavObj = UserFavourites.objects.update(user=username, favourites = {'id': locationId})
                print(FavObj)
                # FavObj.save()
            else:
                print("Remove")
        return Response("usefaves")

    # Function to get users locations
    def get(self, request):
        username = request.query_params.get('user')
        userFavObj = UserFavourites.objects.all().filter(user=username)
        userFavIds = userFavObj[0].favourites['id']
        userFavIdsDict = []
        for x in userFavIds:
            newFavourite = {'id' : x}
            userFavIdsDict.append(newFavourite)
        print(userFavIdsDict)
        return Response(userFavIdsDict)
    

    
