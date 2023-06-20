from rest_framework import serializers

from synergy.models import DefaultUserPage
from synergy.models import SynergyPage
from synergy.models import SynergyTab
from users.serializers import UserInfoSerializer


class TabDetailsSerializer(serializers.ModelSerializer):
    is_initialized = serializers.SerializerMethodField()

    @staticmethod
    def get_is_initialized(instance: SynergyTab):
        return bool(instance.widget_args)

    class Meta:
        model = SynergyTab
        fields = ['id', 'name', 'display_name', 'widget_args', 'is_initialized']


class SynergyPageListSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(many=False, read_only=True)
    page_data = serializers.JSONField(write_only=True)

    class Meta:
        model = SynergyPage
        fields = ['id', 'name', 'display_name', 'user', 'page_data']


class SynergyPageDetailSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True)
    user = UserInfoSerializer(many=False, read_only=True)
    tabs = TabDetailsSerializer(source='synergytab_set', many=True, read_only=True)

    class Meta:
        model = SynergyPage
        fields = ['id', 'name', 'display_name', 'user', 'page_data', 'tabs']


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
