from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from users.models import User


class UserInfoSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'permissions']

    def get_permissions(self, user):
        return list(user.get_user_permissions())


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        cookie_name = settings.SIMPLE_JWT.get('AUTH_COOKIE_NAME', 'refresh_token')

        attrs['refresh'] = self.context['request'].COOKIES.get(cookie_name)
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken(f'No valid token found in cookie "{cookie_name}"')
