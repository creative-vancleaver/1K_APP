from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from users.models import User

from .models import Language, Word, Translation, Spanish

# Register your models here.


admin.site.register(User, UserAdmin)

admin.site.register(Language)

class WordAdmin(admin.ModelAdmin):
    list_display = ('id', 'word', 'translation')
    ordering = ['id']

admin.site.register(Word, WordAdmin)

admin.site.register(Translation)

admin.site.register(Spanish)