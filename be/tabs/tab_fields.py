from typing import Optional

from tabs.base import BaseField


class TestField(BaseField):
    def to_json(self):
        return {'test_param': 123}


class NamedField(BaseField):
    def __init__(self, *, display_name: Optional[str] = ''):
        self.display_name = display_name

    def to_json(self):
        return {
            'display_name': self.display_name,
        }


class CharField(NamedField):
    def __init__(
            self, *,
            required: Optional[bool] = False,
            display_name: Optional[str] = '',
            max_length: Optional[int] = None,
    ):
        super().__init__(display_name=display_name)
        self.max_length = max_length
        self.required = required

    def to_json(self):
        prev = super().to_json()
        prev.update({
            'type': 'char',
            'max_length': self.max_length,
            'required': self.required,
        })
        return prev


class IntegerField(NamedField):
    def __init__(
            self, *,
            required: Optional[bool] = False,
            display_name: Optional[str] = '',
    ):
        super().__init__(display_name=display_name)
        self.required = required

    def to_json(self):
        prev = super().to_json()
        prev.update({
            'type': 'integer',
            'required': self.required,
        })
        return prev


# class BooleanField(NamedField):
#     def __init__(
#             self, *,
#             required: Optional[bool] = False,
#             display_name: Optional[str] = '',
#     ):
#         super().__init__(display_name=display_name)
