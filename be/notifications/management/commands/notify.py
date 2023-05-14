from dependency_injector.wiring import Provide
from django.core.management import BaseCommand

from di.containers import Container
from notifications.services.notifications import NotificationSubsystem


class Command(BaseCommand):
    def __init__(
            self,
            notification_subsystem: NotificationSubsystem
            = Provide[Container.notification_subsystem],
    ):
        super().__init__()
        self.notification_subsystem = notification_subsystem

    def add_arguments(self, parser):
        parser.add_argument('channel', type=str)
        parser.add_argument('message', type=str, nargs='?',
                            default='test_notification')

    def handle(self, *args, **options):
        channel_name = options['channel']
        message = options['message']

        channel = self.notification_subsystem.get_channel_by_name(
            channel_name)
        self.notification_subsystem.notify(message, [channel])
