from rest_framework import serializers

from synergy.models import DefaultUserPage
from synergy.models import SynergyPage
from synergy.models import SynergyTab
from synergy.models import TabType
from users.serializers import UserInfoSerializer


class TabTypeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabType
        fields = '__all__'


class TabDetailsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False, required=False)
    tab_type = TabTypeDetailsSerializer(many=False, read_only=True)
    tab_type_id = serializers.PrimaryKeyRelatedField(
        required=False,
        write_only=True,
        allow_null=False,
        source='tab_type',
        queryset=TabType.objects.all(),
    )

    class Meta:
        model = SynergyTab
        fields = ['id', 'display_name', 'widget_state', 'tab_type',
                  'tab_type_id']


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
