# Generated by Django 4.2.1 on 2023-05-13 00:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hipnos', '0007_hipnosaction'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhraseAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_key', models.IntegerField(null=True)),
                ('args', models.JSONField()),
                ('kwargs', models.JSONField()),
                ('action', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hipnos.hipnosaction')),
                ('phrase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hipnos.hipnosphrase')),
            ],
            options={
                'db_table': 'hipnos_phrase_action',
            },
        ),
    ]
