"""
Django settings for BE project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
from datetime import timedelta
from pathlib import Path

from corsheaders.defaults import default_headers

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_DIR = BASE_DIR.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'daphne',

    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',  # required for serving swagger ui's css/js files

    'rest_framework',
    'drf_yasg',
    'corsheaders',
    'django_celery_results',

    'users',
    'hipnos',
    'notifications',
    'synergy',
    'tabs',

    'di',
]

UPLOAD_BASE_PATH = PROJECT_DIR / 'data'

AUTH_USER_MODEL = 'users.User'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://192.168.1.160:3000',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080',
    'http://hipnos.local:3000',
]
CORS_ALLOW_HEADERS = [
    *default_headers,
    'content-disposition'
]

ROOT_URLCONF = 'app.urls'

WSGI_APPLICATION = 'app.wsgi.application'

ASGI_APPLICATION = 'app.asgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
    },
]

STATIC_URL = '/static/'

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': os.environ['DB_HOST'],
        'PORT': os.environ.get('DB_PORT', 5432),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = False

USE_TZ = True

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=365),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'TMP_TOKEN_LIFETIME': timedelta(minutes=60),

    'AUTH_COOKIE_NAME': 'refresh_token',

    "USER_ID_FIELD": "username",
    "USER_ID_CLAIM": "username",
}

SWAGGER_SETTINGS = {
    'USE_SESSION_AUTH': False,
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    }
}

CELERY_RESULT_BACKEND = 'django-db'
CELERY_BROKER_HOST = os.environ['CELERY_BROKER_HOST']
CELERY_BROKER_PORT = os.environ.get('CELERY_BROKER_PORT', '5672')
CELERY_BROKER_USERNAME = os.environ['CELERY_BROKER_USERNAME']
CELERY_BROKER_PASSWORD = os.environ['CELERY_BROKER_PASSWORD']
CELERY_BROKER_VHOST = os.environ.get('CELERY_BROKER_VHOST', '')
CELERY_BROKER = f'amqp://{CELERY_BROKER_USERNAME}' \
                f':{CELERY_BROKER_PASSWORD}' \
                f'@{CELERY_BROKER_HOST}' \
                f':{CELERY_BROKER_PORT}/{CELERY_BROKER_VHOST}'


HIPNOS_GAME_DATA_DIR = PROJECT_DIR / 'game_data'
HIPNOS_STORAGE_DIR = HIPNOS_GAME_DATA_DIR / 'storage'
TMP_DIR = HIPNOS_STORAGE_DIR / 'tmp'
HIPNOS_ACTIONS_ROOT = 'hipnos.actions'
HIPNOS_EVENTS_BACKUP_DIR = HIPNOS_STORAGE_DIR / 'event_backups'

HIPNOS_QR_OUTPUT_DIR = HIPNOS_STORAGE_DIR / 'qr'
HIPNOS_QR_LOGOS_DIR = HIPNOS_QR_OUTPUT_DIR / 'logos'
