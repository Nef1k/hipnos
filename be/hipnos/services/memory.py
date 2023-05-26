from django.utils.timezone import now

from di.services.base import BaseSubsystem
from di.services.files import FilesService
from di.services.markdown import MarkdownService
from game_data.services.gd_path import GDPathService
from hipnos.models import Memory
from hipnos.services.initializers.memory import MemoryInitializer


class MemoryService(BaseSubsystem):
    def __init__(
            self,
            gd_path_service: GDPathService,
            files_service: FilesService,
            markdown_service: MarkdownService,
    ):
        self.gd_path_service = gd_path_service
        self.files_service = files_service
        self.markdown_service = markdown_service
        self.initializer = MemoryInitializer(
            gd_service=gd_path_service,
            files_service=files_service,
            markdown_service=markdown_service,
        )

    def get_memory_by_name(self, name: str) -> Memory:
        return Memory.objects.select_related('memory_type').get(name=name)

    def unlock_memory(self, memory_name: str):
        memory = self.get_memory_by_name(memory_name)

        memory.unlocked_at = now()
        memory.save()
