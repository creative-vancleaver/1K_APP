from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str 

import urllib

import logging

from collections import defaultdict
from datetime import datetime, timedelta

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

# SPECIFIC EXCEPTION CATCHES
from django.db import IntegrityError

# DJANGO REST FRAMEWORK JSON WEB TOKEN AUTHENTICATION
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, UserWord
from .serializers import UserSerializer, UserSerializerWithToken, UserProfileSerializer, UserWordSerializer, OrganizedDataSerializer
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
            # password = make_password(data['password'])
            password = data['password']
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
    
@api_view(['POST'])
# @authentication_classes([IsAdminUser])
@permission_classes([IsAdminUser])
def add_user(request):
    
    data = request.data
    print(data)
    
    try:
        # language = Language.objects.get
        user = User.objects.create_user(
            first_name = data['first_name'],
            email = data['email'],
            # password = make_password(data['password'])
            # password = data['password']
        )
        # user.is_active = True
        user.is_active = False
        user.save()
        
        # GENERATE TOKEN + UID
        # token = PasswordResetTokenGenerator().make_token(user)
        # uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # GENERATE ACTIVATION TOKEN WITH JWT
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, settings.SECRET_KEY, algorithm='HS256')
        
        print('token = ', token)
        
        # CONSTRUCT ACTIVATION URL (ADJUST DOMAIN AS NECESSARY)
        # activation_url = f'https://1k_words.pro/activate/{ uid }/{ token }'
        activation_link = f"{ request.build_absolute_uri('/activate/')}{ urllib.parse.quote(token) }"
        
        print('activation link = ', activation_link)
        
        # SEND EMAIL WITH ACTIVATION LINK
        send_mail(
            'Activate your account',
            f'Hi { user.first_name }! Please use this link to activate your account: { activation_link }',
            'creativevancleave@gmail.com',
            [user.email],
            fail_silently=False,
        )
        
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        print(e)
        return Response({ 'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)
 
    # except IntegrityError:
    #     message = { 'detail': 'User with this email already exists.' }
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_user_data_from_token(request, token):
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'], is_active=False)
        
        serializer = UserSerializer(user, many=False)
        
        print(serializer.data)
        
        return Response(serializer.data)
    
    except jwt.ExpiredSignatureError:
        return Response({ 'error': 'Activation link has expired.' }, status=status.HTTP_400_BAD_REQUEST)
    except jwt.DecodeError:
        return Response({ 'error': 'This activtion code is not valid.' }, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({ 'error': 'User not found.' }, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def activate_user(request, token):
    
    print('activate_user')
    data = request.data
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'], is_active=False)      
        user.is_active = True
        user.password = make_password(data['password'])
        user.save()
        print(user)
        
        # GENERATE JWT TOKEN ON ACTIVATION
        refresh = RefreshToken.for_user(user)
        data = { 'refresh': str(refresh), 'access': str(refresh.access_token) }
        
        # MERGE WITH USER DATA
        user_data = UserSerializerWithToken(user).data
        data.update(user_data)
        
        print('data ', data)
        
        return Response(data, status=status.HTTP_200_OK)
    
    except jwt.ExpiredSignatureError:
        return Response({ 'error': 'Acivation link has expired.' }, status=status.HTTP_400_BAD_REQUEST)
    except jwt.DecodeError:
        return Response({ 'error': 'Invalid activation link.' }, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({ 'error': 'User not found.' }, status=status.HTTP_404_NOT_FOUND)


    # try:
    #     payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    # try:
    #     uid = force_str(urlsafe_base64_decode)(uidb64)
    #     user = User.objects.get(pk=uid)
    # except (TypeError, ValueError, OverflowError, User.DoesNotExist):
    #     user = None
        
    # if user is not None and PasswordResetTokenGenerator().check_token(user, token):
    #     user.is_active = True
    #     user.save()
        
    # # SERIALIZER USER DATA WITH TOKEN
    #     serializer = UserSerializerWithToken(user, many=False)
    
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    # else:
    #     return Response({ 'error': 'Activation link is invalid.' })
        
    
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
    users = User.objects.all().order_by('id')
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
    # serializer = UserSerializer(userForDeletion, many=False)
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
    # data = request.data
    # print('data ', request.GET)
    # page_number = data['pageNumber']
    # language = data['language']
    # print('data ', page_number, language)
    # print(data)
    # print(request.GET.get('pageNumber'))

    user = User.objects.get(id=pk)
    
    # default_page_number = 1
    # # page_number = data['pageNumber']
    # page_number = request.GET.get('pageNumber')
    # # default_language = user.languages[1]
    # default_language = user.languages.all()[0]
    # # language = data['language']
    # language = request.GET.get('language')
    # print('page no ,', default_page_number, page_number)
    # print('lang ,', default_language, language)
    
    # if (language is None):
    #     words = UserWord.objects.filter(user=user, user_word__language=default_language).order_by('id')
    # else :
    #     words = UserWord.objects.filter(user=user, user_word__language=language).order_by('id')
    
    
    # words = UserWord.objects.filter(user=user, isMastered=True)
    words = UserWord.objects.filter(user=user).order_by('id')
    
    # words = UserWord.objects.filter(user=user, user_word__language__language='spanish').order_by('id')
    # print('userStats word count ', words.count())
    
    organized_data = defaultdict(list)
    
    for word in words:
        language_name = word.user_word.language.language
        organized_data[language_name].append(word)
        
    # organized_data = dict(organized_data)
    
    # # DRF PAGINATION
    # # paginator = PageNumberPagination()
    # # paginated_words = paginator.paginate_queryset(words, request)

    serializer = UserWordSerializer(words, many=True)
    # # serializer = UserWordSerializer(paginated_words, many=True)
    # organized_data_serializer = OrganizedDataSerializer(data={ 'organized_data_dict': organized_data })
    
    # if organized_data_serializer.is_valid():
    #     serializer_data = organized_data_serializer.data
    #     print(serializer_data)
    #     return Response(serializer_data)
        
    # else:
    #     errors = organized_data_serializer.errors
    #     return Response(errors)
        
    
    return Response(serializer.data)
    # return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserWordsByLanguage(request, pk, language):
    # print('data from getUserWordsByLanguage', request.GET)
    # print('request.user = ', request.user.pk, pk)
    user = User.objects.get(id=pk)
    # page_number = request.GET.get('page')
    # language = request.GET.get('language')
    # print('User ID: ', user.id)
    
    if language == 'undefined':
        language_id = user.languages.all()[0].id
    else:
        language_id = language
        
    # pagination = LimitOffsetPagination()
    # limit = request.GET.get('limit', 10) #SHOLD I SET DEFAULT TO 10?
    # offset = request.GET.get('offset', 0) #SHOULD I SET DEFAULT TO 0?
    # pagination.default_limit = int(limit)
    # pagination.offset = int(offset)
    
    # mastered_words = UserWord.objects.filter(user=user, isMastered=True, user_word__language=language_id).order_by('id')
    # paginated_mastered = pagination.paginate_queryset(mastered_words, request)
    # mastered_serializer = UserWordSerializer(paginated_mastered, many=True)
    
    # not_mastered_words = UserWord.objects.filter(user=user, isMastered=False, user_word__language=language_id).order_by('id')
    # paginated_not_mastered = pagination.paginate_queryset(not_mastered_words, request)
    # not_mastered_serializer = UserWordSerializer(paginated_not_mastered, many=True)
    
    # total_count = mastered_words.count() + not_mastered_words.count()
    
    # if language == 'undefined':
    #     default_language = user.languages.all()[0].id
    #     words = UserWord.objects.filter(user=user, user_word__language=default_language).order_by('id')
    #     # mastered_words = UserWord.objects.filter(user=user, isMastered=True, user_word__language=default_language).order_by('id')
    #     # not_mastered_words = UserWord.objects.fitler(user=user, isMastered=False, user_word__language=default_language).order_by('id')
    # else:
    words = UserWord.objects.filter(user=user, user_word__language=language_id).order_by('id')
        # print('words ', words[:10])
        # mastered_words = UserWord.objects.fitler(user=user, isMastered=True, user_word__language=default_language).order_by('id')
        # not_mastered_words = UserWord.objects.filter(user=user, isMastered=False, user_word__language=language).order_by('id')
        
    # mastered_serializer = UserWordSerializer(mastered_words, many=True)
    # not_mastered_serializer = UserWordSerializer(not_mastered_words, many=True)
            
    # paginator = PageNumberPagination()
    # paginated_words = paginator.paginate_queryset(words, request)
    # user_words = UserWord.objects.filter(user=user).order_by('id')
    # print('UserWords filtered by USER ONLY ', user_words)
    # print('Filtered Words: ', words)
    
    limit = request.GET.get('limit', None)
    offset = request.GET.get('offset', None)
    pagination = LimitOffsetPagination()
    pagination.default_limit = 10
    
    if limit is not None:
        pagination.default_limit = int(limit)
        
    if offset is not None:
        pagination.offset = int(offset)
        
    paginated_words = pagination.paginate_queryset(words, request)
    # print(paginated_words)
     
    serializer = UserWordSerializer(paginated_words, many=True)
    # print('serializer data ', serializer.data)
    
    # return paginator.get_paginated_response(serializer.data)
    # return Response(serializer.data)
    
    # response = {
    #     'mastered': {
    #         'mastered_words': mastered_serializer.data,
    #         'mastered_count': mastered_words.count(),
    #     }, 
    #     'notMastered': {
    #         'notMasted_words': not_mastered_serializer.data,
    #         'notMastered_count': not_mastered_words.count()
    #     },
    #     'count': total_count,
    # }
    
    return pagination.get_paginated_response(serializer.data)
    # return pagination.get_paginated_response(response) 
    # return Response(response)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMasteredWords(request, pk, language):
    user = User.objects.get(id=pk)
    if language == 'undefined':
        language_id = user.languages.all()[0].id
    else:
        language_id = language
        
    pagination = LimitOffsetPagination()
    limit = request.GET.get('limit', 10)
    offset = request.GET.get('offset', 0)
    pagination.default_limit = int(limit)
    pagination.offset = int(offset)
    
    mastered_words = UserWord.objects.filter(user=user, isMastered=True, user_word__language=language_id).order_by('id')
    # total_count = UserWord.objects.all().count()
    # print('total_count ', total_count)
    paginated_mastered = pagination.paginate_queryset(mastered_words, request)
    mastered_serializer = UserWordSerializer(paginated_mastered, many=True)
    
    # response_data = {
    #     'results': mastered_serializer.data,
    #     'total_count': total_count
    # }
    
    return pagination.get_paginated_response(mastered_serializer.data)
    # return Response(response_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotMasteredWords(request, pk, language):
    
    user = User.objects.get(id=pk)
    if language == 'undefined':
        language_id = user.languages.all()[0].id
    else:
        language_id = language
        
    language_name = Language.objects.get(id=language_id)
    
    pagination = LimitOffsetPagination()
    limit = request.GET.get('limit', 10)
    offset = request.GET.get('offset', 0)
    pagination.default_limit = int(limit)
    pagination.offset = int(offset)
    
    print('limit = ', limit, 'offst = ', offset, 'pagination_offset = ', pagination.offset, 'language_id = ', language_id, 'language = ', language_name)
    
    not_mastered_words = UserWord.objects.filter(user=user, isMastered=False, user_word__language=language_id).order_by('id')
    print(not_mastered_words[34:64])
    paginated_not_mastered = pagination.paginate_queryset(not_mastered_words, request)
    print(paginated_not_mastered)
    not_mastered_serializer = UserWordSerializer(paginated_not_mastered, many=True)
    # print(not_mastered_serializer.data)
    
    return pagination.get_paginated_response(not_mastered_serializer.data)

@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def update_word_status(request, user_pk, word_pk):
    
    print(request.user.id, user_pk)
    print(word_pk)
    
    if request.user.id != int(user_pk):
        return Response({ 'error': 'Unauthorized' }, status=status.HTTP_403_FORBIDDEN)
    
    try:
        # user = User.objects.get(id=user_pk)
        language = request.GET.get('language')
        user_word = UserWord.objects.get(id=word_pk)
        
        # user_word.isMastered = not user_word.isMastered
        
        if user_word.isMastered:
            user_word.count = 2
            user_word.isMastered = False
        elif not user_word.isMastered:
            user_word.count = 0
            user_word.isMastered = True
            
        user_word.save()
        
        print(user_word, user_word.isMastered, user_word.count)
        
        serializer = UserWordSerializer(user_word)
        return Response(serializer.data)
    
    except UserWord.DoesNotExist:
        return Response({ 'message': 'Word not found' }, status=status.HTTP_404_NOT_FOUND)
    


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