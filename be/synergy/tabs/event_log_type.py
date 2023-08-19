from tabs import tab_fields
from tabs.base import BaseTabType


class EventLogTabType(BaseTabType):
    _name = 'event_log'
    _display_name = 'Лог событий'

    selected_channels = tab_fields.MultipleChoicesField(
        choices={
            'ch1': 'Channel 1',
            'ch2': 'Channel 2',
            'ch3': 'Channel 3 Lol',
        },
        display_name='Канал',
        required=True,
    )
