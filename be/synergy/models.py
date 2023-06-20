from django.db import models

from users.models import User


class SynergyPage(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    display_name = models.CharField(max_length=255, null=False, default='')

    page_data = models.JSONField(null=False, default=dict)

    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    class Meta:
        db_table = 'synergy_page'


class SynergyTab(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    display_name = models.CharField(max_length=255, null=False, default='')

    page = models.ForeignKey(SynergyPage, null=False, on_delete=models.CASCADE)

    widget_args = models.JSONField()

    class Meta:
        db_table = 'synergy_tab'


class DefaultUserPage(models.Model):
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    page = models.ForeignKey(SynergyPage, null=False, on_delete=models.CASCADE)

    class Meta:
        db_table = 'synergy_user_page'
