from typing import List

from django.db import transaction

from di.services.base import BaseService
from di.services.base import BaseSubsystem
from hipnos.services.memory import MemoryService


class ResetService(BaseService):
    def __init__(
            self,
            memory_service: MemoryService,
            services_container_name
    ):
        self.memory_service = memory_service

        container_module = __import__(services_container_name).containers
        self.services_container_class = container_module.Container

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
