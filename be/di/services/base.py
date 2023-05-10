class BaseService:
    pass


class BaseSubsystem(BaseService):
    def initialize(self):
        raise NotImplementedError()

    def prune(self):
        raise NotImplementedError()

    def reset(self):
        self.prune()
        self.initialize()
