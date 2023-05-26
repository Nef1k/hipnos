from rest_framework import serializers

from hipnos.models import HipnosProgram
from hipnos.models import Memory


class MemoryListSerializer(serializers.ModelSerializer):
    memory_type = serializers.IntegerField(source='memory_type_id')
    title = serializers.SerializerMethodField()

    def get_title(self, instance: Memory):
        return instance.title if not instance.is_locked else None

    class Meta:
        model = Memory
        fields = ['id', 'title', 'memory_type', 'is_locked']


class MemoryDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = '__all__'


class ProgramListSerializer(serializers.ModelSerializer):
    src_phrases = serializers.SerializerMethodField()
    target_phrase = serializers.SerializerMethodField()
    code_part = serializers.SerializerMethodField()

    def get_code_part(self, instance: HipnosProgram):
        return instance.code_part if instance.unlocked_at is not None else None

    def get_src_phrases(self, instance: HipnosProgram):
        return [
            phrase.phrase if phrase.unlocked_at is not None else None
            for phrase in instance.hipnosphrase_set.order_by('order_key')
        ]

    def get_target_phrase(self, instance: HipnosProgram):
        phrase = instance.target_phrase.phrase
        return phrase if instance.target_phrase.unlocked_at is not None else None

    class Meta:
        model = HipnosProgram
        fields = [
            'id',
            'name',
            'title',
            'order_key',
            'state',
            'code_part',
            'target_phrase',
            'src_phrases']


class SubmitPhraseSerializer(serializers.Serializer):
    phrase = serializers.CharField(required=True, allow_null=False)
