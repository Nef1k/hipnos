from rest_framework import serializers

from hipnos.models import Memory


class PonosMemoryListSerializer(serializers.ModelSerializer):
    memory_type = serializers.IntegerField(source='memory_type_id')
    is_locked = serializers.SerializerMethodField()

    def get_is_locked(self, instance: Memory):
        return instance.unlocked_at is None

    class Meta:
        model = Memory
        fields = ['id', 'title', 'memory_type', 'is_locked']
