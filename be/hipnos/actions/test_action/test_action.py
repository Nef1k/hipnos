from dependency_injector.wiring import Provide
from dependency_injector.wiring import inject

from di.containers import Container
from hipnos.actions.base import BaseAction
from hipnos.services.program import ProgramSubsystem


class TestAction(BaseAction):
    name = 'test_action'

    @inject
    def __init__(
            self,
            program_subsystem: ProgramSubsystem = Provide[Container.program_subsystem]
    ):
        self.program_subsystem = program_subsystem

    def execute(self, *args, **kwargs):
        args_str = '\n'.join([
            f'- {str(arg)}'
            for arg in args
        ])
        kwargs_str = '\n'.join([
            f'- {str(kwarg_name)}: {kwarg_value}'
            for kwarg_name, kwarg_value in kwargs.items()
        ])
        s = f'Executed test action!\n' \
            f'Args: \n{args_str}\n' \
            f'Kwargs: \n{kwargs_str}'
        print(s)
