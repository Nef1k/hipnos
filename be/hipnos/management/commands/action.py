from hipnos.management.commands.base.serviced_hipnos_command import ServicedHipnosCommand


class Command(ServicedHipnosCommand):
    def add_arguments(self, parser):
        parser.add_argument('action_name', type=str)
        parser.add_argument('args', type=str, nargs='*')

    def handle(self, *args, **options):
        action_name = options['action_name']
        self.action_subsystem.execute_action(action_name, *args)
