from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Language, Translation, Word, Spanish, Country

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):

    countries = CountrySerializer(many=True)
    class Meta:
        model = Language
        fields = '__all__'      

class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = '__all__'

class WordSerializer(serializers.ModelSerializer):

    language = LanguageSerializer()
    class Meta:
        model = Word
        fields = '__all__'

class SpanishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spanish
        fields = '__all__'