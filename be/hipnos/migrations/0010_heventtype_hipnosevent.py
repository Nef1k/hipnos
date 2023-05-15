# Generated by Django 4.2.1 on 2023-05-14 07:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hipnos', '0009_alter_hipnosprogram_target_phrase'),
    ]

    operations = [
        migrations.CreateModel(
            name='HEventType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
            options={
                'db_table': 'hipnos_event_type',
            },
        ),
        migrations.CreateModel(
            name='HipnosEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('source', models.CharField(default='unknown', max_length=255)),
                ('previous_state', models.JSONField(null=True)),
                ('current_state', models.JSONField(null=True)),
                ('misc_data', models.JSONField(null=True)),
                ('event_type', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='hipnos.heventtype')),
            ],
            options={
                'db_table': 'hipnos_event',
            },
        ),
    ]