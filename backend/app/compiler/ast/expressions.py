from .base import ASTNode

class IntLiteral(ASTNode):
    def __init__(self, value):
        self.value = value
    def to_dict(self):
        return {"type": "IntLiteral", "value": self.value}

class VarRef(ASTNode):
    def __init__(self, name):
        self.name = name
    def to_dict(self):
        return {"type": "VarRef", "name": self.name}

class BinaryOp(ASTNode):
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right
    def to_dict(self):
        return {
            "type": "BinaryOp",
            "op": self.op,
            "left": self.left.to_dict() if self.left else None,
            "right": self.right.to_dict() if self.right else None
        }
