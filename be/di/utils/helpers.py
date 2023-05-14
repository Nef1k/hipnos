import random
from typing import Dict


def build_args_string(*args, **kwargs):
    args_str = ', '.join((str(arg for arg in args)))
    kwargs_str = ', '.join((
        f'{str(arg_name)}={str(arg_value)}'
        for arg_name, arg_value in kwargs.items()
    ))

    if args and kwargs_str:
        return f'{args_str}, {kwargs_str}'
    if args and not kwargs:
        return args_str
    if not args and kwargs_str:
        return kwargs_str
    if not args and not kwargs:
        return ''


def build_action_execution(action_name, args, kwargs, result):
    return f'{action_name}({build_args_string(*args, **kwargs)}) -> {result}'


def generate_password(length: int = None) -> str:
    alpha = 'abcdeifghijklmnopqrstuvwxyz'
    alpha += alpha.upper()
    alpha += '0123456789'
    password_length = random.randint(4, 6) if not length else length
    return (''.join(random.choice(alpha)
                    for _ in range(0, password_length)))


def split_query_string(query_string: str) -> Dict[str, str]:
    if not query_string:
        return {}

    result = {}
    for param in query_string.split('&'):
        param_name, param_value = param.split('=')
        result[param_name] = param_value

    return result
