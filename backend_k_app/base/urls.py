from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),

    # path('get1000words/', views.get1000WordsFromHTMLTable, name='get_1000_words'),

    path('languages/', views.getLanguages, name='languages'),

    # NOT IN USE - considering creating a language home/about page...
    path('languages/<str:lang>/', views.getLanguage, name='language'),

    path('languages/<str:language>/words/', views.getWordsByLanguage, name='language-words' ),

    path('languages/<str:language>/words/random/', views.getRandomWordLanguage, name='random-word-langauge'),

    path('languages/<str:language>/words/<str:pk>/', views.getWordByLanguage, name='word_by_langauge'),

    path('languages/<str:language>/words/<str:pk>/score/', views.wordScore, name='word_score'),

]