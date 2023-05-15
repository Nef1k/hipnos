from django.db import models


class NotificationChannel(models.Model):
    MEMORIES = 'memories'
    ACTIONS = 'actions'
    PROGRAMS = 'programs'
    PHRASES = 'phrases'
    NOTIFICATIONS = 'notifications'

    name = models.CharField(max_length=255, null=False, unique=True)

    @property
    def group_name(self):
        return f'{self.name}'

    def __str__(self):
        return f'{self.name}'

    class Meta:
        db_table = 'notifications_channel'
