from dependency_injector.wiring import Provide
from dependency_injector.wiring import inject
from django.core.exceptions import BadRequest
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status
from rest_framework.response import Response

from di.containers import Container
from synergy.models import SynergyPage
from synergy.serializers import DefaultPageSerializer
from synergy.serializers import SynergyPageDetailSerializer
from synergy.serializers import SynergyPageListSerializer
from synergy.services.pages import DefaultPageNotSet
from synergy.services.pages import PageService


class PageListCreateAPI(generics.ListCreateAPIView):
    queryset = SynergyPage.objects.all()
    serializer_class = SynergyPageListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserDefaultPage(mixins.RetrieveModelMixin, generics.GenericAPIView):
    serializer_class = DefaultPageSerializer

    @inject
    def __init__(
            self,
            page_service: PageService = Provide[Container.page_service]
    ):
        super().__init__()
        self.page_service = page_service

    def get_object(self):
        return self.page_service.get_user_default_page(self.request.user)

    def get(self, request, *args, **kwargs):
        try:
            response = self.retrieve(request, *args, **kwargs)
        except DefaultPageNotSet:
            response = Response(None, status=status.HTTP_404_NOT_FOUND)
        return response

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid(raise_exception=False):
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        page = serializer.validated_data['page']

        default_page = self.page_service.set_user_default_page(request.user, page)

        return Response(self.serializer_class(instance=default_page).data)
