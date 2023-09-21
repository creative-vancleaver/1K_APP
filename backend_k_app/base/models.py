import os

from django.db import models
from django.conf import settings

# from users.models import User

# Create your models here.

def country_path(instance, filename):
    return '/'.join(['countries', str(instance.name), filename])
class Country(models.Model):
    name = models.CharField(max_length=500, unique=True)
    flag = models.ImageField(null=True, blank=True, upload_to=country_path)

    class Meta:
        ordering = ['id']
        verbose_name_plural = 'Countries'

    def __str__(self):
        return self.name

def language_path(instance, filename):
    return '/'.join(['languages', str(instance.language), filename])
class Language(models.Model):
    language = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to=language_path)
    countries = models.ManyToManyField(Country, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.language
    
class Translation(models.Model):
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    word = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.word

class Word(models.Model):
    word = models.CharField(max_length=200, blank=True, null=True)
    # language = models.CharField(max_length=200, blank=True, null=True)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    translation = models.CharField(max_length=200, blank=True, null=True)
    # translation = models.OneToOneField(Translation, on_delete=models.SET_NULL, null=True, related_name='word_translation')
    # I want a FK - a word should have 1 translation and a translation can have many words
    score = models.IntegerField(null=True, blank=True, default=0)
    isCorrect = models.BooleanField(default=False, null=True, blank=True)
    isMastered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.word
    
# class UserWord(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     word = models.ForeignKey(Word, on_delete=models.CASCADE)
    
# I DON'T THINK THIS MODEL IS NEEDED ANYMORE. I UPDATED THE VIEW TO FETCH WORDS BASED ON THE FK TO LANGUAGE MODEL...
class Spanish(Word):
    class Meta:
        verbose_name_plural = 'Spanish'
    def __str__(self):
        return self.word
    
    




    
