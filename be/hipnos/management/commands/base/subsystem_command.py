from di.services.base import BaseSubsystem
from hipnos.management.commands.base.serviced_hipnos_command import ServicedHipnosCommand


class SubsystemCommandBase(ServicedHipnosCommand):
    def add_arguments(self, parser):
        parser.add_argument('subsystem_name', type=str)

    def handle(self, *args, **options):
        subsystem_name = options['subsystem_name']
        subsystem = self.sc_service.get_subsystem_instance(subsystem_name)
        self.execute_subsystem(subsystem)

    def execute_subsystem(self, subsystem: BaseSubsystem):
        raise NotImplementedError()
