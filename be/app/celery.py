from celery import Celery
from django.conf import settings


backend = f''

app = Celery('app', broker=settings.CELERY_BROKER, backend=backend)

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
