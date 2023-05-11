from typing import Dict
from typing import List

from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from hipnos.models import HProgramState
from hipnos.models import HipnosPhrase
from hipnos.models import HipnosProgram


class ProgramSubsystem(BaseSubsystem):
    def __init__(
            self,
            gd_path_service: GDPathService,
    ):
        self.gd_path_service = gd_path_service

    def initialize(self):
        program_states = self.gd_path_service.read_config('init_data.programs.states')
        phrases = self.gd_path_service.read_config('init_data.programs.phrases')
        programs = self.gd_path_service.read_config('init_data.programs.programs')

        initialized_states = self._init_states(program_states)
        initialized_phrases = self._init_phrases(phrases)
        self._init_programs(programs, initialized_states, initialized_phrases)

    def prune(self):
        HipnosPhrase.objects.filter(synonym__isnull=False).delete()
        HipnosPhrase.objects.filter(program__isnull=False).delete()
        self.prune_models([
            HipnosProgram,
            HipnosPhrase,
            HProgramState,
        ])

    @staticmethod
    def _init_states(program_states: dict) -> List[HProgramState]:
        states = program_states['program_states']
        states = [
            HProgramState(id=state_id, name=state_name)
            for state_name, state_id in states.items()]
        HProgramState.objects.bulk_create(states)
        return states

    @staticmethod
    def _init_phrases(phrases: dict) -> Dict[str, HipnosPhrase]:
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

        return {
            phrase.name: phrase
            for phrase in [*core_phrases.values(), *synonym_phrases]
        }

    @staticmethod
    def _init_programs(
            programs: dict,
            initialized_states: List[HProgramState],
            initialized_phrases: Dict[str, HipnosPhrase],
    ) -> List[HipnosProgram]:
        programs = programs['programs']

        program_instances = []
        for idx, (program_name, program) in enumerate(programs.items()):
            program_instance = HipnosProgram(
                name=program_name,
                title=program['title'],
                code_part=program['code_part'],
                target_phrase=initialized_phrases[program['target_phrase']],
                state=initialized_states[0],
                order_key=idx,
            )
            for pidx, src_phrase in enumerate(program['src_phrases']):
                initialized_phrases[src_phrase].program = program_instance
                initialized_phrases[src_phrase].order_key = pidx
            program_instances.append(program_instance)
        program_instances[0].state = initialized_states[1]
        HipnosProgram.objects.bulk_create(program_instances)
        HipnosPhrase.objects.bulk_update(initialized_phrases.values(), ['program', 'order_key'])

        return programs

    def submit_phrase(self, phrase: str):
        print(f'Phrase submitted: {phrase}')
