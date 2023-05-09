from django.apps import AppConfig


class HipnosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hipnos'

    def ready(self):
        super().ready()

        from . import views
        from di.containers import container
        container.wire(modules=[
            'hipnos.management.commands.base.serviced_hipnos_command'
        ])
