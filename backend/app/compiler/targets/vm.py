from .base import TargetGenerator

class VMGenerator(TargetGenerator):
    def generate(self, ir) -> str:
        # Stack-based VM bytecode generation
        code = []
        for quad in ir:
            if quad.op == "ASSIGN":
                code.append(f"PUSH {quad.arg1}")
                code.append(f"STORE {quad.result}")
            elif quad.op == "PRINT":
                if quad.arg1:
                    code.append(f"PRINT_STR \"{quad.arg1}\"")
                if quad.arg2:
                    code.append(f"LOAD {quad.arg2}")
                    code.append(f"PRINT_INT")
            elif quad.op in ["ENTER_SCOPE", "EXIT_SCOPE"]:
                code.append(quad.op)
        return "\n".join(code)
