from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User, UserWord

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        # fields = ('email',)
        fields = '__all__'

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ('email',)

# class UserWordInlineForm(forms.ModelForm):
    
#     class meta:
#         model = UserWord
#         fields = '__all__'