from typing import Any
from typing import Iterable
from typing import List
from typing import Union

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from channels_redis.core import RedisChannelLayer
from django.db.models import QuerySet

from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from notifications.models import NotificationChannel
from notifications.services.initializers.notifications import NotificationInitializer


class NotificationSubsystem(BaseSubsystem):
    def __init__(
            self,
            gd_service: GDPathService,
    ):
        self.channel_layer: RedisChannelLayer = get_channel_layer()

        self.initializer = NotificationInitializer(
            gd_service=gd_service,
            subsystem=self,
        )

    def get_all_channels(self) -> List[NotificationChannel]:
        return NotificationChannel.objects.all()

    def get_channel_by_name(self, channel_name: str) -> NotificationChannel:
        return NotificationChannel.objects.get(name=channel_name)

    def get_channels_by_name(
            self,
            channels: List[str]
    ) -> QuerySet[NotificationChannel]:
        return NotificationChannel.objects.filter(name__in=channels)

    def notify(
            self,
            payload: Any,
            channels: Iterable[Union[NotificationChannel, str]]
    ):
        for channel in self._unify_channels_list(channels):
            group_name = channel.group_name
            async_to_sync(self.channel_layer.group_send)(
                channel.group_name,
                {
                    'type': 'notification',
                    'channel': group_name,
                    'payload': payload,
                }
            )

    def broadcast(self, message: str):
        channels = self.get_all_channels()
        self.notify(message, channels)

    @staticmethod
    def _unify_channels_list(
            channels: Iterable[Union[NotificationChannel, str]]
    ) -> List[NotificationChannel]:
        channels_to_fetch = list(filter(
            lambda channel: isinstance(channel, str),
            channels
        ))
        if not channels_to_fetch:
            return channels  # noqa

        channel_instances = {
            n_channel.name: n_channel
            for n_channel in NotificationChannel.objects.filter(
                name__in=channels_to_fetch)
        }

        return list(map(
            lambda channel:
                channel_instances[channel]
                if isinstance(channel, str)
                else channel,
            channels))
