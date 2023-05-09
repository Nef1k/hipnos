from di.services.base import BaseService


class FilesService(BaseService):
    def __init__(self):
        pass

    def read_text_file_as_list(self, file_path: str):
        with open(file_path) as f:
            return f.readlines()

    def read_text_file(self, file_path: str):
        return ''.join(self.read_text_file_as_list(file_path))
