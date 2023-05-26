import os
from typing import Optional
from typing import Tuple

from fpdf import FPDF

from di.services.base import BaseInitializer
from game_data.services.gd_path import GDPathService
from hipnos.services.memory import MemoryService


class HQRInitializer(BaseInitializer):
    def __init__(
            self,
            gd_service: GDPathService,
            hqr_subsystem,
            memory_subsystem: MemoryService,
            qr_output_dir: str,
    ):
        self.gd_service = gd_service
        self.hqr_subsystem = hqr_subsystem
        self.memory_subsystem = memory_subsystem
        self.qr_output_dir = qr_output_dir

    def initialize(self):
        phrases = self.gd_service.read_config('init_data.programs.phrases')
        phrases = {
            phrase_name: {
                **phrase_data,
                'qr_memory_type': self._get_memory_type_info(
                    phrase_data)[0],
                'qr_memory_is_lore': self._get_memory_type_info(
                    phrase_data)[1],
            }
            for phrase_name, phrase_data in phrases['phrases'].items()
            if phrase_data.get('qr', False)
        }

        for phrase_name, phrase_data in phrases.items():
            unlocking_phrase = phrase_data['phrase']
            memory_type = phrase_data['qr_memory_type']
            is_lore = phrase_data['qr_memory_is_lore']

            phrase_data['qr_path'] = self.hqr_subsystem.generate_memory_qr(
                unlocking_phrase,
                memory_type,
                is_lore,
                phrase_name,
            )

        pdf_path = os.path.join(self.qr_output_dir, 'qr.pdf')
        self._generate_qr_pdf(phrases, pdf_path)

    def prune(self):
        for f_name in os.listdir(self.qr_output_dir):
            path = os.path.abspath(os.path.join(self.qr_output_dir, f_name))
            if os.path.isfile(path) and os.path.splitext(path)[1] == '.png':
                os.remove(path)

    def _get_memory_type_info(self, phrase: dict) -> Tuple[Optional[str], Optional[bool]]:
        memory_actions = [
            action_data
            for action_name, action_data in phrase.get('actions', {}).items()
            if action_name == 'unlock_memory'
        ]
        if not memory_actions:
            return None, None

        primary_memory = memory_actions[0]['memory']
        memory = self.memory_subsystem.get_memory_by_name(primary_memory)

        return memory.memory_type.name, memory.is_lore

    def _generate_qr_pdf(self, phrases, output_path: str):
        pdf = _QRPDF()
        pdf.compress = False
        for phrase_name, phrase_data in phrases.items():
            pdf.print_phrase(phrase_name, phrase_data)
        pdf.output(output_path)


class _QRPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_font('Arial', '', 16)

    def print_phrase(self, phrase_name: str, phrase_data: dict):
        self.add_page()
        self.image(phrase_data['qr_path'])
        self.write(10, phrase_name)
