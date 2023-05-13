from typing import List
from typing import List
from typing import List

from di.services.base import BaseInitializer
from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from hipnos.models import HProgramState
from hipnos.models import HProgramState
from hipnos.models import HProgramState
from hipnos.models import HProgramState
from hipnos.models import HProgramState
from hipnos.models import HProgramState
from hipnos.models import HipnosPhrase
from hipnos.models import HipnosProgram
from hipnos.models import HipnosProgram
from hipnos.models import HipnosProgram
from hipnos.models import HipnosProgram
from hipnos.models import PhraseAction
from hipnos.models import PhraseAction
from hipnos.services.actions import ActionSubsystem
from hipnos.services.phrases import PhraseSubsystem


class ProgramInitializer(BaseInitializer):
    def __init__(
            self,
            gd_service: GDPathService,
            phrase_subsystem: PhraseSubsystem,
            action_subsystem: ActionSubsystem,
            subsystem: BaseSubsystem,
    ):
        self.gd_service = gd_service
        self.phrase_subsystem = phrase_subsystem
        self.action_subsystem = action_subsystem
        self.subsystem = subsystem

    def prune(self):
        self.subsystem.prune_models([
            HipnosProgram,
            HProgramState,
            PhraseAction,
        ])

    def initialize(self):
        program_states = self.gd_service.read_config('init_data.programs.states')
        programs = self.gd_service.read_config('init_data.programs.programs')

        initialized_states = self._init_states(program_states)
        self._init_programs(programs, initialized_states)

    @staticmethod
    def _init_states(program_states: dict) -> List[HProgramState]:
        states = program_states['program_states']
        states = [
            HProgramState(id=state_id, name=state_name)
            for state_name, state_id in states.items()]
        HProgramState.objects.bulk_create(states)
        return states

    def _init_programs(
            self,
            programs: dict,
            initialized_states: List[HProgramState],
    ) -> List[HipnosProgram]:
        programs = programs['programs']
        initialized_phrases = {
            phrase.name: phrase
            for phrase in self.phrase_subsystem.get_phrases()
        }

        program_instances = []
        phrase_actions = []
        for idx, (program_name, program) in enumerate(programs.items()):
            # TODO: split into local methods
            target_phrase = initialized_phrases[program['target_phrase']]
            program_instance = HipnosProgram(
                name=program_name,
                title=program['title'],
                code_part=program['code_part'],
                target_phrase=target_phrase,
                state=initialized_states[0],
                order_key=idx,
            )
            if 'next_program' in program:
                phrase_action = self.action_subsystem.instantiate_phrase_action(
                    action_name='set_next_program',
                    args=[program['next_program']],
                    order_key=-1,
                )
                phrase_action.phrase = target_phrase
                phrase_actions.append(phrase_action)
            else:
                phrase_action = self.action_subsystem.instantiate_phrase_action(
                    action_name='set_program_state',
                    args=[program_name, HProgramState.FINISHED],
                    order_key=-1,
                )
                phrase_action.phrase = target_phrase
                phrase_actions.append(phrase_action)
            for pidx, src_phrase in enumerate(program['src_phrases']):
                initialized_phrases[src_phrase].program = program_instance
                initialized_phrases[src_phrase].order_key = pidx
            program_instances.append(program_instance)
        program_instances[0].state = initialized_states[1]
        HipnosProgram.objects.bulk_create(program_instances)
        HipnosPhrase.objects.bulk_update(initialized_phrases.values(), ['program', 'order_key'])
        PhraseAction.objects.bulk_create(phrase_actions)

        return programs
