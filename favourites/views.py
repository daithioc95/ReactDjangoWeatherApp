from decouple import config
import json
import os
from distutils.log import error
import requests
import environ
from rest_framework.response import Response
from rest_framework.views import APIView
from . serializer import *
from dotenv import load_dotenv
load_dotenv()

env = environ.Env()


class GetUserFavourites(APIView):
    # Function to add or remove items from favourites
    def post(self, request):
        username = request.data['params']['user']
        locationId = request.data['params']['id']
        AlreadyStored = UserFavourites.objects.all().filter(user=username)
        # if no information on user, create obj to store ids
        if len(AlreadyStored) == 0:
            FavObj = UserFavourites.objects.create(
                user=username, favourites={"id": [locationId]})
        else:
            # we must load json when extracting from postgres
            if 'DATABASE_URL' in os.environ:
                AlreadyStored = json.loads(AlreadyStored[0].favourites)
            else:
                AlreadyStored = AlreadyStored[0].favourites
            # Updated list created below
            StoredIds = AlreadyStored["id"]
            # Append if adding to favourites, remove otherwise
            if request.data['params']['add'] == True:
                StoredIds.append(locationId)
            else:
                StoredIds.remove(locationId)
            # Update database with updated stored items list
            UserFavourites.objects.filter(user=username).update(
                favourites={"id": StoredIds})
        return Response("usefaves")

    # Function to get users locations
    def get(self, request):
        try:
            username = request.query_params.get('user')
            userFavObj = UserFavourites.objects.all().filter(user=username)
            # we must load json when extracting from postgres
            if 'DATABASE_URL' in os.environ:
                jsonDict = json.loads(userFavObj[0].favourites)
            else:
                jsonDict = userFavObj[0].favourites
            if len(jsonDict['id']) == 0:
                return Response("No Favourites")
            else:
                userFavIds = jsonDict['id']
                userFavIdsDict = []
                for x in userFavIds:
                    # change format depending on weather it is being used for favourite page or home for ease of mapping
                    if request.query_params.get('favoutitesPage') == "true":
                        newFavourite = {'id': x}
                        userFavIdsDict.append(newFavourite)
                    else:
                        newFavourite = x
                        userFavIdsDict.append(newFavourite)
                return Response(userFavIdsDict)
        except IndexError:
            return Response("No Favourites")
