import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter
from channels.routing import URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from app.middleware import QueryStringMiddleware
from users.authentication import TokenMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings.dev')

django_asgi_app = get_asgi_application()


import notifications.routing  # noqa
application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            TokenMiddleware(
                QueryStringMiddleware(
                    URLRouter(
                        notifications.routing.webwebsocket_urlpatterns,
                    ),
                ),
            ),
        ),
    ),
})
