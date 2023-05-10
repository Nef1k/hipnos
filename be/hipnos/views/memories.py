from rest_framework import generics

from hipnos.models import Memory
from hipnos.serializers import MemoryDetailsSerializer
from hipnos.serializers import MemoryListSerializer


class ListMemoryView(generics.ListAPIView):
    permission_classes = []
    queryset = Memory.objects.order_by('order_key')
    serializer_class = MemoryListSerializer


class RetrieveMemoryView(generics.RetrieveAPIView):
    permission_classes = []
    queryset = Memory.objects.all()
    serializer_class = MemoryDetailsSerializer
