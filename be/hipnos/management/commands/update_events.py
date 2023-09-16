from hipnos.management.commands.base.serviced_hipnos_command import ServicedHipnosCommand


class Command(ServicedHipnosCommand):
    def handle(self, *args, **options):
        self.event_subsystem.initializer.update_event_types()
