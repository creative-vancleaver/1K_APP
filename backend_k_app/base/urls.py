from django.urls import path
from . import views

urlpatterns = [
    # path('', views.getRoutes, name='routes'),

    path('get1000words/', views.get1000WordsFromHTMLTable, name='get_1000_words'),

    # path('add_countries/', views.uploadCountryNames, name='add_countries'),
    
    path('<str:language>/update/', views.update_language, name='update_language'),
    
    path('<str:language_id>/delete/', views.delete_language, name='delete_language'),

    path('', views.getLanguages, name='languages'),

    path('countries/', views.getCountries, name='countries'),
    
    path('alphabet/', views.getAllAlphabets, name='all_alphabets'),

    # NOT IN USE - considering creating a language home/about page...
    path('<str:lang>/', views.getLanguage, name='language'),

    path('<str:language>/words/', views.getWordsByLanguage, name='language-words' ),

    path('<str:language>/words/random/', views.getRandomWordLanguage, name='random-word-langauge'),

    path('<str:language>/words/<str:pk>/', views.getWordByLanguage, name='word_by_langauge'),

    path('<str:language>/words/<str:pk>/score/', views.wordScore, name='word_score'),
    
    # ALPHABET + CHARACTER URLS
    path('<str:language>/alphabet/add/', views.addAlphabet, name='add_alphabet'),
        
    path('<str:language>/alphabet/get_all/', views.getAllAlphabetsByLanguage, name='get_all_alphabets_by_language'),
    
    path('<str:language>/characters/all/', views.getAllCharactersLanguage, name='get_all_chars_lang'),

]