from django.urls import path

from hipnos.views.memories import ListMemoryView
from hipnos.views.memories import RetrieveMemoryView

urlpatterns = [
    path('memories/', ListMemoryView.as_view(), name='memories-list'),
    path('memories/<int:pk>/', RetrieveMemoryView.as_view(), name='memories-details'),
]
