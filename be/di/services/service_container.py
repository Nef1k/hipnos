import importlib

from di.services.base import BaseService


class ServiceContainerService(BaseService):
    def __init__(self, container_module_name: str):
        self.container_module_name = container_module_name

    @property
    def container_module(self):
        return importlib.import_module(self.container_module_name)

    @property
    def container_class(self):
        return self.container_module.Container

    @property
    def container_instance(self):
        return self.container_module.container
