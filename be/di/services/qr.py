import os
from typing import Optional

from amzqr import amzqr

from di.services.base import BaseService


class QRService(BaseService):
    def __init__(self):
        pass

    def generate_general_qr(
            self,
            data: str,
            path: str,
            logo_path: Optional[str] = None
    ) -> tuple:
        abs_p = os.path.abspath(path)
        file_name = os.path.basename(abs_p)
        directory = os.path.dirname(abs_p)
        return amzqr.run(
            words=data.replace('\"', '\''),
            version=10,
            level='H',
            picture=logo_path,
            colorized=False,
            contrast=1.0,
            brightness=1.0,
            save_name=file_name,
            save_dir=directory,
        )
