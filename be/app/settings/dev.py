import logging

from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=365)

SECRET_KEY = "dev_signing_key_3o45yhb1028rt54h08upquitgb0925yhtbphwetherthesgd"

logging.basicConfig(level=logging.INFO)

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
        },
    },
}
