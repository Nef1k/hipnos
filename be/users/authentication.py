from typing import Dict

from channels.db import database_sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

from users.models import User


class TmpJWTAuthentication(JWTAuthentication):

    def get_header(self, request):
        return request.GET.get('access')

    def get_raw_token(self, header):
        return header


class TokenAuth(JWTAuthentication):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @database_sync_to_async
    def get_user(self, validated_token):
        return super(TokenAuth, self).get_user(validated_token)

    async def authenticate(self, request):
        user_coroutine, token_stuff = super().authenticate(request)
        return await user_coroutine

    def get_header(self, scope):
        return scope

    def get_raw_token(self, scope):
        headers = scope.get('headers')
        if not headers:
            return b''
        headers = dict(headers)

        token = headers.get(b'authorization') or self._get_from_protocol_header(headers)
        if not token:
            return b''

        return token

    def _get_from_protocol_header(self, headers: Dict[bytes, bytes]) -> bytes:
        # Fuck chrome for not letting set headers in websockets
        if b'sec-websocket-protocol' not in headers:
            return b''

        protocols = headers[b'sec-websocket-protocol']
        protocols = protocols.split(b', ')

        for protocol in protocols:
            if not protocol.startswith(b'authorization_'):
                continue

            return protocol[len(b'authorization_'):]

        return b''


class TokenMiddleware:
    def __init__(self, app):
        self.app = app
        self.authenticator = TokenAuth()

    async def __call__(self, scope, receive, send):
        try:
            scope['user'] = await self.authenticator.authenticate(scope)
        except InvalidToken:
            await send({"type": "websocket.close", "code": 403})
            return None

        return await self.app(scope, receive, send)
