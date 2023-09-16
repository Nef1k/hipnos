import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from dependency_injector.wiring import Provide
from django.db.models import QuerySet

from di.containers import Container
from hipnos.models import HEventType
from hipnos.services.events import EventSubsystem
from notifications.models import NotificationChannel
from notifications.services.notifications import NotificationSubsystem


class NotificationsConsumer(WebsocketConsumer):

    def __init__(
            self,
            *args,
            notification_subsystem: NotificationSubsystem = Provide[
                Container.notification_subsystem],
            event_subsystem: EventSubsystem = Provide[
                Container.event_subsystem],
            **kwargs):
        super().__init__(*args, **kwargs)
        self.notification_subsystem = notification_subsystem
        self.event_subsystem = event_subsystem

    def connect(self):
        self.scope['channels'] = []

        user = self.scope['user']

        channels_str = self.scope['query_params'].get('channels', '')
        channels = channels_str.split(',')
        if '__all__' in channels:
            if len(channels) != 1:
                self.close(4000)
                return

            channel_instances = self.notification_subsystem.get_all_channels()
        else:
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

        channel_names = list(channel_instances.values_list('name', flat=True))
        self.event_subsystem.emit_event(
            HEventType.SUBSCRIBER_CONNECTED,
            misc_data={
                'user_id': user.id,
                'username': user.username,
                'channels': channel_names,
            }
        )

        self._accept_with_subprotocol()

    def _accept_with_subprotocol(self):
        headers = dict(self.scope['headers'])
        subprotocols = headers.get(b'sec-websocket-protocol') or b''
        subprotocols = subprotocols.split(b', ')
        subprotocol = subprotocols[0].decode('utf-8') if subprotocols else None
        self.accept(subprotocol=subprotocol)

    def disconnect(self, code):
        channels: QuerySet[NotificationChannel] = self.scope['channels']
        channel_names = list(channels.values_list('name', flat=True))
        for channel in self.scope['channels']:
            async_to_sync(self.channel_layer.group_discard)(
                channel.group_name,
                self.channel_name
            )

        user = self.scope['user']
        self.event_subsystem.emit_event(
            HEventType.SUBSCRIBER_DISCONNECTED,
            misc_data={
                'user_id': user.id,
                'username': user.username,
                'channels': channel_names,
            }
        )

    def notification(self, event):
        self.send(text_data=json.dumps({
            'channel': event['channel'],
            'payload': event['payload'],
        }))
