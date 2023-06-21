from rest_framework import generics

from synergy.models import SynergyTab


class RemoveTabAPI(generics.DestroyAPIView):
    queryset = SynergyTab.objects.all()
