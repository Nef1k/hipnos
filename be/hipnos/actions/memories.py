from dependency_injector.wiring import Provide

from di.containers import Container
from hipnos.actions.base import BaseAction
from hipnos.models import HEventType
from hipnos.services.events import EventSubsystem
from hipnos.services.memory import MemoryService


class UnlockMemory(BaseAction):
    name = 'unlock_memory'

    def __init__(
            self,
            memory_service: MemoryService = Provide[Container.memory_service],
            event_subsystem: EventSubsystem = Provide[Container.event_subsystem],
    ):
        self.memory_service = memory_service
        self.event_subsystem = event_subsystem

    def execute(self, memory: str):
        self.memory_service.unlock_memory(memory)
        self.event_subsystem.emit_event(
            HEventType.MEMORY_UNLOCKED,
            misc_data={
                'memory_name': memory,
            },
        )
