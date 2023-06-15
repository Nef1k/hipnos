from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class SynergyTestAPI(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)

        return Response(status=status.HTTP_200_OK)
