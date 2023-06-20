from rest_framework import serializers

from synergy.models import DefaultUserPage
from synergy.models import SynergyPage
from users.serializers import UserInfoSerializer


class SynergyPageListSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(many=False, read_only=True)

    class Meta:
        model = SynergyPage
        fields = ['id', 'name', 'display_name', 'user']


class SynergyPageDetailSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(many=False, read_only=True)

    class Meta:
        model = SynergyPage
        fields = ['id', 'name', 'display_name', 'user']


class DefaultPageSerializer(serializers.ModelSerializer):
    page = SynergyPageDetailSerializer(many=False, read_only=True)
    page_id = serializers.PrimaryKeyRelatedField(
        required=True,
        write_only=True,
        allow_null=True,
        source='page',
        queryset=SynergyPage.objects.all(),
    )

    class Meta:
        model = DefaultUserPage
        fields = ['page', 'page_id']
