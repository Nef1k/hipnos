from .base import *


ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]
if 'WEB_HOST' in os.environ:
    ALLOWED_HOSTS.append(os.environ['WEB_HOST'])


REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = (
    'rest_framework.renderers.JSONRenderer',
)
