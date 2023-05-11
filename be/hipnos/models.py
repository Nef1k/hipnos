from django.db import models

from di.utils.entitled_model import NamedModelMixin


class MemoryType(models.Model, NamedModelMixin):
    TEXT = 0
    AUDIO = 1
    VIDEO = 2

    name = models.CharField(max_length=255, null=False, default='')

    class Meta:
        db_table = 'hipnos_memory_type'


class Memory(models.Model, NamedModelMixin):
    name = models.CharField(max_length=255, null=False, unique=True)
    title = models.CharField(max_length=255, null=False, default='')
    unlocked_at = models.DateTimeField(null=True)

    markdown_text = models.TextField(null=False, default='')
    html_text = models.TextField(null=False, default='')

    order_key = models.IntegerField(null=False)

    memory_type = models.ForeignKey(MemoryType, on_delete=models.DO_NOTHING)


class HProgramState(models.Model, NamedModelMixin):
    LOCKED = 0
    IN_PROGRESS = 1
    FINISHED = 2

    name = models.CharField(max_length=255, null=False, unique=True)

    class Meta:
        db_table = 'hipnos_program_state'


class HipnosPhrase(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)

    phrase = models.CharField(max_length=255, null=False, unique=True)
    unlocked_at = models.DateTimeField(null=True)

    synonym = models.ForeignKey('HipnosPhrase', null=True, on_delete=models.CASCADE)
    program = models.ForeignKey('HipnosProgram', null=True, on_delete=models.DO_NOTHING)

    order_key = models.IntegerField(null=True)

    def __str__(self):
        return f'<{type(self).__name__} {self.name} ("{self.phrase}")>'

    class Meta:
        db_table = 'hipnos_phrase'


class HipnosProgram(models.Model, NamedModelMixin):
    name = models.CharField(max_length=255, null=False)
    title = models.CharField(max_length=255, null=True, default='')

    code_part = models.CharField(max_length=2, null=False)

    state = models.ForeignKey(HProgramState, on_delete=models.DO_NOTHING)
    target_phrase = models.ForeignKey(HipnosPhrase, on_delete=models.DO_NOTHING)

    order_key = models.IntegerField(null=False)

    @property
    def unlocked_at(self):
        return self.target_phrase.unlocked_at

    class Meta:
        db_table = 'hipnos_program'


class HipnosAction(models.Model):
    name = models.CharField(max_length=255, null=False, unique=True)

    action_class_name = models.CharField(max_length=255, null=False)
    module_name = models.CharField(max_length=255, null=False)

    class Meta:
        db_table = 'hipnos_actions'

    def __str__(self):
        return f'<{type(self).__name__} {self.name}>'
