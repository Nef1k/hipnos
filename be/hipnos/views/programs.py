from dependency_injector.wiring import Provide
from dependency_injector.wiring import inject
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from di.containers import Container
from hipnos.models import HipnosProgram
from hipnos.serializers import ProgramListSerializer
from hipnos.serializers import SubmitPhraseSerializer
from hipnos.services.phrases import PhraseSubsystem


class ProgramListView(generics.ListAPIView):
    permission_classes = []
    queryset = HipnosProgram.objects.order_by('order_key')
    serializer_class = ProgramListSerializer


class SubmitPhraseView(APIView):
    permission_classes = []
    serializer_class = SubmitPhraseSerializer

    @inject
    def __init__(
            self,
            phrase_subsystem: PhraseSubsystem = Provide[Container.phrase_subsystem],
            **kwargs
    ):
        super().__init__(**kwargs)
        self.phrase_subsystem = phrase_subsystem

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        phrase = serializer.validated_data['phrase']
        self.phrase_subsystem.submit_phrase(phrase)

        return Response(status=status.HTTP_200_OK)
