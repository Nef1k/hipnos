from typing import List

from django.db import transaction

from di.services.base import BaseService
from hipnos.services.memory import MemoryService


class ResetService(BaseService):
    def __init__(
            self,
            memory_service: MemoryService,
    ):
        self.memory_service = memory_service

    def reset(self):
        with transaction.atomic():
            self.memory_service.reset()

    def prune(self):
        with transaction.atomic():
            self.memory_service.prune()
