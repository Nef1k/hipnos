from dependency_injector.wiring import inject

from di.services.base import BaseService
from users.models import User


class UserService(BaseService):
    @inject
    def __init__(self):
        pass

    def get_all_users(self):
        return User.objects.all()

    def get_user_permissions(self, user: User):
        return user.get_user_permissions()
