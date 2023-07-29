from django.db import models

from users.models import User


class SynergyPage(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    display_name = models.CharField(max_length=255, null=False, default='')

    page_data = models.JSONField(null=False, default=dict)

    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    class Meta:
        db_table = 'synergy_page'


class TabType(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    display_name = models.CharField(max_length=255, null=False, default='')

    fields = models.JSONField(null=False, default=dict)

    class Meta:
        db_table = 'synergy_tab_type'


class SynergyTab(models.Model):
    display_name = models.CharField(max_length=255, null=False, default='Виджет')

    page = models.ForeignKey(SynergyPage, null=False, on_delete=models.CASCADE)
    tab_type = models.ForeignKey(TabType, null=True, on_delete=models.SET_NULL)

    widget_args = models.JSONField(null=False, default=dict)

    class Meta:
        db_table = 'synergy_tab'


class DefaultUserPage(models.Model):
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    page = models.ForeignKey(SynergyPage, null=False, on_delete=models.CASCADE)

    class Meta:
        db_table = 'synergy_user_page'
