class NamedModelMixin:
    def __str__(self):
        return f'<{type(self).__name__} {self.name}>'
