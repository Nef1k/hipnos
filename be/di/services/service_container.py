import importlib

from di.services.base import BaseService
from di.services.base import BaseSubsystem
from di.services.exceptions import ServiceError
from di.services.exceptions import SubsystemError


class ServiceContainerError(ServiceError):
    pass


class ServiceInstantiationError(ServiceContainerError):
    def __init__(self, msg: str, exception: Exception):
        super(ServiceInstantiationError, self).__init__(msg)
        self.exception = exception


class SubsystemInstantiationError(ServiceInstantiationError):
    pass


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

    def get_service_instance(self, service_name: str) -> BaseService:
        try:
            service_provider = getattr(self.container_class, service_name)
        except AttributeError:
            raise ServiceContainerError(
                f'Invalid service name "{service_name}"')

        if not issubclass(service_provider.cls, BaseSubsystem):
            raise ServiceContainerError(
                f'Invalid class {service_provider.cls.__name__} '
                f'for service {service_name} class ')

        try:
            service = service_provider()
        except Exception as e:  # noqa
            raise ServiceInstantiationError(
                f'Could not instantiate service {service_name}: {str(e)}', e)

        return service

    def get_subsystem_instance(self, subsystem_name: str) -> BaseSubsystem:
        try:
            instance = self.get_service_instance(subsystem_name)
        except ServiceInstantiationError as e:
            raise SubsystemInstantiationError(str(e), e.exception)

        if not issubclass(type(instance), BaseSubsystem):
            raise ServiceContainerError(
                f'Invalid service {subsystem_name} '
                f'class {instance.__class__.__name__}')

        return instance  # noqa
