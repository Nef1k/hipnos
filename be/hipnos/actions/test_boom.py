from hipnos.actions.base import BaseAction


class TestBoomAction(BaseAction):
    name = 'boom'

    def execute(self, boom_id: str):
        print(f'{boom_id} BOOM!')
