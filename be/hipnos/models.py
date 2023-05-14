from typing import Any

from django.db import models

from di.utils.entitled_model import NamedModelMixin
from notifications.models import NotificationChannel


class MemoryType(models.Model, NamedModelMixin):
    TEXT = 0
    AUDIO = 1
    VIDEO = 2

    name = models.CharField(max_length=255, null=False, default='')

    class Meta:
        db_table = 'hipnos_memory_type'


class Memory(models.Model, NamedModelMixin):
    name = models.CharField(max_length=255, null=False, unique=True)
    title = models.CharField(max_length=255, null=False, default='')
    unlocked_at = models.DateTimeField(null=True)

    markdown_text = models.TextField(null=False, default='')
    html_text = models.TextField(null=False, default='')

    order_key = models.IntegerField(null=False)

    memory_type = models.ForeignKey(MemoryType, on_delete=models.DO_NOTHING)


class HProgramState(models.Model, NamedModelMixin):
    LOCKED = 0
    IN_PROGRESS = 1
    FINISHED = 2

    name = models.CharField(max_length=255, null=False, unique=True)

    class Meta:
        db_table = 'hipnos_program_state'


class HipnosPhrase(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)

    phrase = models.CharField(max_length=255, null=False, unique=True)
    unlocked_at = models.DateTimeField(null=True)

    synonym = models.ForeignKey('HipnosPhrase', null=True, on_delete=models.CASCADE)
    program = models.ForeignKey('HipnosProgram', null=True, on_delete=models.DO_NOTHING)

    order_key = models.IntegerField(null=True)

    @property
    def is_locked(self):
        return self.unlocked_at is None

    def __str__(self):
        return f'{self.name} ("{self.phrase}")'

    class Meta:
        db_table = 'hipnos_phrase'


class HipnosProgram(models.Model, NamedModelMixin):
    name = models.CharField(max_length=255, null=False)
    title = models.CharField(max_length=255, null=True, default='')

    code_part = models.CharField(max_length=2, null=False)

    state = models.ForeignKey(HProgramState, on_delete=models.DO_NOTHING)
    target_phrase = models.ForeignKey(HipnosPhrase, null=True, on_delete=models.SET_NULL)

    order_key = models.IntegerField(null=False)

    @property
    def unlocked_at(self):
        return self.target_phrase.unlocked_at

    class Meta:
        db_table = 'hipnos_program'


class HipnosAction(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)

    action_class_name = models.CharField(max_length=255, null=False)
    module_name = models.CharField(max_length=255, null=False)

    class Meta:
        db_table = 'hipnos_actions'

    def __str__(self):
        return f'{self.name}'


class PhraseAction(models.Model):
    order_key = models.IntegerField(null=True)

    phrase = models.ForeignKey(HipnosPhrase, on_delete=models.CASCADE)
    action = models.ForeignKey(HipnosAction, on_delete=models.CASCADE)

    args = models.JSONField(null=False)
    kwargs = models.JSONField(null=False)

    class Meta:
        db_table = 'hipnos_phrase_action'


class HEventType(models.Model):
    PHRASE_ACTION_TRIGGERED = 0, (NotificationChannel.ACTIONS,)
    MEMORY_UNLOCKED = 1, (NotificationChannel.MEMORIES,)
    PHRASE_UNLOCKED = 2, (NotificationChannel.PHRASES,)
    PROGRAM_NEXT = 3, (NotificationChannel.PROGRAMS,)
    PROGRAM_SET_STATE = 4, (NotificationChannel.PROGRAMS,)
    SUBSCRIBER_CONNECTED = 5, (NotificationChannel.NOTIFICATIONS,)
    SUBSCRIBER_DISCONNECTED = 6, (NotificationChannel.NOTIFICATIONS,)
    TEST_EVENT = 1000, (NotificationChannel.MEMORIES,
                        NotificationChannel.ACTIONS,
                        NotificationChannel.PHRASES)

    name = models.CharField(max_length=255, null=False, unique=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        db_table = 'hipnos_event_type'


class EventNotification(models.Model):
    event_type = models.ForeignKey(HEventType, on_delete=models.CASCADE)
    channel = models.ForeignKey('notifications.NotificationChannel',
                                on_delete=models.CASCADE)

    order_key = models.IntegerField(null=False)

    def __str__(self):
        return f'event: {self.event_type.name}; channel: {self.channel.name}'

    class Meta:
        db_table = 'hipnos_event_notification'


class HipnosEvent(models.Model):
    timestamp = models.DateTimeField(null=False, auto_now=True)
    event_type = models.ForeignKey(HEventType, on_delete=models.DO_NOTHING)
    source = models.CharField(max_length=255, null=False, default='unknown')

    previous_state = models.JSONField(null=True)
    current_state = models.JSONField(null=True)

    misc_data = models.JSONField(null=True)

    def as_dict(self):
        return {
            'id': self.id,
            'timestamp': str(self.timestamp),
            'type': self.event_type_id,
            'source': self.source,
            'prev_state': self.previous_state,
            'current_state': self.current_state,
            'misc_data': self.misc_data,
        }

    def __str__(self):
        return f'{self.event_type.name}'

    class Meta:
        db_table = 'hipnos_event'
