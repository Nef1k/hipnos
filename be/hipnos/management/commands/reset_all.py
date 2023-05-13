from hipnos.management.commands.base.serviced_hipnos_command import ServicedHipnosCommand


class Command(ServicedHipnosCommand):

    def handle(self, *args, **options):
        self.reset_service.reset()
