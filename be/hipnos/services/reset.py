from typing import List

from django.db import transaction

from di.services.base import BaseService
from di.services.base import BaseSubsystem
from di.services.service_container import ServiceContainerService
from hipnos.services.memory import MemoryService


class ResetService(BaseService):
    def __init__(
            self,
            memory_service: MemoryService,
            sc_service: ServiceContainerService,
    ):
        self.memory_service = memory_service
        self.services_container_class = sc_service.container_class

    def reset(self):
        subsystems = self._get_subsystems()
        with transaction.atomic():
            for subsystem in subsystems:
                subsystem.reset()

    def prune(self):
        subsystems = self._get_subsystems()
        with transaction.atomic():
            for subsystem in subsystems:
                subsystem.prune()

    def initialize(self):
        subsystems = self._get_subsystems()
        with transaction.atomic():
            for subsystem in subsystems:
                subsystem.initialize()

    def _get_subsystems(self) -> List[BaseSubsystem]:
        subsystem_providers = self._get_subsystem_providers()
        return [ss_provider() for ss_provider in subsystem_providers]

    def _get_subsystem_providers(self) -> list:
        subsystems = []
        for item in dir(self.services_container_class):
            provider = getattr(self.services_container_class, item)
            if 'cls' not in dir(provider):
                continue
            cls = provider.cls
            if issubclass(cls, BaseSubsystem):
                subsystems.append(provider)

        return subsystems
