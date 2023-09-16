from typing import List

from django.db import transaction
from django.utils.timezone import now
from rest_framework.exceptions import NotFound

from di.services.base import BaseSubsystem
from di.services.exceptions import SubsystemError
from game_data.services.gd_path import GDPathService
from hipnos.models import HipnosPhrase, HEventType
from hipnos.models import HipnosProgram
from hipnos.models import PhraseAction
from hipnos.services.actions import ActionSubsystem
from hipnos.services.events import EventSubsystem
from hipnos.services.initializers.phrases import PhraseInitializer


class PhraseSubsystem(BaseSubsystem):
    def __init__(
            self,
            gd_service: GDPathService,
            action_subsystem: ActionSubsystem,
            event_subsystem: EventSubsystem,
    ):
        self.gd_service = gd_service
        self.action_subsystem = action_subsystem
        self.event_subsystem = event_subsystem
        self.initializer = PhraseInitializer(
            gd_service=gd_service,
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

    def get_phrases(self):
        return HipnosPhrase.objects.all()

    def can_phrase_be_unlocked(self, phrase: HipnosPhrase) -> bool:
        core_phrase = self.get_core_phrase(phrase)

        if not core_phrase.is_locked:
            return False

        programs_finished_by = HipnosProgram.objects.filter(
            target_phrase=core_phrase)
        is_phrase_target = programs_finished_by.exists()
        can_programs_be_finished = all(
            all(program.hipnosphrase_set.values_list('unlocked_at', flat=True))
            for program in programs_finished_by
        )
        if is_phrase_target and not can_programs_be_finished:
            return False

        return True

    def submit_phrase(self, phrase_str: str):
        self.event_subsystem.emit_event(
            HEventType.PHRASE_SUBMITTED,
            misc_data={'phrase': phrase_str}
        )

        try:
            phrase = self.get_phrase(phrase_str)
        except HipnosPhrase.DoesNotExist:
            raise UnknownPhraseError(f'Phrase {phrase_str} is unknown')

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


class PhraseError(SubsystemError):
    pass


class UnknownPhraseError(SubsystemError, NotFound):
    pass
