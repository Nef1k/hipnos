import importlib
import inspect
import logging
import pkgutil
from typing import List
from typing import Type

from django.db import transaction

from di.services.base import BaseSubsystem
from di.services.service_container import ServiceContainerService
from di.utils.helpers import build_action_execution
from hipnos.actions.base import BaseAction
from hipnos.models import HipnosAction
from hipnos.models import PhraseAction


class ActionSubsystem(BaseSubsystem):
    def __init__(
            self,
            actions_root: str,
            sc_service: ServiceContainerService,
    ):
        self.actions_root = actions_root
        self.sc_service = sc_service

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
        self.prune_models([HipnosAction])

    def get_action_info_instance(self, action_name: str) -> HipnosAction:
        return HipnosAction.objects.get(name=action_name)

    def get_action_class(self, action_name: str) -> Type[BaseAction]:
        action_info_instance = HipnosAction.objects.get(name=action_name)
        action_module = importlib.import_module(action_info_instance.module_name)
        return getattr(action_module, action_info_instance.action_class_name)

    def instantiate_action(self, action_name: str) -> BaseAction:
        action_class = self.get_action_class(action_name)

        self.sc_service.container_instance.wire(modules=[
            action_class.__module__
        ])

        return action_class()

    def get_action_by_name(self, action_name: str) -> HipnosAction:
        return HipnosAction.objects.get(name=action_name)

    def instantiate_phrase_action(
            self,
            action_name: str,
            args: list = None,
            kwargs: dict = None,
            order_key: int = None,
    ) -> PhraseAction:
        action = self.get_action_by_name(action_name)
        return PhraseAction(
            action=action,
            args=args or [],
            kwargs=kwargs or {},
            order_key=order_key
        )

    def execute_action(self, action_name: str, *args, **kwargs):
        action = self.instantiate_action(action_name)

        with transaction.atomic():
            execution_result = action.execute(*args, **kwargs)

        logging.info(
            f'Executing action '
            f'{build_action_execution(action_name, args, kwargs, execution_result)}'
        )
        # TODO: emit event upon action execution

    def execute_action_by_info(self, action_info_instance: PhraseAction):
        action_name = action_info_instance.action.name
        args = action_info_instance.args
        kwargs = action_info_instance.kwargs

        self.execute_action(action_name, *args, **kwargs)
