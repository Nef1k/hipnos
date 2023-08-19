from rest_framework import generics

from synergy import serializers
from synergy.models import SynergyTab
from synergy.models import TabType


class RemoveTabAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = SynergyTab.objects.all()
    serializer_class = serializers.TabTypeDetailsSerializer


class TabTypesListAPI(generics.ListAPIView):
    queryset = TabType.objects.all()
    serializer_class = serializers.TabTypeDetailsSerializer
