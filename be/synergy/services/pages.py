from typing import Optional

from django.db import transaction

from di.services.base import BaseService
from synergy.models import DefaultUserPage
from synergy.models import SynergyPage
from users.models import User


class PageError(Exception):
    pass


class PageNotExists(PageError):
    pass


class DefaultPageNotSet(PageError):
    pass


class PageService(BaseService):
    def __init__(self):
        pass

    @staticmethod
    def get_page(page_id: int) -> SynergyPage:
        try:
            page = SynergyPage.objects.get(pk=page_id)
        except SynergyPage.DoesNotExist:
            raise PageNotExists(f'Page #{page_id} does not exists')
        return page

    @staticmethod
    def get_user_default_page(user: User) -> Optional[DefaultUserPage]:
        try:
            page = DefaultUserPage.objects.select_related('page').get(user=user)
        except DefaultUserPage.DoesNotExist:
            raise DefaultPageNotSet(f'Default page not set for user {user.username}')
        return page

    @staticmethod
    def get_page_by_name(page_name: str) -> Optional[SynergyPage]:
        try:
            tab = SynergyPage.objects.get(name=page_name)
        except SynergyPage.DoesNotExist:
            raise PageNotExists(f'Could not retrieve page with name "{page_name}"')
        return tab

    @transaction.atomic
    def set_user_default_page(self, user: User, page: SynergyPage):
        try:
            page_instance = DefaultUserPage.objects.get(user=user)
        except DefaultUserPage.DoesNotExist:
            page_instance = DefaultUserPage(user=user)

        page_instance.page = page
        page_instance.save()

        return page_instance
