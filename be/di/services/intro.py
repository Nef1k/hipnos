import importlib
import inspect
import os
from pkgutil import ModuleInfo
from pkgutil import iter_modules
from types import ModuleType
from typing import Callable
from typing import Dict
from typing import List
from typing import Type

from django.conf import settings

from di.services.base import BaseService


class IntroService(BaseService):
    def __init__(
            self,
    ):
        pass

    def get_app_modules(self):
        result = []
        for app in settings.INSTALLED_APPS:
            result.append(importlib.import_module(app))

        return result

    def get_in_app_packages(self, package_name) -> Dict[str, ModuleInfo]:
        app_modules = self.get_app_modules()
        result = {}
        for module in app_modules:
            members = iter_modules([module.__name__])
            desired_module = list(filter(lambda x: x.ispkg and x.name == package_name, members))
            if desired_module:
                result[module.__name__] = desired_module[0]

        return result

    def get_modules_from_package(self, package: ModuleInfo) -> List[ModuleType]:
        package_full_path = os.path.join(package.module_finder.path, package.name)
        modules = iter_modules([package_full_path])
        result = []
        for module_info in modules:  # noqa
            if module_info.ispkg:
                continue

            module_spec = module_info.module_finder.find_spec(module_info.name)
            result.append(module_spec.loader.load_module())  # noqa

        return result

    def get_classes_from_packages(
            self,
            packages: Dict[str, ModuleInfo],
            pred: Callable[[Type], bool] = lambda x: True,
    ) -> List[Type]:
        result = []

        for app_name, package in packages.items():
            for module in self.get_modules_from_package(package):
                for _, member in inspect.getmembers(module):
                    if inspect.isclass(member) and pred(member):
                        result.append(member)

        return result
