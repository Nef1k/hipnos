from dependency_injector.wiring import Provide

from di.containers import Container
from hipnos.actions.base import BaseAction
from hipnos.models import HEventType
from hipnos.services.events import EventSubsystem
from hipnos.services.program import ProgramSubsystem


class UnlockPhrase(BaseAction):
    name = 'unlock_phrase'

    def __init__(
            self,
            program_service: ProgramSubsystem = Provide[Container.program_subsystem],
            event_subsystem: EventSubsystem = Provide[Container.event_subsystem],
    ):
        self.program_service = program_service
        self.event_subsystem = event_subsystem

    def execute(self, phrase: str):
        self.program_service.unlock_phrase(phrase)
        self.event_subsystem.emit_event(
            HEventType.PHRASE_UNLOCKED,
            misc_data={
                'phrase_name': phrase,
            })
