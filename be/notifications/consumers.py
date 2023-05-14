import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from dependency_injector.wiring import Provide

from di.containers import Container
from notifications.services.notifications import NotificationSubsystem


class NotificationsConsumer(WebsocketConsumer):

    def __init__(
            self,
            *args,
            notification_subsystem: NotificationSubsystem
            = Provide[Container.notification_subsystem],
            **kwargs):
        super().__init__(*args, **kwargs)
        self.notification_subsystem = notification_subsystem

    def connect(self):
        self.scope['channels'] = []

        user = self.scope['user']

        channels_str = self.scope['query_params'].get('channels')
        channels = channels_str.split(',')
        channel_instances = self.notification_subsystem.get_channels_by_name(channels)
        if len(channel_instances) != len(channels) or not channel_instances:
            self.close(4004)
            return

        self.scope['channels'] = channel_instances

        for channel_instance in channel_instances:
            async_to_sync(self.channel_layer.group_add)(
                channel_instance.group_name,
                self.channel_name
            )

        # TODO: emmit event about joining user to channels

        self.accept()

    def disconnect(self, code):
        for channel in self.scope['channels']:
            async_to_sync(self.channel_layer.group_discard)(
                channel.group_name,
                self.channel_name
            )

    def notification(self, event):
        self.send(text_data=json.dumps({
            'channel': event['channel'],
            'payload': event['payload'],
        }))
