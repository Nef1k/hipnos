import os
import random
import shutil
from contextlib import contextmanager

from dependency_injector.wiring import inject

from di.services.base import BaseService


class TmpStorageService(BaseService):
    @inject
    def __init__(self, tmp_root_dir: str):
        self.tmp_root_dir = tmp_root_dir

    def get_tmp_abs_path(self) -> str:
        file_name = str(random.randint(10**10, 10**11))
        return os.path.join(os.path.abspath(self.tmp_root_dir), file_name)

    @contextmanager
    def tmp_dir(self) -> str:
        tmp_dir_name = self.get_tmp_abs_path()
        os.mkdir(tmp_dir_name)
        try:
            yield tmp_dir_name
        finally:
            shutil.rmtree(tmp_dir_name)

    @contextmanager
    def tmp_file(self, is_binary: bool = True):
        tmp_file_name = self.get_tmp_abs_path()
        open_mode = f'w{"b" if is_binary else ""}'
        try:
            with open(tmp_file_name, open_mode) as f:
                yield f
        finally:
            os.remove(tmp_file_name)
