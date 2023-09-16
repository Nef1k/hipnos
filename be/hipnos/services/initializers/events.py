import json
import os.path
from typing import Iterable, Tuple, Dict

from django.utils.timezone import now

from app.helpers import get_constants_from_class
from di.services.base import BaseInitializer
from di.services.base import BaseSubsystem
from di.utils.helpers import dict_from_list
from hipnos.models import EventNotification
from hipnos.models import HEventType
from hipnos.models import HipnosEvent
from notifications.services.notifications import NotificationSubsystem


class EventInitializer(BaseInitializer):
    def __init__(
            self,
            backup_dir: str,
            notification_subsystem: NotificationSubsystem,
            subsystem: BaseSubsystem,
    ):
        self.backup_dir = backup_dir
        self.subsystem = subsystem
        self.notification_subsystem = notification_subsystem

    def initialize(self):
        event_types = get_constants_from_class(HEventType, tuple)
        self.save_event_types(event_types)  # noqa

    def prune(self):
        self._backup_events()
        self.subsystem.prune_models([HipnosEvent, HEventType, EventNotification])

    def update_event_types(self):
        db_types = set(HEventType.objects.values_list('id', flat=True))
        existing_types = {
            event_name: (event_id, channels)
            for event_name, (event_id, channels)
            in get_constants_from_class(HEventType, tuple).items()
            if event_id not in db_types
        }
        self.save_event_types(existing_types)

    def save_event_types(self, event_types: Dict[str, Tuple[int, Iterable]]) -> None:
        HEventType.objects.bulk_create(HEventType(
            id=event_id,
            name=event_name,
        ) for event_name, (event_id, channels) in event_types.items())

        event_notifications = []
        channel_instances = dict_from_list(
            self.notification_subsystem.get_all_channels())
        for event_name, (event_id, channels) in event_types.items():
            for order_key, channel in enumerate(channels):
                event_notifications.append(EventNotification(
                    event_type_id=event_id,
                    channel=channel_instances[channel],
                    order_key=order_key,
                ))
        EventNotification.objects.bulk_create(event_notifications)

    def _backup_events(self):
        event_types = HEventType.objects.all()
        events = HipnosEvent.objects.order_by('timestamp')
        timestamp = now().strftime("%d_%m_%Y_%H_%M")
        file_name = os.path.join(self.backup_dir, f'events_{timestamp}.json')

        with open(file_name, 'w') as f:
            f.write(json.dumps({
                'event_types': {
                    t.name: t.id
                    for t in event_types
                },
                'events': [
                    event.as_dict()
                    for event in events
                ]
            }, indent=2))
