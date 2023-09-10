from rest_framework import generics

from hipnos.models import HipnosEvent
from hipnos.serializers import HipnosEventDetailSerializer


class EventsListView(generics.ListAPIView):
    queryset = HipnosEvent.objects.all()
    serializer_class = HipnosEventDetailSerializer
