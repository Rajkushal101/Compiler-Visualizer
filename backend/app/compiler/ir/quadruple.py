class Quadruple:
    def __init__(self, op: str, arg1: any, arg2: any, result: any):
        self.op = op
        self.arg1 = arg1
        self.arg2 = arg2
        self.result = result

    def to_dict(self):
        return {
            "op": self.op,
            "arg1": self.arg1,
            "arg2": self.arg2,
            "result": self.result
        }

    def __str__(self):
        return f"{self.op} {self.arg1}, {self.arg2} -> {self.result}"
