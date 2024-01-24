from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserWord, UserCharacter
from base.models import Word, Character

from base.serializers import LanguageSerializer, WordSerializer, CharacterSerializer

class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    isActive = serializers.SerializerMethodField(read_only=True)
    confirmedRules = serializers.SerializerMethodField(read_only=True)
    languages = LanguageSerializer(many=True)
    native_language = LanguageSerializer(many=False)
    # user_words = UserWordSerializer(many=True)
    first_name = serializers.CharField(required=True, error_messages={'required': 'Please provide a name.'})

    class Meta:
        model = User
        # fields = '__all__'
        fields = ['id', 'email', 'name', 'isAdmin', 'first_name', 'last_name', 'languages', 'native_language', 'isActive', 'confirmedRules']
    
    # def get_native_langauge(self, obj):
    #     native_language = obj.native_language.language

    #     return native_language

    def get_name(self, obj):
        name = obj.first_name + ' ' + obj.last_name
        if name == '':
            name = obj.email

        return name
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_isActive(self, obj):
        return obj.is_active
    
    def get_confirmedRules(self, obj):
        return obj.confirm_rules
    
class UserWordSerializer(serializers.ModelSerializer):

    # user_word = WordSerializer()
    user_word = serializers.CharField(source='user_word.word')
    translation = serializers.CharField(source='user_word.translation')
    pronunciation = serializers.CharField(source='user_word.pronunciation')
    characters = serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()
    ### alphabet = serializers.SerializerMethodField()
    alphabet = serializers.CharField(source='user_word.alphabet', default=None)
    # language = LanguageSerializer(source='user_word.language', read_only=True)
    # word = serializers.SerializerMethodField()
    class Meta:
        model = UserWord
        fields = ['user_word', 'translation', 'characters', 'alphabet', 'pronunciation', 'score', 'isMastered', 'language', 'user', 'id', 'count']
        
    def get_language(self, obj):
        return obj.user_word.language.language if obj.user_word and obj.user_word.language else None
    
    def get_characters(self, obj):
        word = obj.user_word
        characters = Character.objects.filter(words__id=word.id)
        return CharacterSerializer(characters, many=True).data if characters else None

    # def get_word(self, obj):
    #     word = obj.word.word
    #     # score = obj.word.score
    #     return word
    
class UserCharacterSerializer(serializers.ModelSerializer):
    
    user_character = serializers.CharField(source='user_character.character')
    pronunciation = serializers.CharField(source='user_character.pronunciation')
    # language = serializers.CharField(source='user_character.alphabet.language.language')
    alphabet = serializers.CharField(source='user_character.alphabet')
    language = serializers.SerializerMethodField()
    
    class Meta:
        model = UserCharacter
        fields = ['user_character', 'pronunciation', 'alphabet', 'language', 'id', 'count', 'isMastered']
        
    def get_language(self, obj):
        return obj.user_character.alphabet.language.language if obj.user_character and obj.user_character.alphabet.langauge else None
    
class OrganizedDataSerializer(serializers.Serializer):
    # organized_data_dict = UserWordSerializer(many=True, read_only=True)
    organized_data_dict = serializers.DictField(
        child=UserWordSerializer(many=True)
    )
    
class UserProfileSerializer(serializers.Serializer):
    # user = UserSerializer(many=False)
    # words = UserWordSerializer(many=True)
    user = serializers.SerializerMethodField()
    # languages = serializers.SerializerMethodField()
    words = serializers.SerializerMethodField()

    def get_user(self, obj):
        user = self.context.get('user')
        return UserSerializer(user, many=False).data if user else None
    
    # def get_languages(self, obj):
    #     user = self.context.get('user')
    #     languages = user.languages.all()
    #     return LanguageSerializer(languages, many=True)
    
    def get_words(self, obj):
        user = self.context.get('user')
        words = UserWord.objects.filter(user=user)
        return UserWordSerializer(words, many=True).data
class UserSerializerWithToken(UserSerializer):
    
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # ALL USER DATA DESIRED IN FRONTEND NEEDS TO BE PASSED IN HERE
        fields = ['id', 'email', 'isAdmin', 'token', 'first_name', 'languages', 'native_language', 'isActive', 'confirmedRules']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
