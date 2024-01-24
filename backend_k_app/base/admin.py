from typing import Any
from django.contrib import admin
from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django import forms
from django.db.models.query import QuerySet
from django.forms import BaseInlineFormSet, Media

from django.contrib.auth.admin import UserAdmin
from django.http.request import HttpRequest

from users.forms import CustomUserCreationForm, CustomUserChangeForm
from users.models import User, UserWord
from .models import Language, Word, Country, Alphabet, Character

# Register your models here.
# class UserWordInlineFormSet(BaseInlineFormSet):
#     # pass
#     select_all = forms.BooleanField(
#         required=False,
#         label='Select All',
#         widget=forms.CheckboxInput(attrs={'class': 'select-all-checkbox'}),
#     )

#     def clean(self):
#         cleaned_data = super().clean()
#         select_all = cleaned_data.get('select_all')
#         if select_all:
#             for form in self.forms:
#                 form.cleaned_data['DELETE'] = True

class UserWordInline(admin.TabularInline):
    model = UserWord
    extra = 0
    # fields = ['id', 'user_word', 'score', 'count', 'isMastered']
    # form = UserWordInlineForm
    # formset = UserWordInlineFormSet
    # extra = 0
    # extra = 5
    # show_change_link = True
    max_num = 100
    
    # def get_queryset(self, request):
    #     return super().get_queryset(request).select_related('user_word').all()
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # pagination logic here???
        # print(qs)
        return qs

class CustomUserAdmin(UserAdmin):

    # add_form = CustomUserCreationForm
    # form = CustomUserChangeForm
    model = User
    list_display = ('id', 'email', 'user_word_count', 'is_staff')
    # list_filter = ('id', 'email', 'is_staff') ---  
    # inlines = [UserWordInline]
    fieldsets = (
        (None, {'fields': ('first_name', 'email', 'confirm_rules', 'password', 'native_language', 'languages')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'first_name', 'email', 'native_language', 'languages', 'password1', 'password2', 'is_staff', 'is_active', 'groups', 'user_permissions'
            )}
        ),
    )
    search_fields = ('email',)
    # exclude=['username']
    # django.core.exceptions.FieldError: Unknown field(s) (username) specified for User. Check fields/fieldsets/exclude attributes of class CustomUserAdmin.
    ordering = ['id']
    # actions = ['bulk_delete_user_words']

    # class Media:
    #     js = ('admin_custom.js',)

    def user_word_count(self, obj):
        return obj.userword_set.all().count()

    user_word_count.short_description = 'UserWord Count'

    # # def display_user_words(self, obj):
    # #     user_words = obj.userword_set.all()
    # #     return ', '.join(str(user_word) for user_word in user_words)
    
    # # display_user_words.short_description = 'User Words'
    
    # def change_view(self, request, object_id, form_url='', extra_context=None):

    #     user = self.get_object(request, object_id)

    #     user_words = user.userword_set.all().order_by('id')
    #     # user_words_display = ', '.join(str(user_word) for user_word in user_words)
        
    #     # PAGINATION
    #     paginator = Paginator(user_words, 10)
    #     page = request.GET.get('page')
        
    #     try:
    #         user_words_page = paginator.page(page)
    #     except PageNotAnInteger:
    #         # IF PAGE IS NOT AN INTEGER, DELIVER FIRST PAGE
    #         user_words_page = paginator.page(1)
    #     except EmptyPage:
    #         # IF PAGE IS OUT OF RANGE, DELIVER LAST PAGE OF RESULTS
    #         user_words_page = paginator.page(paginator.num_pages)

    #     if extra_context is None:
    #         extra_context = {}
        
    #     # extra_context['user_words_display'] = user_words_display
    #     extra_context['user_words_page'] = user_words_page

    #     response = super().change_view(request, object_id, form_url, {})

    #     return response
    
    # UPDATE 2024   
    # def change_view(self, request, object_id, form_url='', extra_context=None):
    #     user = self.get_object(request, object_id)
        
    #     user_words = user.userword_set.all().order_by('id')
        
    #     # PAGINATION
    #     # paginator = Paginator(user_words, 10)
    #     # page_number = request.GET.get('page')
    #     # user_words_page = paginator.get_page(page_number)
        
    #     if extra_context is None:
    #         extra_context = {}
            
    #     # extra_context['user_words_page'] = user_words_page
        
    #     return super().change_view(request, object_id, form_url, extra_context=extra_context)

    # def bulk_delete_user_words(self, request, queryset):
    #     # queryset.delete()
    #     for user_word in queryset:
    #         user_word.delete()

    # bulk_delete_user_words.short_description = 'Delete all UserWords'

admin.site.register(User, CustomUserAdmin)


class UserWordAdmin(admin.ModelAdmin):
    model = UserWord
    list_display = ('id', 'user', 'user_word', 'translation', 'count', 'isMastered')
    list_filter = ('isMastered',)
    search_fields = ('id', 'user__email', 'user_word__word')
    actions = ['bulk_delete_user_words']
    
    def user(self, obj):
        return obj.user.email
    
    user.short_description = 'User'
    
    def translation(self, obj):
        return obj.user_word.translation
    
    def bulk_delete_user_words(self, request, queryset):
        queryset.delete()
        
    bulk_delete_user_words.short_description = 'Delete selected UserWords'
    
    
admin.site.register(UserWord, UserWordAdmin)

class WordInline(admin.StackedInline):
    model = Word
    extra = 0

class LanguageAdmin(admin.ModelAdmin):
    # inlines = [WordInline]

    list_display = ('id', 'language', 'word_count')

    def word_count(self, obj):
        words = obj.word_set.count()
        return words

admin.site.register(Language, LanguageAdmin)

class WordAdmin(admin.ModelAdmin):
    list_display = ('id', 'language', 'word', 'translation')
    search_fields = ('id',)
    ordering = ['id', 'language']

admin.site.register(Word, WordAdmin)

class LanguageInline(admin.StackedInline):
    model = Language.countries.through
    extra = 0

class CountryAdmin(admin.ModelAdmin):
    inlines = [LanguageInline]

    list_display = ('id', 'name', 'display_languages')
    # ordering = ['id', 'display_languages']

    def display_languages(self, obj):
        languages = ", ".join([language.language for language in obj.language_set.all()])
        return languages

    display_languages.short_description = 'Languages'

    # def get_queryset(self, request):
    #     # OVERRIDE GET_QUERYSET METHOD TO ORDER COUNTRIES BY 'FIRST' ASSOCIATED LANGUAGE
    #     return Country.objects.annotate(
    #         first_language_name=models.Min('language__language')
    #     ).order_by('first_language_name')

admin.site.register(Country, CountryAdmin)

# admin.site.register(Translation)

# admin.site.register(Spanish)

class AlphabetAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'name', 'alphabet_type', 'language', 'character_count')
    search_fields = ('id', 'name', 'alphabet_type', 'language')
    ordering = ('id', 'name', 'alphabet_type', 'language')
    
    def character_count(self, obj):
        return Character.objects.filter(alphabet=obj).count()
    character_count.short_description = 'Number of Characters'

admin.site.register(Alphabet, AlphabetAdmin)

class CharacterAdmin(admin.ModelAdmin):
    
    list_display = ('id', 'character', 'get_language', 'alphabet', 'pronunciation')
    search_fields = ('id', 'character', 'alphabet', 'get_language', 'pronunciation')
    ordering = ('id', 'alphabet', 'pronunciation')
    
    def get_language(self, obj):
        return obj.alphabet.language.language
    get_language.short_description = 'Language'

admin.site.register(Character, CharacterAdmin)