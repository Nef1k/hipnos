import os
from typing import List

from di.services.base import BaseInitializer
from di.services.files import FilesService
from di.services.markdown import MarkdownService
from game_data.services.gd_path import GDPathService
from hipnos.models import Memory
from hipnos.models import MemoryType


class MemoryInitializer(BaseInitializer):
    def __init__(
            self,
            gd_service: GDPathService,
            files_service: FilesService,
            markdown_service: MarkdownService,
    ):
        self.gd_service = gd_service
        self.files_service = files_service
        self.markdown_service = markdown_service

    def prune(self):
        Memory.objects.all().delete()
        MemoryType.objects.all().delete()

    def initialize(self):
        raw_memories = self.gd_service.read_config('init_data.memories.index')
        memory_index = raw_memories['memories']
        memory_types = raw_memories['memory_types']

        self._initialize_memory_types(memory_types)
        self._initialize_memories(memory_index, memory_types)

    def _initialize_memory_types(self, new_memory_types):
        memory_types = self._prepare_memory_types(new_memory_types)
        MemoryType.objects.bulk_create(memory_types)

    def _initialize_memories(self, memory_index, memory_types):
        initial_memories = self._load_initial_memories(memory_index, memory_types)
        Memory.objects.bulk_create(initial_memories)

    @staticmethod
    def _prepare_memory_types(memory_types) -> List[MemoryType]:
        return [MemoryType(id=type_id, name=type_name)
                for type_name, type_id in memory_types.items()]

    def _load_initial_memories(self, memory_index, memory_types):
        memories = self._load_index(memory_index, memory_types)

        return memories

    def _load_index(self, memory_index: dict, memory_types: dict) -> List[Memory]:
        memories = []
        for idx, (memory_name, memory) in enumerate(memory_index.items()):
            memory_type_id = memory_types[memory['type']]

            markdown_path = self.get_markdown_full_path(memory['markdown_file'])
            markdown_body = self.files_service.read_text_file(markdown_path)
            html_body = self.markdown_service.markdown_to_html(markdown_body)

            memory_instance = Memory(
                name=memory_name,
                title=memory['title'],
                is_lore=memory.get('is_lore', True),
                markdown_text=markdown_body,
                html_text=html_body,
                order_key=idx,
                memory_type_id=memory_type_id,
            )

            memories.append(memory_instance)

        return memories

    def get_markdown_full_path(self, rel_path: str) -> str:
        return os.path.join(
            self.gd_service.game_data_root_dir, 'init_data', 'memories', rel_path)
