from typing import Dict

from di.services.base import BaseInitializer
from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from hipnos.models import HipnosPhrase
from hipnos.models import PhraseAction
from hipnos.services.actions import ActionSubsystem


class PhraseInitializer(BaseInitializer):
    def __init__(
            self,
            gd_service: GDPathService,
            action_subsystem: ActionSubsystem,
            subsystem: BaseSubsystem,
    ):
        self.gd_service = gd_service
        self.action_subsystem = action_subsystem
        self.subsystem = subsystem

    def initialize(self):
        phrases_data = self.gd_service.read_config('init_data.programs.phrases')
        self._init_phrases(phrases_data)

    def prune(self):
        self.subsystem.prune_models([
            HipnosPhrase
        ])

    def _init_phrases(self, phrases: dict):
        phrases = phrases['phrases']

        core_phrases = {
            phrase_name: HipnosPhrase(
                name=phrase_name,
                phrase=phrase['phrase'],
                synonym=None,  # this is a core phrase not a synonym
                program=None,  # this will be populated later on
            )
            for phrase_name, phrase in phrases.items()
        }
        HipnosPhrase.objects.bulk_create(core_phrases.values())

        self._init_phrase_actions(core_phrases, phrases)

        synonym_phrases = []
        for core_phrase_name, core_phrase in phrases.items():
            for sidx, synonym_phrase in enumerate(core_phrase.get('synonyms', [])):
                synonym_phrases.append(HipnosPhrase(
                    name=f'syn_for_{core_phrase_name}_{sidx}',
                    phrase=synonym_phrase,
                    synonym=core_phrases[core_phrase_name],
                    program=None,  # should not be populated
                ))
        if synonym_phrases:
            HipnosPhrase.objects.bulk_create(synonym_phrases)

    def _init_phrase_actions(
            self,
            core_phrase_instances: Dict[str, HipnosPhrase],
            phrases_data: dict,
    ):
        phrase_action = []

        for phrase_name, phrase_data in phrases_data.items():
            phrase_actions: dict = phrase_data['actions']
            for aidx, (action_name, action_kwargs) in enumerate(phrase_actions.items()):
                action = self.action_subsystem.get_action_info_instance(action_name)
                phrase_action.append(PhraseAction(
                    phrase=core_phrase_instances[phrase_name],
                    action=action,
                    order_key=aidx,
                    args=[],
                    kwargs=action_kwargs
                ))

        PhraseAction.objects.bulk_create(phrase_action)
