from django.urls import path

from hipnos.views.events import EventsListView
from hipnos.views.memories import ListMemoryView
from hipnos.views.memories import RetrieveMemoryView
from hipnos.views.programs import ProgramListView
from hipnos.views.programs import SubmitPhraseView

urlpatterns = [
    path('memories/', ListMemoryView.as_view(), name='memories-list'),
    path('memories/<int:pk>/', RetrieveMemoryView.as_view(), name='memories-details'),

    path('programs/', ProgramListView.as_view(), name='program-list'),
    path('programs/phrase/', SubmitPhraseView.as_view(), name='phrase-submit'),

    path('events/', EventsListView.as_view(), name='event-list'),
]
