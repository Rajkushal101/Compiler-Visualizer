class ASTNode:
    def to_dict(self):
        return {"type": self.__class__.__name__}
