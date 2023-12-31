import os
import random
import json

from django.conf import settings
# import pyvips
# import geopandas as gpd
# import matplotlib
# matplotlib.use('Agg')
from PIL import Image
# import matplotlib.pyplot as plt

from ast import literal_eval

from django.shortcuts import render
from django.http import QueryDict, JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status

from .serializers import WordSerializer, LanguageSerializer, CountrySerializer
from users.serializers import UserWordSerializer

from .models import Language, Translation, Word, Spanish, Country
from users.models import User, UserWord

# from .words import words

from bs4 import BeautifulSoup
import requests

# Create your views here.

def index(request):
	return render(request, 'backend_k_app/index.html')

@api_view(['GET'])
def getRoutes(request):
    
    routes = [
       
      'languages/',
      'languages/add/',
      'languages/<pk>/',
      'languages/update/<pk>/',
      'languages/delete/<pk>/',


      'words/',
      'words/add/',
      'words/random/',

      'words/top/',
      'words/<pk>/',
      
      'words/delete/<pk>/',
      'words/update/<pk>/',

      'words/<pk>/score/',
      'words/<pk>/update_score',
    ]

    return Response(routes)

# def generate_image_tiles(request):
#     geojson_data = get_geojson_data()

#   #  DEFINE OUTPUT DIRECTORY FOR TILES
#     tiles_output_dir = "/static/geojson_data/tiles/"

# # DEFINE OPTIONS FOR IMAGE TILING
#     options = {
#       # "layout": pyvips.ForeignDzLayout.google,
#       # "layout": pyvips.ForeignDzLayout.DEEPZOOM,
#       "tile_size": 256,
#       "suffix": '.jpg[Q=95]',
#       "background": [255, 255, 255], # WHITE BG
#       "properties": True, # PRESEVER METADATA
#     }

# # CONVERT GEOJSON TO TEMP GEOJSON FILE
#     temp_geojson_file = os.path.join(settings.BASE_DIR, 'static/geojson_data/temp_geojson.json')
#     with open (temp_geojson_file, 'w') as file:
#       file.write(json.dumps(geojson_data))

# # GENERATE IMAGE TILES USING PYVIPS
#     image = pyvips.Image.new_from_file(temp_geojson_file, access='sequential')
#     image.dzsave(tiles_output_dir, **options)

# # REMOVE TEMP FILE
#     os.remove(temp_geojson_file)

#     context = {'success': 'you have successfully tiled the image'}
#     return JsonResponse(context)

#     # return HttpResponse('image tiles generated successfully')

# def generate_image_tiles(request):
#     geojson_data = get_geojson_data()

#     temp_geojson_file = os.path.join(settings.BASE_DIR, 'static/geojson_data/temp_geojson.json')
#     with open(temp_geojson_file, 'w') as file:
#       file.write(json.dumps(geojson_data))
      
#     gdf = gpd.read_file(temp_geojson_file)

#     fig, ax = plt.subplots(figsize=(8, 8))
#     gdf.plot(ax=ax)

#     temp_image_file = os.path.join(settings.BASE_DIR, 'static/geojson_data/temp_image.png')
#     plt.savefig(temp_image_file, bbox_inches='tight', pad_inches=0, dpi=300)
#     # , transparent=False
#     plt.close()

#     rgba_img = Image.open(temp_image_file)
#     rgb_img = rgba_img.convert('RGB')

#     tiles_output_dir = os.path.join(settings.BASE_DIR, 'static/geojson_data/tiles/')

#     # img = Image.open(temp_image_file)
#     img_size = rgb_img.size[0]
#     tile_size = 256
#     for i in range(0, img_size, tile_size):
#        for j in range(0, img_size, tile_size):
#           tile = rgb_img.crop((i, j, i + tile_size, j + tile_size))
#           tile_file = os.path.join(tiles_output_dir, f'{ i }_{ j }.jpg')
#           tile.save(tile_file, 'JPEG', quality=95)

#     os.remove(temp_geojson_file)
#     os.remove(temp_image_file)

#     return HttpResponse('Image tiles generated success')

