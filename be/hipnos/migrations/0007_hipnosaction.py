# Generated by Django 4.2.1 on 2023-05-11 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hipnos', '0006_alter_hipnosprogram_order_key'),
    ]

    operations = [
        migrations.CreateModel(
            name='HipnosAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('action_class_name', models.CharField(max_length=255)),
                ('module_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'hipnos_actions',
            },
        ),
    ]