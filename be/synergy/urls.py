from django.urls import path

from synergy.views.pages import PageListCreateAPI
from synergy.views.test import SynergyTestAPI

urlpatterns = [
    path(f'test/', SynergyTestAPI.as_view(), name='synergy-test-api'),
    path(f'pages/', PageListCreateAPI.as_view(), name='synergy-list-create-page'),
]