# # def get_tile(request, z, x, y):
# #    tile_path = f'/static/'

# # def get_geojson_data(request):
# def get_geojson_data():
#     file_path='/Users/jvc/Desktop/EVERYTHING/k_app/backend_k_app/static/geojson_data/geojson_data.geojson'
#     with open(file_path, 'r') as file:
#       geojson_data = json.load(file)
#       # # print(geojson_data)
#     # return JsonResponse(geojson_data)
#     return geojson_data

@api_view(['GET', 'POST'])
def uploadCountryNames(request):
   url = 'https://www.britannica.com/topic/list-of-countries-1993160'

   # print(requests.get(url))
   pages = requests.get(url)

   if pages.status_code == 200:

      soup = BeautifulSoup(pages.text, 'html.parser')

      ul_elements = soup.find_all('ul', class_='topic-list')

      for ul in ul_elements:
         li_elements = ul.find_all('li')

         for li in li_elements:
            country_name = li.get_text(strip=True)
            existing_country = Country.objects.filter(name=country_name).first()
            if not existing_country:
               Country.objects.create(name=country_name)
            else:
               pass

   else:
      print(f'Failed to fetch the URL. Status COde: { response.status_code }')

   return Response({ 'message': 'success' })

@api_view(['GET', 'POST'])
def get1000WordsFromHTMLTable(request):
#    url = 'https://strommeninc.com/1000-most-common-spanish-words-frequency-vocabulary/'
#    url = 'https://strommeninc.com/1000-most-common-french-words-frequency-vocabulary/'
#    requests.get(url)
#    # print(requests.get(url)) # RESPONSE === 200

#    data = request.data
#    # files = request.FILES
#    print(data)

#    selected_country_names = []
#    country_index = 0

#    while f'selectedCountries[{ country_index }]' in data:
#       selected_country = data[f'selectedCountries[{ country_index }]']
#       selected_country_names.append(selected_country)
#       country_index += 1

#    print(selected_country_names)

#    selected_countries = Country.objects.filter(name__in=selected_country_names)

#    # if data['selectedCountries']:
#    #    print(data['selectedCountries'])

#    if data['img']:
#       image = data['img']
#       print(image)
# #    print(data['language']['language'])
# #    url = data['url']
#    if data['url']:
#       url = data['url']
#       print(requests.get(url))

#    #    pages = requests.get(url)
#       pages = requests.get(url)
#    #    parser-lxml = Change html into Python friendly format
#       soup = BeautifulSoup(pages.text, 'lxml')
#    #    print(soup)
#    #    print(soup.table)
#    #    print(soup.table.find('tr'))
#    #    language = soup.table.find('tr').text
#       row1 = soup.table.find('tr')
#       row1_data = row1.find_all('td')
#       print(row1_data)
# #    language_from_page = row1_data[1].text.lower() #spanish
#    language_from_form = data['language'].lower()
#    print('language from form, ', language_from_form)
# #    language_exists = Language.objects.filter(language=language_from_page).exists()
#    language_exists = Language.objects.filter(language=language_from_form).exists()

#    if not language_exists:
#       new_language = Language.objects.create(language=language_from_form)
#       new_language.save()
#       print('created new language')


#       if data['url']:
#          print('adding new words to ', new_language)


#          tabel_rows = soup.table.find_all('tr')
#       #    print(tabel_rows)
#          for tr in tabel_rows[1:]:
#             print(tr)
#             tabel_data = tr.find_all('td')
#             no = tabel_data[0].text
#             word = tabel_data[1].text
#             translation = tabel_data[2].text
#             print(no, word, translation)
#             new_word = Word.objects.create(language=new_language, word=word, translation=translation)
#             new_word.save()

#       else:
#          print('no URL provided -- no words to be added')
#          return Response({'message': 'No URL provided. No words added'}, status=status.HTTP_200_OK)

#    else:
#       print('language already exists ---- checking for words')
#       exists_language = Language.objects.get(language=language_from_form)
#       exists_words = Word.objects.filter(language=exists_language).count()
#       new_language = exists_language
#       print(new_language, ' word count ', exists_words)

