from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Language, Translation, Word, Spanish, Country, Alphabet, Character

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):

    countries = CountrySerializer(many=True)
    word_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Language
        # fields = '__all__' 
        fields = ['id', 'language', 'countries', 'image', 'word_count']
        
    def get_word_count(self, obj):
        return obj.word_set.count()
    

class AlphabetSerializer(serializers.ModelSerializer):
    
    language = LanguageSerializer()    
    class Meta:
        model = Alphabet
        fields = '__all__'


class CharacterSerializer(serializers.ModelSerializer):
    
    alphabet = AlphabetSerializer()
    
    class Meta:
        model = Character
        fields = '__all__'

class WordSerializer(serializers.ModelSerializer):

    language = LanguageSerializer()
    characters = CharacterSerializer(many=True)
    class Meta:
        model = Word
        fields = '__all__'
        
        


class SpanishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spanish
        fields = '__all__'
        
class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = '__all__'
        