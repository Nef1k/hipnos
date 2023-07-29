from di.utils.helpers import classproperty


class BaseField:
    def to_json(self):
        raise NotImplementedError()


class BaseTabType:
    _abstract: bool = True

    _name: str = None
    _display_name: str = None

    @classproperty
    def is_abstract(cls):  # noqa
        return cls.__dict__.get('_abstract', False)

    @classproperty
    def name(cls):  # noqa
        return cls.__dict__['_name']

    @classproperty
    def display_name(cls):  # noqa
        return cls.__dict__.get('_display_name', cls.name)
