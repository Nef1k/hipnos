# Generated by Django 4.2.1 on 2023-05-11 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hipnos', '0003_alter_hipnosphrase_synonym'),
    ]

    operations = [
        migrations.AddField(
            model_name='hipnosphrase',
            name='order_key',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='hipnosprogram',
            name='order_key',
            field=models.IntegerField(null=True),
        ),
    ]
