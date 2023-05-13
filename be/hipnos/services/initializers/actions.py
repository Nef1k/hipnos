import importlib
import inspect
import pkgutil
from typing import List
from typing import Type

from di.services.base import BaseInitializer
from di.services.base import BaseSubsystem
from hipnos.actions.base import BaseAction
from hipnos.models import HipnosAction


class ActionInitializer(BaseInitializer):
    def __init__(
            self,
            actions_root: str,
            subsystem: BaseSubsystem,
    ) -> None:
        self.actions_root = actions_root
        self.subsystem = subsystem

    def initialize(self):
        action_classes = self._get_action_classes(self.actions_root)
        instances = []
        for action_class in action_classes:
            action_name = action_class.__dict__['name']
            action_module = inspect.getmodule(action_class)
            instances.append(HipnosAction(
                name=action_name,
                module_name=action_module.__name__,
                action_class_name=action_class.__name__,
            ))
        HipnosAction.objects.bulk_create(instances)

    @staticmethod
    def _get_action_classes(root: str) -> List[Type[BaseAction]]:
        actions_root_module = importlib.import_module(root)
        action_module_refs = pkgutil.iter_modules(actions_root_module.__path__)

        actions = []
        for module_ref in action_module_refs:
            action_module_name = f'{root}.{module_ref.name}'
            action_module = importlib.import_module(action_module_name)
            module_members = inspect.getmembers(action_module)

            for module_member_name, module_member in module_members:
                if not inspect.isclass(module_member):
                    continue

                if not issubclass(module_member, BaseAction):
                    continue

                if 'abstract' in module_member.__dict__ and getattr(module_member, 'abstract'):
                    continue

                actions.append(module_member)

        return actions

    def prune(self):
        self.subsystem.prune_models([HipnosAction])
