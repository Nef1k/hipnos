from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from users.models import User
from users.serializers import CookieTokenRefreshSerializer
from users.serializers import UserInfoSerializer


class ProfileView(APIView):
    serializer_class = UserInfoSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = self.serializer_class(instance=user)
        return Response(serializer.data)


class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        cookie_name = settings.SIMPLE_JWT.get('AUTH_COOKIE_NAME', 'refresh_token')
        cookie_max_age = settings.SIMPLE_JWT.get('AUTH_COOKIE_MAX_AGE', 3600 * 24 * 14)
        refresh_token = response.data.get('refresh')

        if refresh_token:
            response.set_cookie(cookie_name, refresh_token, max_age=cookie_max_age, httponly=True, secure=True)
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        cookie_name = settings.SIMPLE_JWT.get('AUTH_COOKIE_NAME', 'refresh_token')
        cookie_max_age = settings.SIMPLE_JWT.get('AUTH_COOKIE_MAX_AGE', 3600 * 24 * 14)
        refresh_token = response.data.get('refresh')

        if refresh_token:
            response.set_cookie(cookie_name, refresh_token, max_age=cookie_max_age, httponly=True, secure=True)
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)


class TmpTokenView(APIView):
    def post(self, request):
        refresh_token = RefreshToken.for_user(request.user)

        access_token: AccessToken = refresh_token.access_token
        access_token.set_exp(lifetime=settings.SIMPLE_JWT['TMP_TOKEN_LIFETIME'])

        return Response({
            'access': str(access_token)
        })


class CookieLogoutView(APIView):
    def post(self, request):
        cookie_name = settings.SIMPLE_JWT.get('AUTH_COOKIE_NAME', 'refresh_token')

        response = Response(status=204)
        response.delete_cookie(cookie_name)
        return response


class ListUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer
