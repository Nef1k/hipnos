from tabs import tab_fields
from tabs.base import BaseTabType


class CountdownTabType(BaseTabType):
    _name = 'countdown'
    _display_name = 'Обратный отсчёт'

    target_timestamp = tab_fields.DateTimeField(
        display_name='Час Ч', required=True)
    before_prompt = tab_fields.CharField(
        display_name='Надпись до времени', required=False, default='Отсчёт идёт')
    after_prompt = tab_fields.CharField(
        display_name='Надпись после времени', required=False, default='Время пришло!'
    )
    play_sound = tab_fields.BooleanField(
        display_name='Звуковое оповещение', required=False, default=False
    )
