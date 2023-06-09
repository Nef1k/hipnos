from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        super().ready()

        from . import views
        from di.containers import container
        container.wire(modules=[
            'users.management.commands.token',
        ])
