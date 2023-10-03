from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt

import logging

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status

# SPECIFIC EXCEPTION CATCHES
from django.db import IntegrityError

# DJANGO REST FRAMEWORK JSON WEB TOKEN AUTHENTICATION
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, UserWord
from .serializers import UserSerializer, UserSerializerWithToken, UserProfileSerializer, UserWordSerializer
from base.serializers import WordSerializer

from base.models import Language, Word

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # ADD CUSTOM CLAIMS
    #     token['username'] = user.username
    #     token['message'] = 'hello world'

    #     return token

    default_error_messages = {
        'no_active_account': 'Username or Password does not match.'
    }

    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data
        print(serializer)

        for key, value in serializer.items():
            data[key] = value

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'users/',
        'users/add',
        'users/<pk>',
        'users/<pk>/update/',
        'users/<pk>/delete/',
    ]

    return Response(routes)

logger = logging.getLogger(__name__)

@api_view(['POST'])
@csrf_exempt
# @permission_classes([AllowAny])
@authentication_classes([])
@permission_classes([])
def registerUser(request):
    data = request.data
    # print(data['native_language']['value'].lower())

    try:
        language = Language.objects.get(language=data['native_language']['value'].lower())
        user = User.objects.create_user(
            first_name = data['first_name'],
            native_language = language,
            # last_name = data['last_name'],
            # username = data['email'],
            # name = data['name'],
            email = data['email'],
            password = make_password(data['password'])
        )
        user.is_active = True
        user.save()
        print(user)
        serializer = UserSerializerWithToken(user, many=False)
        print(serializer.data)
        return Response(serializer.data)
        # return Response({ 'detail': 'success' })
    
    except IntegrityError:
        message = { 'detail': 'Useer with this email already exists.' }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request, pk):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    # user.first_name = data['first_name']
    # user.name = data['name']
    user.first_name = data['first_name']
    # user.last_name = data['last_name']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


def remove_duplicates(user_word_objects):
    unique_combinations = {}

    unique_user_word_objects = []

    for user_word in user_word_objects:
        identfier= (user_word.user.id, user_word.user_word.id)

        if identfier not in unique_combinations:
            unique_combinations[identfier] = True
            unique_user_word_objects.append(user_word)

    return unique_user_word_objects

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def addLanguageToUser(request, pk):
    print('ADDLANGUAGETOUSER ', request.data)
    # existing_country = Country.objects.filter(name=country_name).first()
    # user = request.user
    user = User.objects.get(id=pk)
    data = request.data
    print('data ', data)

    # existing_lang = User.languages.all()
    # for l in existing_lang:

    # if not existing_lang:
    if not user.languages.filter(language=data['language']).exists():

        new_language = Language.objects.get(language=data['language'])
        user.languages.add(new_language)

        print(new_language.word_set.count())
        words = new_language.word_set.all()
        user_word_objects = []

        for word in words:
            user_word = UserWord(user=user, user_word=word)
            user_word_objects.append(user_word)

        unique_user_word_objects = remove_duplicates(user_word_objects)
        UserWord.objects.bulk_create(unique_user_word_objects)

        # for word in new_language.word_set.all().first():
        #     user_word = Word.objects.get(word=word, language=new_language)
        #     UserWord.objects.create(user=user, user_word=user_word)

        user.save()
        print('updated user ', user)

    
    else:
        
        print(f'language already associated with this user')
        language = Language.objects.get(language=data['language'])
        print(language.word_set.count())

    serializer = UserSerializerWithToken(user, many=False)



    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    # print('user = ', request.user)
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    # print(user)
    data = request.data
    print(data)

    user.first_name = data['first_name']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    # print(userForDeletion)
    userForDeletion.delete()

    return Response('User was deleted')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    # print(user)
    serializer = UserSerializer(user, many=False)
    # VV RETURNS INDEX 0 OF USER.LANGUAGES QUERYDICT
    # print(user.languages.all()[0])
    # language = user.languages.all()[0]
    # words = Word.objects.filter(language=language)[10:]
    # print(words)
    # mastered_words = Word.objects.filter(language=language, score=1)
    # print(mastered_words)
    # serializer = UserProfileSerializer({ 'user': user, 'words': mastered_words })
    # serializer = UserProfileSerializer(context={'user': user})
    return Response(serializer.data)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUserProfile(reqeust):
#     user = request.user
#     serializer = UserSerializerWithToken(user, many=False)

#     data = request.data
#     user.first_name = data['first_name']
#     user.last_name = data['last_name']
#     # user.useranme = data['username']
#     user.username = data['email']
#     user.email = data['email']

#     if data['password']:
#         user.password = make_password(data['password'])

#     user.save()

#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserStats(request, pk):
    user = User.objects.get(id=pk)
    words = UserWord.objects.filter(user=user, isMastered=True)

    serializer = UserWordSerializer(words, many=True)

    return Response(serializer.data)

# @api_view(['POST'])
# def registerUser(request):
#     data = request.data

#     try:
#         user = User.objects.create(
#             first_name = data['first_name'],
#             username = data['username'],
#             email = data['email'],
#             password = make_password(data['password'])
#         )