class CompilationError(Exception):
    def __init__(self, message, line=None, col=None):
        super().__init__(message)
        self.message = message
        self.line = line
        self.col = col

class LexicalError(CompilationError): pass
class SyntaxError(CompilationError): pass
class SemanticError(CompilationError): pass
class OptimizationError(CompilationError): pass
