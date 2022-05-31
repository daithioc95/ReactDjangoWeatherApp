from django.db import models
from jsonfield import JSONField

# Create your models here.
class UserFavourites(models.Model):
    favourites = JSONField()
    user = models.TextField()

    def __dict__(self):
        return self.favourites