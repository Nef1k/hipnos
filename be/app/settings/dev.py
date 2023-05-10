from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=1)

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = False
