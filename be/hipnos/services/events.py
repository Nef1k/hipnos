import inspect
from typing import Union

from django.utils.timezone import now

from di.services.base import BaseSubsystem
from hipnos.models import EventNotification
from hipnos.models import HEventType
from hipnos.models import HipnosEvent
from hipnos.services.initializers.events import EventInitializer
from notifications.services.notifications import NotificationSubsystem


class EventSubsystem(BaseSubsystem):
    def __init__(
            self,
            backup_dir: str,
            notification_subsystem: NotificationSubsystem
    ):
        self.notification_subsystem = notification_subsystem
        self.initializer = EventInitializer(
            backup_dir,
            notification_subsystem,
            self,
        )

    def emit_event(
            self,
            event_type: Union[HEventType, int, tuple],
            *,
            source: str = None,
            previous_state: dict = None,
            current_state: dict = None,
            misc_data: dict = None,
    ):
        instance = HipnosEvent(
            source=source or self._get_source(inspect.currentframe()),
            previous_state=previous_state,
            current_state=current_state,
            misc_data=misc_data,
        )
        if isinstance(event_type, int):
            instance.event_type_id = event_type
        elif isinstance(event_type, tuple):
            event_id, _ = event_type
            instance.event_type_id = event_id
        else:
            instance.event_type = event_type

        self.emit_event_instance(instance)

    def emit_event_instance(self, instance: HipnosEvent):
        instance.timestamp = now()  # force timestamp to now
        instance.save()

        payload = instance.as_dict()
        channels = EventNotification.objects\
            .filter(event_type=instance.event_type)\
            .values_list('channel__name', flat=True)
        self.notification_subsystem.notify(payload, channels)

    def _get_source(self, frame) -> str:
        frame_locals = frame.f_back.f_locals

        if 'self' in frame_locals:
            return frame_locals['self'].__class__.__name__
        else:
            return frame.f_code.co_name