#       return Response({'message': 'Langauge already exists'}, status=status.HTTP_200_OK)

#    if exists_words == 0:

   data = request.data

   language_from_form = data['language'].lower()
   language_exists = Language.objects.filter(language=language_from_form).exists()

   if not language_exists:
      language = Language.objects.create(language=language_from_form)
      language.save()
   else:
      language = Language.objects.get(language=language_from_form)

   if data['img']:
      image = data['img']
      if not language.image:
         language.image = image
         language.save()

   selected_country_names = []
   country_index = 0

   while f'selectedCountries[{ country_index }]' in data:
      selected_country = data[f'selectedCountries[{ country_index }]']
      selected_country_names.append(selected_country)
      country_index += 1

   selected_countries = Country.objects.filter(name__in=selected_country_names)
   language_country_names = language.countries.values_list('name', flat=True)
   # new_countries = []

   if len(selected_countries) > 0:
      for country_name in selected_countries:
         if country_name not in language_country_names:
            country = Country.objects.get(name=country_name)
            language.countries.add(country)
            language.save()
   
   if data['url']:
      url = data['url']
      # print('add1000Words URL === ', url)
      pages = requests.get(url)
      soup = BeautifulSoup(pages.text, 'lxml')

      language_words = Word.objects.filter(language=language)

      # if language_from_form == 'english':
      #    # ordered_list = soup.find('ol')
      #    # # print(ordered_list)
      #    # list_items = ordered_list.find_all('li')
      #    # print(len(list_items))

      #    # for item in list_items:
      #    #    word = item.text

      #       existing_word = language_words.filter(word=word).first()

      #       if existing_word is None:
      #          new_word = Word.objects.create(language=language, word=word)
      #          new_word.save()
         
      # else:

      table_rows = soup.table.find_all('tr')

      # if language_from_form == 'english':
      #    print(len(table_rows))          

      for tr in table_rows[1:]:
         table_data = tr.find_all('td')
         # print(len(table_rows))

         if language_from_form == 'english':
            # print(len(table_rows))
            word = table_data[1].text

            existing_word = language_words.filter(word=word).first()
         
            if existing_word is None:
               new_word = Word.objects.create(language=language, word=word)
               new_word.save()
               # new_word = Word.objects.create(language=language, word=word, translation=translation)
               # new_word.save()

         else:
            no = table_data[0].text
            word = table_data[1].text
            translation = table_data[2].text

            existing_word = language_words.filter(word=word, translation=translation).first()
            
            if existing_word is None:
               new_word = Word.objects.create(language=language, word=word, translation=translation)
               new_word.save()


   return Response({'message': 'success'})

