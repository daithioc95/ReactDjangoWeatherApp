from distutils.log import error
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
import json

env = environ.Env()

class GetUserFavourites(APIView):
    # Function to add or remove items from favourites
    def post(self, request):
        username = request.data['params']['user']
        locationId = request.data['params']['id']
        # print("type(locationId)")
        # print(type(locationId))
        AlreadyStored = UserFavourites.objects.all().filter(user=username)
        print('len(AlreadyStored)')
        print(len(AlreadyStored))
        if len(AlreadyStored)==0:
            # Create
            FavObj = UserFavourites.objects.create(user=username, favourites = {"id": [locationId]})
            print("create")
        else:
            if 'DATABASE_URL' in os.environ:
                AlreadyStored = json.loads(AlreadyStored[0].favourites)
            else:
                AlreadyStored = AlreadyStored[0].favourites
            print('AlreadyStored')
            print(len(AlreadyStored))
        # Check if this logic works on live sit
            # Update
            # print(AlreadyStored[0].favourites["id"])
            StoredIds = AlreadyStored["id"]
            if request.data['params']['add']==True:
                StoredIds.append(locationId)
            else:
                StoredIds.remove(locationId)
            print(StoredIds)
            # Append the new object to AlreadyStored and update in db :)
            FavObj = UserFavourites.objects.filter(user=username).update(favourites = {"id": StoredIds})
            print("update")
            print(FavObj)
        return Response("usefaves")

    # Function to get users locations
    def get(self, request):
        try:
            username = request.query_params.get('user')
            userFavObj = UserFavourites.objects.all().filter(user=username)
            # I need to ensure all id's are appended to the json id key
            print("here is the count")
            print(userFavObj)
            print(userFavObj[0])
            print(userFavObj[0].favourites)
            print(type(userFavObj[0].favourites))
            # When in production, convert string array to json
            if 'DATABASE_URL' in os.environ:
                jsonDict = json.loads(userFavObj[0].favourites)
            else:
                jsonDict = userFavObj[0].favourites
            print(jsonDict['id'])
            for i in jsonDict['id']:
                print(i)
            # print(type(userFavObj[0].favourites))
            print(len(jsonDict['id']))
            if len(jsonDict['id']) == 0:
                return Response("No Favourites")
            else:
                userFavIds = jsonDict['id']
                userFavIdsDict = []
                for x in userFavIds:
                    if request.query_params.get('favoutitesPage')=="true":
                        print("favoutitesPage")
                        # why this format so it's easier to map to favourites page
                        newFavourite = {'id' : x}
                        userFavIdsDict.append(newFavourite)
                    else:
                        newFavourite = x
                        userFavIdsDict.append(newFavourite)
                print(userFavIdsDict)
                return Response(userFavIdsDict)
        except IndexError:
            return Response("No Favourites")
    

    
