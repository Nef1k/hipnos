from django.urls import path

from synergy.views.pages import PageDetailsAPI
from synergy.views.pages import PageListCreateAPI
from synergy.views.pages import UserDefaultPage
from synergy.views.pages import WidgetListCreateAPI
from synergy.views.tabs import RemoveTabAPI
from synergy.views.tabs import TabTypesListAPI

urlpatterns = [
    path(f'pages/', PageListCreateAPI.as_view(), name='synergy-list-create-page'),
    path(f'pages/user_default/', UserDefaultPage.as_view(), name='synergy-user-default-page'),
    path(f'pages/<str:page_name>/', PageDetailsAPI.as_view(), name='synergy-retrieve-page'),
    path(f'pages/<str:page_name>/create_widget/', WidgetListCreateAPI.as_view(), name='synergy-list-create-widget'),

    path(f'tabs/<int:pk>/', RemoveTabAPI.as_view(), name='synergy-remove-tab'),
    path(f'tabs/types/', TabTypesListAPI.as_view(), name='synergy-list-tab-types'),
]
