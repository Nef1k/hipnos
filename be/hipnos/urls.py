from django.urls import path

from hipnos.views.memories import ListMemoryView

urlpatterns = [
    path('memories/', ListMemoryView.as_view(), name='memories-list-create')
]
