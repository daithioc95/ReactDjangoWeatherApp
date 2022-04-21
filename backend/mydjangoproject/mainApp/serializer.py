from rest_framework import serializers
from . models import *
  
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['city',
                'temperature',
                'description',
                'icon',
                'humidity',
                'pressure',
                'country',
                'sunrise',
                'sunset',
                'windspeed']