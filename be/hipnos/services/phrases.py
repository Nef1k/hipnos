from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from hipnos.models import HipnosPhrase
from hipnos.services.actions import ActionSubsystem
from hipnos.services.initializers.phrases import PhraseInitializer


class PhraseSubsystem(BaseSubsystem):
    def __init__(
            self,
            gd_service: GDPathService,
            action_subsystem: ActionSubsystem,
    ):
        self.gd_service = gd_service
        self.action_subsystem = action_subsystem
        self.initializer = PhraseInitializer(
            gd_service=gd_service,
            action_subsystem=action_subsystem,
            subsystem=self,
        )

    def get_phrases(self):
        return HipnosPhrase.objects.all()
