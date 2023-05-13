from typing import List

from django.db import transaction
from django.utils.timezone import now

from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from hipnos.models import HProgramState
from hipnos.models import HipnosPhrase
from hipnos.models import HipnosProgram
from hipnos.models import PhraseAction
from hipnos.services.actions import ActionSubsystem
from hipnos.services.initializers.program import ProgramInitializer
from hipnos.services.phrases import PhraseSubsystem


class ProgramSubsystem(BaseSubsystem):
    def __init__(
            self,
            gd_path_service: GDPathService,
            action_subsystem: ActionSubsystem,
            phrases_subsystem: PhraseSubsystem,
    ):
        self.gd_path_service = gd_path_service
        self.action_subsystem = action_subsystem
        self.phrases_subsystem = phrases_subsystem
        self.initializer = ProgramInitializer(
            gd_service=gd_path_service,
            phrase_subsystem=phrases_subsystem,
            action_subsystem=action_subsystem,
            subsystem=self,
        )

    def get_phrase(self, phrase_str: str) -> HipnosPhrase:
        return HipnosPhrase.objects.get(phrase__iexact=phrase_str)

    def get_phrase_by_name(self, phrase_name: str) -> HipnosPhrase:
        return HipnosPhrase.objects.get(name=phrase_name)

    def get_core_phrase(self, phrase: HipnosPhrase) -> HipnosPhrase:
        if phrase.synonym_id is None:
            return phrase

        return phrase.synonym

    def get_phrase_actions(self, phrase: HipnosPhrase) -> List[PhraseAction]:
        actions = list(PhraseAction.objects.filter(phrase=phrase))

        if phrase.synonym is not None:
            actions.extend(
                PhraseAction.objects.filter(phrase=self.get_core_phrase(phrase)))

        return actions

    def can_program_be_finished(self, program: HipnosProgram) -> bool:
        src_words_unlocked = program.hipnosphrase_set.values_list('unlocked_at', flat=True)
        return all(src_words_unlocked)

    def can_phrase_be_unlocked(self, phrase: HipnosPhrase) -> bool:
        if not phrase.is_locked:
            return False

        core_phrase = self.get_core_phrase(phrase)
        programs_finished_by = HipnosProgram.objects.filter(
            target_phrase=core_phrase)
        is_phrase_target = programs_finished_by.exists()
        can_programs_be_finished = all(
            self.can_program_be_finished(program)
            for program in programs_finished_by
        )
        if is_phrase_target and not can_programs_be_finished:
            return False

        return True

    def submit_phrase(self, phrase_str: str):
        phrase = self.get_phrase(phrase_str)

        if not self.can_phrase_be_unlocked(phrase):
            return None

        actions = self.get_phrase_actions(phrase)
        for phrase_action in actions:
            self.action_subsystem.execute_action_by_info(phrase_action)

    def unlock_phrase(self, phrase_str: str):
        phrase = self.get_phrase_by_name(phrase_str)
        core_phrase = self.get_core_phrase(phrase)

        phrase.unlocked_at = now()
        core_phrase.unlocked_at = now()

        with transaction.atomic():
            if phrase != core_phrase:
                phrase.save()
            core_phrase.save()

    def get_program_by_name(self, program_name: str) -> HipnosProgram:
        return HipnosProgram.objects.get(name=program_name)

    def get_current_program(self) -> HipnosProgram:
        return HipnosProgram.objects.get(state_id=HProgramState.IN_PROGRESS)

    def set_program_state(self, program: HipnosProgram, state_id: int):
        program.state_id = state_id
        program.save()
