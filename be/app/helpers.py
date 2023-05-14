from typing import Dict
from typing import Iterable
from typing import Type
from typing import TypeVar

ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
ALPHABET_UPPER = ALPHABET.upper()
NUMBERS = '0123456789'
UPPER_NAMES_CHARSET = ALPHABET_UPPER + NUMBERS + '_'


def str_only_use_chars(s: str, chars: Iterable[str]):
    char_set = set(chars)
    for char in s:
        if char not in char_set:
            return False
    return True


T = TypeVar('T')


def get_constants_from_class(
        model: Type,
        type_: T = int,
        lowercase: bool = True
) -> Dict[str, T]:
    possible_symbols = set(UPPER_NAMES_CHARSET)

    result = {}
    for key, value in model.__dict__.items():
        if not str_only_use_chars(key, possible_symbols):
            continue

        if not type(value) == type_:
            continue

        k = key.lower() if lowercase else key
        result[k] = value

    return result
