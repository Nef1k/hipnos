# TODO: split this into package modules like serializers.*
from rest_framework import serializers

from hipnos.models import HipnosProgram, HipnosEvent, HEventType
from hipnos.models import Memory


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HEventType
        fields = '__all__'


class HipnosEventDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)
    event_type = serializers.StringRelatedField(many=False)
    source = serializers.CharField(read_only=True)
    previous_state = serializers.JSONField(read_only=True)
    current_state = serializers.JSONField(read_only=True)
    misc_data = serializers.JSONField(read_only=True)

    class Meta:
        model = HipnosEvent
        fields = [
            'id',
            'timestamp',
            'event_type',
            'source',
            'previous_state',
            'current_state',
            'misc_data',
        ]


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
