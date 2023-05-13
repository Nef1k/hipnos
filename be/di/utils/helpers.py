def build_args_string(*args, **kwargs):
    args_str = ', '.join((str(arg for arg in args)))
    kwargs_str = ', '.join((
        f'{str(arg_name)}: {str(arg_value)}'
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
