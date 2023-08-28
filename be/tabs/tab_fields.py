from typing import Dict
from typing import Optional

from tabs.base import BaseField


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
            default: Optional[str] = None,
    ):
        super().__init__(display_name=display_name)
        self.max_length = max_length
        self.required = required
        self.default = default

    def to_json(self):
        prev = super().to_json()
        prev.update({
            'type': 'char',
            'max_length': self.max_length,
            'required': self.required,
            'default': self.default
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


class MultipleChoicesField(NamedField):
    def __init__(
            self, *,
            choices: Dict[str, str],
            required: Optional[bool] = False,
            display_name: Optional[str] = '',
    ):
        super().__init__(display_name=display_name)
        self.required = required
        self.choices = choices

    def to_json(self):
        prev = super().to_json()
        prev.update({
            'type': 'choice_multiple',
            'required': self.required,
            'choices': self.choices,
        })
        return prev


class DateTimeField(NamedField):
    def __init__(
            self, *,
            required: Optional[bool] = False,
            display_name: Optional[str] = '',
    ):
        super().__init__(display_name=display_name)
        self.required = required

    def to_json(self):
        prev = super(DateTimeField, self).to_json()
        prev.update({
            'type': 'datetime',
            'required': self.required,
        })
        return prev


class BooleanField(NamedField):
    def __init__(
            self, *,
            required: Optional[bool] = False,
            display_name: Optional[str] = '',
            default: Optional[bool] = None,
    ):
        super().__init__(display_name=display_name)
        self.required = required
        self.default = default

    def to_json(self):
        prev = super().to_json()
        prev.update({
            'type': 'boolean',
            'required': self.required,
            'default': self.default,
        })
        return prev
