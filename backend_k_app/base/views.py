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

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import WordSerializer, LanguageSerializer

from .models import Language, Translation, Word, Spanish

# from .words import words

from bs4 import BeautifulSoup
import requests

# Create your views here.

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
#       # print(geojson_data)
#     # return JsonResponse(geojson_data)
#     return geojson_data

@api_view(['GET', 'POST'])
def get1000WordsFromHTMLTable(request):
#    url = 'https://strommeninc.com/1000-most-common-spanish-words-frequency-vocabulary/'
#    url = 'https://strommeninc.com/1000-most-common-french-words-frequency-vocabulary/'
#    requests.get(url)
   print(requests.get(url)) # RESPONSE === 200
   pages = requests.get(url)
#    parser-lxml = Change html into Python friendly format
   soup = BeautifulSoup(pages.text, 'lxml')
#    print(soup)
#    print(soup.table)
#    print(soup.table.find('tr'))
#    language = soup.table.find('tr').text
   row1 = soup.table.find('tr')
   row1_data = row1.find_all('td')
   print(row1_data)
   language_from_page = row1_data[1].text.lower() #spanish
   language_exists = Language.objects.filter(language=language_from_page).exists()

   if not language_exists:
      print('new language! ', language_from_page)
   else:
      print(language_from_page, ' already exists')
      language = Language.objects.get(language=language_from_page)
      Word.objects.filter(language=language).delete()
    #   Word.objects.all().delete()
      print('you have successfully deleted the last 1000 words...')

#    if language not in Language.objects.all():
#         new_language = Language.objects.create(language=language)
#         print(language, new_language)
#    else:
#         print('language already exists')
#    language = row1[2].text
#    print(row1)
   tabel_rows = soup.table.find_all('tr')
#    print(tabel_rows)
   for tr in tabel_rows[1:]:
      print(tr)
      tabel_data = tr.find_all('td')
      no = tabel_data[0].text
      word = tabel_data[1].text
      translation = tabel_data[2].text
      print(no, word, translation)
      new_word = Word.objects.create(language=language, word=word, translation=translation)
      new_word.save()
    #   print(tr)
    #   table_data = tr.find_all('td')
    #   for td in table_data:
    #     # print(td)
    #     no = table_data[0].text
    #     word = table_data[1].text
    #     translation = table_data[2].text
    #     print(no, word, translation)
    #     for i in td:
    #        print(td[1].text)
        # new_word = Word.objects.create(word=word, translation=translation, language=language)
        # print(new_word)
        # for i in td:
        #    print (i)
        #  print(td)
        #  no = table_data[0].text
        #  word = table_data[1].text
        #  translation = table_data[2].text
        #  print(no, word, translation)
        #  print('no ', table_data[0].text)
        #  print('word ', table_data[1].text)
        #  print('trans ', table_data[2].text)
    #   print(tr.td.text)
    #   for td in tr:
    #     # number = tr.td.text
    #     # word = tr
    #     print(tr.td.text)
   return Response({'message': 'success'})

@api_view(['GET'])
def getLanguages(request):
    languages = Language.objects.all()
    serializer = LanguageSerializer(languages, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getLanguage(request, lang):
   language = Language.objects.get(language=lang)
   serializer = LanguageSerializer(language, many=False)

   return Response(serializer.data)
   

@api_view(['GET'])
def getWords(request):

    words = Word.objects.all()
    serializer = WordSerializer(words, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getWordsByLanguage(request, language):
  print(language)
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
  words = Word.objects.filter(language=language)

  if words.count() != 0:
     serializer = WordSerializer(words, many=True)
     return Response(serializer.data)
  else:
     context = {'detail': 'This language has no words yet.'}
     return Response(context, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def getWordByLanguage(request, language, pk):
#    word = Word.objects.get(pk=pk, language=language)
#    serializer = WordSerializer(word, many=False)
    print(language)
    print(pk)
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
    word = Word.objects.get(pk=pk)
    seriazlizer = WordSerializer(word, many=False)
    oldScore = seriazlizer.data['score']
    data = request.data
    answer = data['value']
    print(word, 'answer ', answer)
    context = None

    if request.method == 'GET':
       context = {'message': 'you are making a get request', 'word': seriazlizer.data, 'oldScore': oldScore}
    #    return Response(context)
    elif request.method == 'PUT':
       if answer == 'correct':
            print('old score ', word.score)
            word.score += 1
            word.save()
            print('new score ', word.score)
            seriazlizer = WordSerializer(word, many=False)
            context = {'message': 'you are making a put request', 'new_score': seriazlizer.data['score'], 'word': seriazlizer.data}
            # return Response(context)
                        
    return Response(context)


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
    print('randomword ', word)

    return Response(serializer.data)

@api_view(['GET'])
def getRandomWordLanguage(request, language):
  print(language)

  if language == 'spanish':
    words = Spanish.objects.all()
    word = random.choice(words)
    serializer = WordSerializer(word, many=False)
    return Response(serializer.data)
  else:
    return Response('Thou shall not pass!')

@api_view(['POST'])
def updateWordScore(request, pk):
    user = request.user
    word = Word.objects.get(pk=pk)
    data = request.data
        # answer = request.POST
    # print(answer)
    print(data)

    answer = data['value']
    print(answer)

    # word = data['word']['word']
    # print(word)

    if answer == 'correct':
        word.score += 1
    print(word.score)
    word.save()
    print(word.score)
    
    # query_dict = literal_eval(data)
    # qd = QueryDict(mutable=True)
    # for item in query_dict:
    #     qd.update(item)

    # print(qd)

    return Response('Word score has been updated')