from di.services.base import BaseSubsystem
from hipnos.management.commands.base.subsystem_command import SubsystemCommandBase


class Command(SubsystemCommandBase):
    def execute_subsystem(self, subsystem: BaseSubsystem):
        subsystem.reset()