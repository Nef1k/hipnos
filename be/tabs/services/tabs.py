from di.services.base import BaseSubsystem
from di.services.intro import IntroService
from tabs.services.initializers.tabs import TabInitializer


class TabSubsystem(BaseSubsystem):
    def __init__(
            self,
            intro_service: IntroService,
    ):
        self.initializer = TabInitializer(
            intro_service
        )
