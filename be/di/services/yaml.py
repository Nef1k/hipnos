import oyaml as yaml

from di.services.base import BaseService
from di.services.files import FilesService


class YamlService(BaseService):
    def __init__(
            self,
            files_service: FilesService
    ):
        self.files_service = files_service

    def load_yaml(self, stream):
        return yaml.safe_load(stream)

    def load_yaml_file(self, file_path: str):
        file_contents = self.files_service.read_text_file(file_path)
        return self.load_yaml(file_contents)
