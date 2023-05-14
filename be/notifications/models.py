from django.db import models


class NotificationChannel(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)

    @property
    def group_name(self):
        return f'channel_{self.name}'

    def __str__(self):
        return f'{self.name}'

    class Meta:
        db_table = 'notifications_channel'
