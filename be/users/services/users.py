from django.db.models import QuerySet
from rest_framework_simplejwt.tokens import RefreshToken

from di.services.base import BaseSubsystem
from game_data.services.gd_path import GDPathService
from users.models import User
from users.services.initializers.users import UserInitializer


class UserSubsystem(BaseSubsystem):
    def __init__(
            self,
            gd_service: GDPathService,
    ):
        self.gd_service = gd_service

        self.initializer = UserInitializer(
            gd_service=gd_service,
            subsystem=self,
        )

    def get_user_by_name(self, username: str) -> User:
        return User.objects.get(username=username)

    def get_all_users(self) -> QuerySet[User]:
        return User.objects.all()

    def get_user_permissions(self, user: User):
        return user.get_user_permissions()

    def generate_access_token(self, user: User) -> str:
        refresh = RefreshToken.for_user(user)
        return refresh.access_token
