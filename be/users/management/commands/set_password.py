from getpass import getpass

from django.contrib.auth.hashers import make_password
from django.core.management import BaseCommand

from users.models import User


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)

    def handle(self, *args, **options):
        username = options['username']
        user = User.objects.get(username=username)

        new_password = getpass(f'Enter password for user {user.username}: ')
        repeated_password = getpass('Enter new password again: ')

        if new_password != repeated_password:
            print('Password do not match!')
            return

        user.password = make_password(new_password)
        user.save()

        print(f'Password set for user {user.username}({user.id})')
