from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )
from . import views

urlpatterns = [

    path('', views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pari'),
    path('all/', views.getUsers, name='list_users'),
    path('<str:pk>/', views.getUserById, name='use_by_id'),
    # path('all/update/<str:pk>/', views.updateUser, name='user-update'),
    path('<str:pk>/update/', views.updateUser, name='user_update'),
    # path('all/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('<str:pk>/delete/', views.deleteUser, name='user_delete'),
    path('<str:pk>/stats/', views.getUserStats, name='user-stats'),

    path('<str:pk>/add_lang/', views.addLanguageToUser, name='add_lang_to_user'),
    # path('add_lang/', views.addLanguageToUser, name='add_lang_to_user'),

    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='user_profile'),
    path('profile/update/', views.updateUserProfile, name='update_user_profile'),

]