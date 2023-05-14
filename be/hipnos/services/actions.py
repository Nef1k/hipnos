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
from hipnos.services.initializers.actions import ActionInitializer
from notifications.services.notifications import NotificationSubsystem


class ActionSubsystem(BaseSubsystem):
    def __init__(
            self,
            actions_root: str,
            sc_service: ServiceContainerService,
            notification_subsystem: NotificationSubsystem,
    ):
        self.actions_root = actions_root
        self.sc_service = sc_service
        # TODO: replace this with event service
        self.notification_subsystem = notification_subsystem

        self.initializer = ActionInitializer(
            self.actions_root,
            self,
        )

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

        self.notification_subsystem.broadcast('update motherfucker')

    def execute_action_by_info(self, action_info_instance: PhraseAction):
        action_name = action_info_instance.action.name
        args = action_info_instance.args
        kwargs = action_info_instance.kwargs

        self.execute_action(action_name, *args, **kwargs)
