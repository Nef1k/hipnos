import clipboard
from dependency_injector.wiring import Provide
from django.core.management import BaseCommand
from pyperclip import PyperclipException

from di.containers import Container
from users.services.users import UserSubsystem


class Command(BaseCommand):
    def __init__(
            self,
            user_subsystem: UserSubsystem = Provide[Container.user_subsystem],
    ):
        super().__init__()
        self.user_subsystem = user_subsystem

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)

    def handle(self, *args, **options):
        user = self.user_subsystem.get_user_by_name(options['username'])

        access_token = self.user_subsystem.generate_access_token(user)

        print(f'Access token for user {user.username}: {access_token}')

        try:
            clipboard.copy(access_token)
            print(f'Token copied to clipboard!')
        except PyperclipException:
            print(f'Could not copy token to clipboard :c')
