import os

from di.services.base import BaseService
from di.services.yaml import YamlService


class GDPathService(BaseService):
    def __init__(
            self,
            game_data_root_dir: str,
            yaml_service: YamlService,
    ):
        self.game_data_root_dir = game_data_root_dir
        self.yaml_service = yaml_service

        self.cached_configs = {}

    def get_config_path(self, config_name: str):
        parts = config_name.split('.')
        parts[-1] += '.yml'
        return os.path.join(self.game_data_root_dir, *parts)

    def read_config(self, config_name: str):
        if config_name in self.cached_configs:
            return self.cached_configs[config_name]

        config_path = self.get_config_path(config_name)
        config = self.yaml_service.load_yaml_file(config_path)
        self.cached_configs[config_name] = config

        return config
