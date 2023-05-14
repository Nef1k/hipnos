from dependency_injector.wiring import Provide

from di.containers import Container
from hipnos.actions.base import BaseAction
from hipnos.models import HEventType
from hipnos.models import HProgramState
from hipnos.services.actions import ActionSubsystem
from hipnos.services.events import EventSubsystem
from hipnos.services.program import ProgramSubsystem


class SetNextProgram(BaseAction):
    name = 'set_next_program'

    def __init__(
            self,
            program_subsystem: ProgramSubsystem = Provide[Container.program_subsystem],
            action_subsystem: ActionSubsystem = Provide[Container.actions_subsystem],
            event_subsystem: EventSubsystem = Provide[Container.event_subsystem],
    ):
        self.program_subsystem = program_subsystem
        self.action_subsystem = action_subsystem
        self.event_subsystem = event_subsystem

    def execute(self, program: str):
        next_program = self.program_subsystem.get_program_by_name(program)

        current_program = self.program_subsystem.get_current_program()

        self.action_subsystem.execute_action(
            'set_program_state',
            current_program.name,
            HProgramState.FINISHED,
        )
        self.action_subsystem.execute_action(
            'set_program_state',
            next_program.name,
            HProgramState.IN_PROGRESS,
        )

        self.event_subsystem.emit_event(
            HEventType.PROGRAM_NEXT,
            misc_data={
                'next_program': program,
            }
        )


class SetProgramState(BaseAction):
    name = 'set_program_state'

    def __init__(
            self,
            program_subsystem: ProgramSubsystem = Provide[Container.program_subsystem],
            event_subsystem: EventSubsystem = Provide[Container.event_subsystem],
    ):
        self.program_subsystem = program_subsystem
        self.event_subsystem = event_subsystem

    def execute(self, program_name: str, state_id: int):
        program = self.program_subsystem.get_program_by_name(program_name)
        self.program_subsystem.set_program_state(program, state_id)

        self.event_subsystem.emit_event(
            HEventType.PROGRAM_SET_STATE,
            misc_data={
                'program': program_name,
                'new_state_id': state_id,
            }
        )
