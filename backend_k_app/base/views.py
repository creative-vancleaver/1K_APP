import os
import random
import json

from django.conf import settings
# import pyvips
import geopandas as gpd
import matplotlib
matplotlib.use('Agg')
from PIL import Image
import matplotlib.pyplot as plt

from ast import literal_eval

from django.shortcuts import render
from django.http import QueryDict, JsonResponse, HttpResponse

# DJANGO REST FRAMEWORK
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import WordSerializer, LanguageSerializer

from .models import Language, Translation, Word, Spanish

from .words import words

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