from django.shortcuts import render

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
from .serializers import UserSerializer

# Create your views here.

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

@api_view(['GET'])
def getUsers(request):
    print(request.user)
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)