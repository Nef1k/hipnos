from channels.middleware import BaseMiddleware

from di.utils.helpers import split_query_string


class QueryStringMiddleware(BaseMiddleware):

    async def __call__(self, scope, receive, send):
        scope['query_params'] = split_query_string(
            scope.get('query_string', b'').decode('utf-8'))

        return await self.inner(scope, receive, send)
