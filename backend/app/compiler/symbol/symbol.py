class Symbol:
    def __init__(self, name: str, type_: str, value: any, is_constant: bool = False):
        self.name = name
        self.type = type_
        self.value = value
        self.is_constant = is_constant

    def to_dict(self):
        return {
            "name": self.name,
            "type": self.type,
            "value": self.value,
            "is_constant": self.is_constant
        }
