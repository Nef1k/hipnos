import json
import os
from typing import Optional

from di.services.base import BaseSubsystem
from di.services.qr import QRService
from game_data.services.gd_path import GDPathService
from hipnos.services.initializers.HQR import HQRInitializer
from hipnos.services.memory import MemoryService


class HQRSubsystem(BaseSubsystem):
    def __init__(
            self,
            qr_output_dir: str,
            logos_dir: str,
            gd_service: GDPathService,
            qr_service: QRService,
            memory_subsystem: MemoryService,
    ):
        self.qr_output_dir = qr_output_dir
        self.logos_dir = logos_dir
        self.gd_service = gd_service
        self.qr_service = qr_service
        self.initializer = HQRInitializer(
            gd_service,
            self,
            memory_subsystem,
            qr_output_dir,
        )

    def get_logo_path(self, memory_type_name: str, is_lore: bool):
        logo_type = 'lore' if is_lore else 'main'
        logo_name = f'{logo_type}_{memory_type_name}.png'
        return os.path.join(self.logos_dir, logo_name)

    def generate_memory_qr(
            self,
            unlocking_phrase: str,
            memory_type_name: str,
            is_lore: bool = False,
            phrase_name: Optional[str] = None,
    ):
        data = json.dumps({
            'phrase': unlocking_phrase
        })

        logo_path = self.get_logo_path(memory_type_name, is_lore)

        output_name = f'{phrase_name or unlocking_phrase}.png'
        output_path = os.path.join(self.qr_output_dir, output_name)

        self.qr_service.generate_general_qr(data, output_path, logo_path)

        return output_path
