from ..compiler.orchestrator import Orchestrator

class CompilerService:
    def __init__(self):
        self.orchestrator = Orchestrator()

    def process_compilation(self, source: str, flags: dict):
        result = self.orchestrator.compile(source, flags)
        return result.to_dict()
