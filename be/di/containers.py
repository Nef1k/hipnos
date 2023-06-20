from dependency_injector import containers
from dependency_injector import providers
from django.conf import settings

from di.services.files import FilesService
from di.services.markdown import MarkdownService
from di.services.qr import QRService
from di.services.service_container import ServiceContainerService
from di.services.tmp_storage_service import TmpStorageService
from di.services.yaml import YamlService
from game_data.services.gd_path import GDPathService
from hipnos.services.HQR import HQRSubsystem
from hipnos.services.actions import ActionSubsystem
from hipnos.services.events import EventSubsystem
from hipnos.services.memory import MemoryService
from hipnos.services.phrases import PhraseSubsystem
from hipnos.services.program import ProgramSubsystem
from hipnos.services.reset import ResetService
from notifications.services.notifications import NotificationSubsystem
from synergy.services.pages import PageService
from users.services.users import UserSubsystem


class Container(containers.DeclarativeContainer):
    config = settings

    qr_service: QRService = providers.Factory(
        QRService,
    )

    sc_service: ServiceContainerService = providers.Factory(
        ServiceContainerService,
        __name__,
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
        config.HIPNOS_GAME_DATA_DIR,
        yaml_service,
    )

    user_subsystem: UserSubsystem = providers.Factory(
        UserSubsystem,
        gd_path_service,
    )

    notification_subsystem: NotificationSubsystem = providers.Singleton(
        NotificationSubsystem,
        gd_path_service,
    )

    event_subsystem: EventSubsystem = providers.Singleton(
        EventSubsystem,
        config.HIPNOS_EVENTS_BACKUP_DIR,
        notification_subsystem,
    )

    page_service: PageService = providers.Factory(
        PageService,
    )

    memory_service: MemoryService = providers.Factory(
        MemoryService,
        gd_path_service,
        files_service,
        markdown_service,
    )

    actions_subsystem: ActionSubsystem = providers.Factory(
        ActionSubsystem,
        config.HIPNOS_ACTIONS_ROOT,
        sc_service,
        event_subsystem,
    )

    phrase_subsystem: PhraseSubsystem = providers.Factory(
        PhraseSubsystem,
        gd_path_service,
        actions_subsystem,
    )

    program_subsystem: ProgramSubsystem = providers.Factory(
        ProgramSubsystem,
        gd_path_service,
        actions_subsystem,
        phrase_subsystem,
    )

    hqr_subsystem: HQRSubsystem = providers.Factory(
        HQRSubsystem,
        config.HIPNOS_QR_OUTPUT_DIR,
        config.HIPNOS_QR_LOGOS_DIR,
        gd_path_service,
        qr_service,
        memory_service,
    )

    reset_service: ResetService = providers.Factory(
        ResetService,
        sc_service,
    )


container = Container()
