import inspect
from typing import Iterable
from typing import Type

from django.db.models import Exists
from django.db.models import OuterRef

from di.services.base import BaseInitializer
from di.services.intro import IntroService
from synergy.models import SynergyTab
from synergy.models import TabType
from tabs.base import BaseField
from tabs.base import BaseTabType


class TabInitializer(BaseInitializer):
    def __init__(
            self,
            intro_service: IntroService,
    ):
        self.intro_service = intro_service

    def initialize(self):
        tab_packages = self.intro_service.get_in_app_packages('tabs')
        classes = self.intro_service.get_classes_from_packages(
            tab_packages,
            lambda x: issubclass(x, BaseTabType) and not x.is_abstract
        )

        tab_type_instances = []
        for tab_type in classes:
            tab_type: Type[BaseTabType]

            tab_type_instances.append(TabType(
                name=tab_type.name,
                display_name=tab_type.display_name,
                fields=self._get_fields(tab_type)
            ))
        TabType.objects.bulk_create(tab_type_instances)

    def prune(self):
        TabType.objects.filter(
            ~Exists(SynergyTab.objects.filter(tab_type_id=OuterRef('id')))
        ).delete()

    def _get_fields(self, tab_type: Type[BaseTabType]) -> dict:
        fields: Iterable[BaseField] = inspect.getmembers(  # noqa
            tab_type,
        )

        return {
            field_name: field.to_json()
            for field_name, field in fields
            if isinstance(field, BaseField)
        }
