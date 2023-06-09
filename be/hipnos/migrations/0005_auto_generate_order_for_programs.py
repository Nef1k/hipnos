# Generated by Django 4.2.1 on 2023-05-11 15:37

from django.db import migrations
from django.db.models import F


def populate_order_key(apps, schema_editor):
    HipnosProgram = apps.get_model('hipnos', 'HipnosProgram')  # noqa
    HipnosProgram.objects.update(order_key=F('id'))


def clear_order_key(apps, schema_editor):
    HipnosProgram = apps.get_model('hipnos', 'HipnosProgram')  # noqa
    HipnosProgram.objects.update(order_key=None)


class Migration(migrations.Migration):

    dependencies = [
        ('hipnos', '0004_hipnosphrase_order_key_hipnosprogram_order_key'),
    ]

    operations = [
        migrations.RunPython(populate_order_key, reverse_code=clear_order_key)
    ]
