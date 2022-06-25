import requests
import environ
from rest_framework.response import Response
from rest_framework.views import APIView
# from sqlalchemy import true
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
            FavObj = UserFavourites.objects.create(user=username, favourites = {"id": [locationId]})
            print("create")
        else:
            # Update
            if request.data['params']['state']==True:
                print("Add")
                print(AlreadyStored[0].favourites["id"])
                StoredIds = AlreadyStored[0].favourites["id"]
                StoredIds.append(locationId)
                print(StoredIds)
                # Append the new object to AlreadyStored and update in db :)
                FavObj = UserFavourites.objects.update(user=username, favourites = {"id": StoredIds})
                print(FavObj)
            else:
                print("Remove")
        return Response("usefaves")

    # Function to get users locations
    def get(self, request):
        username = request.query_params.get('user')
        userFavObj = UserFavourites.objects.all().filter(user=username)
        # I need to ensure all id's are appended to the json id key
        userFavIds = userFavObj[0].favourites['id']
        userFavIdsDict = []
        for x in userFavIds:
            if request.query_params.get('favoutitesPage')=="true":
                # why this format so it's easier to map to favourites page
                newFavourite = {'id' : x}
                userFavIdsDict.append(newFavourite)
            else:
                newFavourite = x
                userFavIdsDict.append(newFavourite)
        print(userFavIdsDict)
        return Response(userFavIdsDict)
    

    
