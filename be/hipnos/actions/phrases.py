from dependency_injector.wiring import Provide

from di.containers import Container
from hipnos.actions.base import BaseAction
from hipnos.services.program import ProgramSubsystem


class UnlockPhrase(BaseAction):
    name = 'unlock_phrase'

    def __init__(
            self,
            program_service: ProgramSubsystem = Provide[Container.program_subsystem]
    ):
        self.program_service = program_service

    def execute(self, phrase: str):
        self.program_service.unlock_phrase(phrase)
