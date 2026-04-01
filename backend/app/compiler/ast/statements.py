from .base import ASTNode

class Program(ASTNode):
    def __init__(self, statements):
        self.statements = statements
    def to_dict(self):
        return {"type": "Program", "statements": [s.to_dict() for s in self.statements]}

class Decl(ASTNode):
    def __init__(self, name, value_expr):
        self.name = name
        self.value_expr = value_expr
    def to_dict(self):
        return {"type": "Decl", "name": self.name, "value": self.value_expr.to_dict()}

class Print(ASTNode):
    def __init__(self, string_val, var_expr):
        self.string_val = string_val
        self.var_expr = var_expr
    def to_dict(self):
        return {"type": "Print", "string_val": self.string_val, "var_expr": self.var_expr.to_dict() if self.var_expr else None}

class Block(ASTNode):
    def __init__(self, statements):
        self.statements = statements
    def to_dict(self):
        return {"type": "Block", "statements": [s.to_dict() for s in self.statements]}

class Assignment(ASTNode):
    def __init__(self, name, value_expr):
        self.name = name
        self.value_expr = value_expr
    def to_dict(self):
        return {"type": "Assignment", "name": self.name, "value": self.value_expr.to_dict()}
