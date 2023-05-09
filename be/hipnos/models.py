from django.db import models


class MemoryType(models.Model):
    TEXT = 0
    AUDIO = 1
    VIDEO = 2

    name = models.CharField(max_length=255, null=False, default='')

    class Meta:
        db_table = 'hipnos_memory_type'


class Memory(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)
    title = models.CharField(max_length=255, null=False, default='')
    unlocked_at = models.DateTimeField(null=True)

    markdown_text = models.TextField(null=False, default='')
    html_text = models.TextField(null=False, default='')

    order_key = models.IntegerField(null=False)

    memory_type = models.ForeignKey(MemoryType, on_delete=models.DO_NOTHING)
