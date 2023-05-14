import logging

from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=365)

SECRET_KEY = "dev_signing_key_3o45yhb1028rt54h08upquitgb0925yhtbphwetherthesgd"

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = False

logging.basicConfig(level=logging.DEBUG)

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
        },
    },
}
