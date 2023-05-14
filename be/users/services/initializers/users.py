import logging
from typing import Set

from django.contrib.auth.hashers import make_password

from di.services.base import BaseInitializer
from di.services.base import BaseSubsystem
from di.utils.helpers import generate_password
from game_data.services.gd_path import GDPathService
from users.models import User


class UserInitializer(BaseInitializer):
    def __init__(
            self,
            gd_service: GDPathService,
            subsystem: BaseSubsystem,
    ):
        self.gd_service = gd_service
        self.subsystem = subsystem

    def initialize(self):
        user_data = self.gd_service.read_config('init_data.users.users')
        users: dict = user_data['users']

        user_instances = []
        for username, user in users.items():
            creds: Set[str] = set(user['creds'])
            user_password = ''
            if 'password' in creds:
                user_password = generate_password()
                logging.info(f'Generated password {user_password} for user {username}')
                user_password = make_password(user_password)
            user_instances.append(User(
                username=username,
                first_name=user.get('first_name', ''),
                last_name=user.get('last_name', ''),
                password=user_password,
            ))
        User.objects.bulk_create(user_instances)

    def prune(self):
        self.subsystem.prune_models([User])
