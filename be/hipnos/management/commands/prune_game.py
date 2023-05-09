from hipnos.management.commands.base.serviced_hipnos_command import ServicedHipnosCommand


class Command(ServicedHipnosCommand):

    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        self.reset_service.prune()
