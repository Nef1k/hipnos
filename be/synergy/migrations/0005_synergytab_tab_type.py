# Generated by Django 4.2.1 on 2023-06-27 17:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('synergy', '0004_tabtype'),
    ]

    operations = [
        migrations.AddField(
            model_name='synergytab',
            name='tab_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='synergy.tabtype'),
        ),
    ]
