from rest_framework import generics

from synergy.models import SynergyPage
from synergy.serializers import SynergyPageListSerializer


class PageListCreateAPI(generics.ListCreateAPIView):
    queryset = SynergyPage.objects.all()
    serializer_class = SynergyPageListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
