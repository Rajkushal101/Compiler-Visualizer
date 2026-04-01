from .base import TargetGenerator

class MIPSGenerator(TargetGenerator):
    def generate(self, ir) -> str:
        code = [".data", "    newline: .asciiz \"\\n\"", ".text", ".globl main", "main:"]
        
        for quad in ir:
            if quad.op == "ASSIGN":
                code.append(f"    # {quad.result} = {quad.arg1}")
                code.append(f"    li $t0, {quad.arg1}")
                # For simplicity, simulating storing to a generic register or stack
            elif quad.op in ["PLUS", "MINUS", "MULTIPLY", "DIVIDE"]:
                code.append(f"    # {quad.result} = {quad.arg1} {quad.op} {quad.arg2}")
                code.append(f"    li $t1, {quad.arg1}")
                code.append(f"    li $t2, {quad.arg2}")
                if quad.op == "PLUS":
                    code.append(f"    add $t0, $t1, $t2")
                elif quad.op == "MINUS":
                    code.append(f"    sub $t0, $t1, $t2")
                elif quad.op == "MULTIPLY":
                    code.append(f"    mul $t0, $t1, $t2")
                elif quad.op == "DIVIDE":
                    code.append(f"    div $t1, $t2")
                    code.append(f"    mflo $t0")
            elif quad.op == "PRINT":
                code.append(f"    # print {quad.arg1} {quad.arg2}")
                if quad.arg1:
                    # In a full compiler, we'd add strings to .data and print them
                    pass
                if quad.arg2:
                    code.append(f"    li $v0, 1")
                    code.append(f"    # load {quad.arg2} into $a0 (omitted simplistic)")
                    code.append(f"    syscall")
                code.append(f"    li $v0, 4")
                code.append(f"    la $a0, newline")
                code.append(f"    syscall")
            elif quad.op == "ENTER_SCOPE":
                code.append(f"    # ENTER_SCOPE")
            elif quad.op == "EXIT_SCOPE":
                code.append(f"    # EXIT_SCOPE")
                
        code.append("    li $v0, 10")
        code.append("    syscall")
        return "\n".join(code)
