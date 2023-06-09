from typing import Iterable
from typing import Type

from django.db import models


class BaseService:
    pass


class BaseSubsystem(BaseService):
    def initialize(self):
        if 'initializer' in self.__dict__:
            return getattr(self, 'initializer').initialize()
        raise NotImplementedError()

    def prune(self):
        if 'initializer' in self.__dict__:
            return getattr(self, 'initializer').prune()
        raise NotImplementedError()

    def reset(self):
        self.prune()
        self.initialize()

    @staticmethod
    def prune_models(models_list: Iterable[Type[models.Model]]):
        for model in models_list:
            model.objects.all().delete()


class BaseInitializer:
    def initialize(self):
        raise NotImplementedError()

    def prune(self):
        raise NotImplementedError()
