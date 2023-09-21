from django.contrib import admin
from django.db import models

from django.contrib.auth.admin import UserAdmin

from users.forms import CustomUserCreationForm, CustomUserChangeForm
from users.models import User, UserWord
from .models import Language, Word, Country

# Register your models here.

class UserWordInline(admin.TabularInline):
    model = UserWord
    extra = 0

class CustomUserAdmin(UserAdmin):

    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('id', 'email', 'is_staff')
    # list_filter = ('id', 'email', 'is_staff')
    inlines = [UserWordInline]
    fieldsets = (
        (None, {'fields': ('first_name', 'email', 'password', 'native_language', 'languages')}),
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

    def display_user_words(self, obj):
        user_words = obj.userword_set.all()
        return ', '.join(str(user_word) for user_word in user_words)
    
    display_user_words.short_description = 'User Words'
    
    def change_view(self, request, object_id, form_url='', extra_context=None):
        response = super().change_view(request, object_id, form_url, extra_context)

        user = self.get_object(request, object_id)

        user_words = user.userword_set.all()
        user_words_display = ', '.join(str(user_word) for user_word in user_words)

        if extra_context is None:
            extra_context = {}
        extra_context['user_words_display'] = user_words_display

        return response

admin.site.register(User, CustomUserAdmin)

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