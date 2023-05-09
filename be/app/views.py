from django.db import connection
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthcheckView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute('SELECT version()')
                db_status = 'OK'
                db_version = cursor.fetchone()[0]
        except:
            db_version = 'unknown'
            db_status = 'ERROR'

        db_engine = connection.vendor

        result = {
            'base': 'OK',
            'db': {
                'status': db_status,
                'engine': db_engine,
                'version': db_version,
            }
        }

        return Response(result)


swagger_schema_view = get_schema_view(
    openapi.Info(
        title='Sklad API',
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
