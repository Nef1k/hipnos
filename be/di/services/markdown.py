from di.services.base import BaseService
from di.services.files import FilesService


class MarkdownService(BaseService):
    def __init__(
            self,
            files_service: FilesService,
    ):
        self.files_service = files_service

    def markdown_to_html(self, markdown: str) -> str:
        return 'Markdown rendering is not implemented yet'

    def markdown_file_to_html(self, file_path: str) -> str:
        markdown = self.files_service.read_text_file(file_path)
        return self.markdown_to_html(markdown)
