from dependency_injector.wiring import Provide

from di.containers import Container
from hipnos.actions.base import BaseAction
from hipnos.services.memory import MemoryService


class UnlockMemory(BaseAction):
    name = 'unlock_memory'

    def __init__(
            self,
            memory_service: MemoryService = Provide[Container.memory_service]
    ):
        self.memory_service = memory_service

    def execute(self, memory: str):
        self.memory_service.unlock_memory(memory)
