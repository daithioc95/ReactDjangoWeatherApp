from rest_framework import serializers
from . models import *
from favourites.models import UserFavourites
  
class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavourites
        fields = ['favourites',
                'user',]