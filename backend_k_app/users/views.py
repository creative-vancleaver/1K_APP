from django.shortcuts import render
from django.contrib.auth.hashers import make_password

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

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
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
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

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print('user register data ', data)

    try:
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'],
            # username = data['email'],
            # name = data['name'],
            email = data['email'],
            password = make_password(data['password'])
        )
        print(user)
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    
    except:
        message = { 'detail': 'Useer with this email already exists.' }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    # user.first_name = data['first_name']
    # user.name = data['name']
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def addLanguageToUser(request, pk):
    # existing_country = Country.objects.filter(name=country_name).first()
    # user = request.user
    user = User.objects.get(id=pk)
    data = request.data
    print('data ', data)


    serializer = UserSerializerWithToken(user, many=False)

    # existing_lang = User.languages.all()
    # for l in existing_lang:

    # if not existing_lang:
    if not user.languages.filter(language=data['language']).exists():

        new_language = Language.objects.get(language=data['language'])
        user.languages.add(new_language)

        user.save()
        print('updated user ', user)
    
    else:
        print(f'language already associated with this user')

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    # print('user = ', request.user)
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
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
    # print(user)
    languages = user.languages.all()
    # print(languages)
    word_list = {}
    for language in languages:
        words = Word.objects.filter(language=language)[:10]
        word_list[language] = words
    # print(word_list)
    words = UserWord.objects.filter(user=user)
    # print(words)
    # user_words = UserWord.objects.filter(user=user)
    # serializer = UserProfileSerializer(context={ 'user': user, 'words': word_list})
    # serializer = WordSerializer(word_list, many=True)
    # serializer = UserProfileSerializer(context={'user': user, 'words': words})
    serializer = UserWordSerializer(words, many=True)
    # print(serializer.data)

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