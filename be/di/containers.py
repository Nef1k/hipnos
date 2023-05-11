from dependency_injector import containers
from dependency_injector import providers
from django.conf import settings

from di.services.files import FilesService
from di.services.markdown import MarkdownService
from di.services.tmp_storage_service import TmpStorageService
from di.services.yaml import YamlService
from game_data.services.gd_path import GDPathService
from hipnos.services.memory import MemoryService
from hipnos.services.program import ProgramSubsystem
from hipnos.services.reset import ResetService
from users.services.user_service import UserService


class Container(containers.DeclarativeContainer):
    config = settings

    user_service: UserService = providers.Factory(
        UserService,
    )

    tmp_storage_service: TmpStorageService = providers.Factory(
        TmpStorageService,
        tmp_root_dir=config.UPLOAD_BASE_PATH,
    )

    files_service: FilesService = providers.Factory(
        FilesService,
    )

    yaml_service: YamlService = providers.Factory(
        YamlService,
        files_service,
    )

    markdown_service: MarkdownService = providers.Factory(
        MarkdownService,
        files_service,
    )

    gd_path_service: GDPathService = providers.Singleton(
        GDPathService,
        config.GAME_DATA_DIR,
        yaml_service,
    )

    memory_service: MemoryService = providers.Factory(
        MemoryService,
        gd_path_service,
        files_service,
        markdown_service,
    )

    program_subsystem: ProgramSubsystem = providers.Factory(
        ProgramSubsystem,
        gd_path_service,
    )

    reset_service: ResetService = providers.Factory(
        ResetService,
        memory_service,
        __name__
    )


container = Container()