@api_view(['GET'])
@permission_classes([AllowAny])
def getLanguages(request):
    languages = Language.objects.all().order_by('id')
    serializer = LanguageSerializer(languages, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getLanguage(request, lang):
   language = Language.objects.get(language=lang)
   serializer = LanguageSerializer(language, many=False)

   return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_language(request, language):
   
   # CHECK FOR ADMIN USER STATUS
   if not request.user.is_staff:
      return Response({ 'detail': 'You do not have permission to perform this action'}, status=403)
   
   data = request.data
   # print(data)
   
   language = Language.objects.get(language=language)
   
   # if data['img']:
   #    image = data['img']
   #    if image != language.image:
   #       language.image = image
   
   image = request.FILES.get('img')
   if image and image != language.image.name:
      language.image.save(image.name, image, save=True)

   selected_country_names = []
   country_index = 0
   
   while f'selectedCountries[{ country_index }]' in data:
      country = data[f'selectedCountries[{ country_index }]']
      selected_country_names.append(country)
      country_index += 1
      
   updated_countries = Country.objects.filter(name__in=selected_country_names)
   existing_countries = language.countries.values_list('name', flat=True)
   
   if len(updated_countries) > 0:
      for country_name in updated_countries:
         if country_name not in existing_countries:
            country = Country.objects.get(name=country_name)
            language.countries.add(country)
            language.save()
   # if data['selectedCountries']:
   #    for country_name in data['selectedCountries']:
   #       country = Country.objects.get(name=country_name)
   #       language.countries.add(country)
         
   language.save()
   
   serializer = LanguageSerializer(language, many=False)
   
   return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_language(request, language_id):
   
   if not request.user.is_staff:
      return Response({ 'detail': 'You do not have permission to perform this action.' }, status=403)
   
   # language = Language.objects.get(id=language_id)
   language = get_object_or_404(Language, id=language_id)
   language.delete()
   
   return Response({'success': True, 'detail':  'User successfully deleted.' })
   
   

@api_view(['GET']) 
@permission_classes([IsAdminUser])
def getCountries(request):
   countries = Country.objects.all()
   serializezr = CountrySerializer(countries, many=True)

   return Response(serializezr.data)

@api_view(['GET'])
def getWords(request):

    words = Word.objects.all()
    serializer = WordSerializer(words, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getWordsByLanguage(request, language):
  # print(language)
  # # if language == 'undefined':
  # #     context = {'detail': 'This language has no words yet.'}
  # #     return Response(context, status=status.HTTP_400_BAD_REQUEST)
  # languages = Language.objects.all()
  # print(languages)
  # if Language.objects.filter(language=language).exists():
  #   print('yes')
     
  #   if language == 'spanish':
  #     words = Spanish.objects.all()
  #     # words = language.objects.all()
  #     serializer = WordSerializer(words, many=True)
  #     return Response(serializer.data)
  #   else:
  #     words = None
  #     context = {'detail': 'This language has no words yet.'}
  #     return Response(context, status=status.HTTP_400_BAD_REQUEST)
  # else:
  #    print('no')
  #    context = {'detail': 'This language is not yet supported.'}
  #    return Response(context, status=status.HTTP_400_BAD_REQUEST)
  language = Language.objects.get(language=language)
  words = Word.objects.filter(language=language)[:12]

  if words.count() != 0:
     serializer = WordSerializer(words, many=True)
     return Response(serializer.data)
  else:
     context = {'detail': 'This language has no words yet.'}
     return Response(context, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserWordsByLanguage(request, language):
   language = Language.objects.get(language=language)
   user_words = UserWord.objects.filter(user_word__language=language)

   serializer = WordSerializer(user_words, many=True)

   return Response(serializer.data)
    

@api_view(['GET'])
def getWordByLanguage(request, language, pk):
#    word = Word.objects.get(pk=pk, language=language)
#    serializer = WordSerializer(word, many=False)
    # print(language)
    # print(pk)
    word = Word.objects.get(pk=pk)
    serializer = WordSerializer(word, many=False)

    return Response(serializer.data)

@api_view(['GET'])
def getWord(request, pk):
    word = Word.objects.get(id=pk)
    serializer = WordSerializer(word, many=False)

    return Response(serializer.data)
    # word = None

    # for i in words:
    #     if i['id'] == pk:
    #         word = i
    #         break
    
    # return Response(word)


@api_view(['GET', 'PUT'])
def wordScore(request, pk, language):
   # print('wordScore request pk language ', request.data, pk, language)
   # print(request.user)

   # user_word = UserWord.objects.get(user__email=request.user, user_word__pk=pk)
   user_word = UserWord.objects.get(id=pk)
   # print(user_word)
   # serializer = UserWordSerializer(user_word, many=False)
   # oldScore = serializer.data['score']
   data = request.data
   answer = data['value']
   # print(user_word, 'answer ', answer)
   # context = None
   
   # if request.method == 'GET'
   if request.method == 'PUT':
      if answer == 'correct':
         # # print('old score ', user_word.score)
         # print('old count ', user_word.count)
         # user_word.score += 1
         user_word.count -= 1
         user_word.save()
         # print('new count ', user_word.count)
         
         if user_word.count == 0:
            user_word.isMastered = True
            user_word.save()
            
      if answer == 'incorrect':
         # print('old count ', user_word.count)
         user_word.count += 1
         user_word.save()
         # print('new count ', user_word.count)
         
      serializer = UserWordSerializer(user_word, many=False)
      # print('NEW WORD WITH COUNT === ', serializer.data)
         # context = 

      return Response(serializer.data)
   
   return Response({ 'detail': 'updated word score' })


   #  word = Word.objects.get(pk=pk)
   #  seriazlizer = WordSerializer(word, many=False)
   #  oldScore = seriazlizer.data['score']
   #  data = request.data
   #  answer = data['value']
   #  print(word, 'answer ', answer)
   #  context = None

   #  if request.method == 'GET':
   #     context = {'message': 'you are making a get request', 'word': seriazlizer.data, 'oldScore': oldScore}
   #  #    return Response(context)
   #  elif request.method == 'PUT':
   #     if answer == 'correct':
   #          print('old score ', word.score)
   #          word.score += 1
   #          word.save()
   #          print('new score ', word.score)
   #          seriazlizer = WordSerializer(word, many=False)
   #          context = {'message': 'you are making a put request', 'new_score': seriazlizer.data['score'], 'word': seriazlizer.data}
   #          # return Response(context)
                        
   #  return Response(context)


# @api_view(['GET'])
# def getWordScore(request, pk):
#     word = Word.objects.get(pk=pk)
#     #  score = word.score
#     serializer = WordSerializer(word, many=False)
#     score = serializer.data['score']

#     context = {'word': serializer.data, 'score': score}

#   #  return Response(serializer.data['score'])
#     return Response(context)

# @api_view(['PUT'])
# def updateWordScore(request, pk, score):
#   word = Word.objects.get(pk=pk)
#   serializer = WordSerializer(word, many=False)

#   #  score = serializer.data['score']

#   context = {'word': serializer.data, 'score': score }
#   return Response(context)


@api_view(['GET'])
def getRandomWord(request):
    # word = Word.objects.all().order_by('?')[0]
    words = Word.objects.all()
    word = random.choice(words)
    pk = word.pk
    serializer = WordSerializer(word, many=False)
    # print('randomword ', word)

    return Response(serializer.data)

@api_view(['GET'])
def getRandomWordLanguage(request, language):
   # # print('request.user = ', request.user)
   # # print('requst.data = ', request.data)
   language = Language.objects.get(language=language)

   if request.user != 'AnonymousUser':
      user = User.objects.get(email=request.user)
      user_words = UserWord.objects.filter(user=user, user_word__language=language).exclude(isMastered=True)
      user_words_total = UserWord.objects.filter(user=user, user_word__language=language).count()
      # print('getRandomWordLanguage counts ', user_words.count(), user_words_total)
      
      if user_words.exists():
         user_word = random.choice(user_words)
         serializer = UserWordSerializer(user_word, many=False)

         return Response(serializer.data)
      
      else:
         return Response({ 'detail': 'There are no more un-mastered words.' })

   else:

      return Response({ 'detail': 'You must log in to view this page.' })


   # words = Word.objects.filter(language=language)
   # # words = UserWord.objects.filter(user_word__language=language)
   # word = random.choice(words)
   # # serializer = UserWordSerializer(word, many=False)
   # serializer = WordSerializer(word, many=False)


   # return Response(serializer.data)
#   # print(language)
#   lang = Language.objects.get(language=language)

#   if language == 'spanish':
#     # words = Spanish.objects.all()
#     # DOH - I DELETED ALL THE WORDS IN THE SPANISH MODEL...
#     words = Word.objects.filter(language=lang)
#     # # print(words)
#     word = random.choice(words)
#     serializer = WordSerializer(word, many=False)
#     return Response(serializer.data)
#   else:
#     return Response('Thou shall not pass!')

@api_view(['POST'])
def updateWordScore(request, pk):
    user = request.user
    word = Word.objects.get(pk=pk)
    data = request.data
        # answer = request.POST
    # # print(answer)
    # print(data)

    answer = data['value']
    # print(answer)

    # word = data['word']['word']
    # # print(word)

    if answer == 'correct':
        word.score += 1
    # print(word.score)
    word.save()
    # print(word.score)
    
    # query_dict = literal_eval(data)
    # qd = QueryDict(mutable=True)
    # for item in query_dict:
    #     qd.update(item)

    # # print(qd)

    return Response('Word score has been updated')
