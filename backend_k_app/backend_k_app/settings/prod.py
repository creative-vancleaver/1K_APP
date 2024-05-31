import os
from os import path
from pathlib import Path

from .base import BASE_DIR

from decouple import config

DEBUG = False

# DATABASE

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }

    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('PGSQL_NAME'),
        'USER': config('PGSQL_USER'),
        'PASSWORD': config('PGSQL_PWD'),
        'HOST': config('PGSQL_HOST'),
        'PORT': '5432'

    }

    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': 'local_k_app',
    #     'USER': 'jacob',
    #     'HOST': '127.0.0.1',
    #     'PORT': '5432',
    # }
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend_k_app/build')
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

# AWS S3 CONFIG - MEDIA
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
# AWS S3 MEDIA FILES
DEFAULT_FILE_STORAGE = 'backend_k_app.storage_backends.MediaStorage'

# AWS S3 CONFIG - STATIC
AWS_LOCATION = 'static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend_k_app/build/static'),
    os.path.join(BASE_DIR, 'static')
]
STATIC_URL = 'https://%s/%s' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# EMAIL BACKEND
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True