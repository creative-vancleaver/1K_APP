import os
from os import path
from pathlib import Path

from.base import BASE_DIR

DEBUG = True

# DATABASE
DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }

    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': config('PGSQL_NAME'),
    #     'USER': config('PGSQL_USER'),
    #     'PASSWORD': config('PGSQL_PWD'),
    #     'HOST': config('PGSQL_HOST'),
    #     'PORT': '5432'

    # }

    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'local_k_app',
        'USER': 'jacob',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, '..', 'frontend_k_app/build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# USE LOCAL STATIC
FRONTEND_STATIC_DIR = '/Users/jacob/kAPP_Transfer/k_app/backend_k_app/frontend_k_app/build/static'
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    # BASE_DIR / 'frontend_k_app/build/static'
    FRONTEND_STATIC_DIR
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# USE LOCAL MEDIA
# LOCAL_MEDIA = '/Users/jacob/kAPP_Transfer/backend_k_app/media'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# MEDIA_ROOT = LOCAL_MEDIA
# MEDIA_ROOT = '/Users/jacob/kAPP_Transfer/k_app/backend_k_app/media'
MEDIA_URL = '/media/'
# MEDIA_URL = LOCAL_MEDIA
print('meida root + url ', MEDIA_ROOT, MEDIA_URL)

# LOCAL EMAIL BACKEND
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'