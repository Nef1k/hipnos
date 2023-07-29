from tabs import tab_fields
from tabs.base import BaseTabType


class TestTabType(BaseTabType):
    _name = 'test_tab_type'
    _display_name = 'Тестовый тип табы'

    field1 = tab_fields.TestField()
    field2 = tab_fields.TestField()
