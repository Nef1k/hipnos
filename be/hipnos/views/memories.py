from rest_framework import generics

from hipnos.models import Memory
from hipnos.serializers import PonosMemoryListSerializer


class ListMemoryView(generics.ListAPIView):
    permission_classes = []
    queryset = Memory.objects.order_by('order_key')
    serializer_class = PonosMemoryListSerializer
