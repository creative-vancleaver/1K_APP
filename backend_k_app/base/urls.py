from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),

    # path('get_geojson/', views.get_geojson_data, name='get_geojson_data'),
    # path('generate_tiles/', views.generate_image_tiles, name='generate_image_tiles'),

    path('languages/', views.getLanguages, name='languages'),
    path('languages/<str:lang>/', views.getLanguage, name='language'),

    path('words/', views.getWords, name='words'),
    # path('words/random/<str:pk>/', views.getRandomWord, name='random-word'),
    # path('words/random/', views.getRandomWord, name='random-word'),
    path('words/score/<str:pk>/', views.updateWordScore, name='update-word-score'),

    path('words/<str:language>/', views.getWordsByLanguage, name='language-words'),
    path('words/random/<str:language>/', views.getRandomWordLanguage, name='random-word-language'),


    path('words/<str:pk>/', views.getWord, name='word'),
]