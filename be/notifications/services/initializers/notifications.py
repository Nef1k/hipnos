from app.helpers import get_constants_from_class
from di.services.base import BaseInitializer
from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from notifications.models import NotificationChannel


class NotificationInitializer(BaseInitializer):
    def __init__(
            self,
            gd_service: GDPathService,
            subsystem: BaseSubsystem,
    ):
        self.gd_service = gd_service
        self.subsystem = subsystem

    def initialize(self):
        channel_names = get_constants_from_class(NotificationChannel, str)

        NotificationChannel.objects.bulk_create(NotificationChannel(
            name=channel_name
        ) for channel_name in channel_names.values())

    def prune(self):
        self.subsystem.prune_models([NotificationChannel])
