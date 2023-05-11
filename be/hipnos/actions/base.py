class BaseAction:
    name = 'base_action'
    abstract = True

    def execute(self, *args, **kwargs):
        raise NotImplementedError()
