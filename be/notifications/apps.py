from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'

    def ready(self):
        super().ready()

        from di.containers import container
        container.wire(modules=[
            'notifications.management.commands.notify',
            'notifications.consumers',
        ])
