from typing import List

from django.db import transaction

from di.services.base import BaseService
from di.services.base import BaseSubsystem
from di.services.service_container import ServiceContainerService


class ResetService(BaseService):
    def __init__(
            self,
            sc_service: ServiceContainerService,
    ):
        self.services_container_class = sc_service.container_class

    def reset(self):
        subsystems = self._get_subsystems()
        with transaction.atomic():
            for subsystem in subsystems:
                subsystem.prune()
            for subsystem in subsystems:
                subsystem.initialize()

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
        for member_name, member in self.services_container_class.__dict__.items():
            provider = member
            if 'cls' not in dir(provider):
                continue
            cls = provider.cls
            if issubclass(cls, BaseSubsystem):
                subsystems.append(provider)

        return subsystems
