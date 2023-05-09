from dependency_injector.wiring import Provide
from dependency_injector.wiring import inject
from django.core.management import BaseCommand

from di.containers import Container
from game_data.services.gd_path import GDPathService
from hipnos.services.reset import ResetService


class ServicedHipnosCommand(BaseCommand):
    @inject
    def __init__(
            self,
            gd_path_service: GDPathService = Provide[Container.gd_path_service],
            reset_service: ResetService = Provide[Container.reset_service],
    ):
        super().__init__()
        self.gd_path_service = gd_path_service
        self.reset_service = reset_service
