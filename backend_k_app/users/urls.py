from django.urls import path
from . import views

urlpatterns = [

    path('', views.getRoutes, name='users'),
    path('all/', views.getUsers, name='list_users'),

]