from django.apps import AppConfig


class SynergyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'synergy'

    def ready(self):
        super().ready()

        from . import views
        from di.containers import container
        container.wire(modules=[
            'synergy.views.pages',
        ])

