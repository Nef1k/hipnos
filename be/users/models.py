from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    @classmethod
    def get_anonymous(cls):
        return cls(
            id=-999,
            username='anonymous',
            first_name='Jon',
            last_name='Doe',
            email='noreply@example.com'
        )
