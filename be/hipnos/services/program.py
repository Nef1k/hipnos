from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from hipnos.models import HProgramState
from hipnos.models import HipnosProgram
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

    def can_program_be_finished(self, program: HipnosProgram) -> bool:
        src_words_unlocked = program.hipnosphrase_set.values_list('unlocked_at', flat=True)
        return all(src_words_unlocked)

    def get_program_by_name(self, program_name: str) -> HipnosProgram:
        return HipnosProgram.objects.get(name=program_name)

    def get_current_program(self) -> HipnosProgram:
        return HipnosProgram.objects.get(state_id=HProgramState.IN_PROGRESS)

    def set_program_state(self, program: HipnosProgram, state_id: int):
        program.state_id = state_id
        program.save()
