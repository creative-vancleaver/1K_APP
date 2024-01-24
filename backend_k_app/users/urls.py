from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )
from . import views

urlpatterns = [

    path('', views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pari'),
    
    path('add_user/', views.add_user, name='add_user'),
    path('data_from_token/<str:token>/', views.get_user_data_from_token, name='data_from_token'),
    path('activate_user/<str:token>/', views.activate_user, name='activate_user'),

    # path('all/update/<str:pk>/', views.updateUser, name='user-update'),
    path('<str:pk>/update/', views.updateUser, name='user_update'),
    # path('all/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('<str:pk>/delete/', views.deleteUser, name='user_delete'),
    path('<str:pk>/stats/', views.getUserStats, name='user-stats'),
    
    path('<str:pk>/user_words/<str:language>/', views.getUserWordsByLanguage, name='user_words_by_language'),
    
    path('<str:pk>/mastered_words/<str:language>/', views.getMasteredWords, name='get_mastered_words'),
    path('<str:pk>/not_mastered/<str:language>/', views.getNotMasteredWords, name='not_mastered_words'),
    
    path('<str:user_pk>/user_words/<int:word_pk>/update/', views.update_word_status, name='update_user_word_status'),

    path('<str:pk>/add_lang/', views.addLanguageToUser, name='add_lang_to_user'),
    # path('add_lang/', views.addLanguageToUser, name='add_lang_to_user'),
    
    path('<str:pk>/mastered_characters/<str:language>/', views.getMasteredCharacters, name='get_mastered_characters'),
    path('<str:pk>/not_mastered_characters/<str:language>/', views.getNotMasteredCharacters, name='get_not_mastered_characters'),

    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='user_profile'),
    path('profile/update/<str:pk>/', views.updateUserProfile, name='update_user_profile'),
    path('all/', views.getUsers, name='list_users'),
    
    path('bug_form/', views.debug_form_submission, name='bug_form'),
    path('confirm_rules/', views.confirm_rules, name='confirm_rules'),
    # path('<str:pk>/', views.getUserById, name='use_by_id'),

]