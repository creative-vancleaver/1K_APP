from django.db import models

from django.contrib.auth.models import AbstractUser

from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from base.models import Language, Word

# Create your models here.


class User(AbstractUser):
    # pass 
    username = None
    # django.core.exceptions.FieldError: Unknown field(s) (username) specified for User. Check fields/fieldsets/exclude attributes of class CustomUserAdmin.
    email = models.EmailField(_("email address"), unique=True)
    native_language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True, blank=True, related_name='native_users')
    languages = models.ManyToManyField(Language, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
class UserWord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_word = models.ForeignKey(Word, on_delete=models.CASCADE)
    score = models.IntegerField(null=True, blank=True, default=0)
    count = models.IntegerField(null=True, blank=True, default=2)
    isMastered = models.BooleanField(default=False, null=True, blank=True)

    class Meta:
        unique_together = ('user', 'user_word')

    def __str__(self):
        return self.user_word.word