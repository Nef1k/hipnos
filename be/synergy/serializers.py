from rest_framework import serializers

from synergy.models import SynergyPage
from users.serializers import UserInfoSerializer


class SynergyPageListSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(many=False, read_only=True)

    class Meta:
        model = SynergyPage
        fields = ['id', 'name', 'display_name', 'user']
