from ..ir.quadruple import Quadruple

class Optimizer:
    def optimize(self, ir):
        """Multi-pass optimization pipeline."""
        optimized = list(ir)
        optimized = self._constant_folding(optimized)
        optimized = self._dead_code_elimination(optimized)
        optimized = self._constant_propagation(optimized)
        return optimized

    def _constant_folding(self, ir):
        """Evaluate constant expressions at compile time."""
        result = []
        for quad in ir:
            if quad.op in ["PLUS", "MINUS", "MULTIPLY", "DIVIDE"]:
                try:
                    a1 = int(quad.arg1) if not isinstance(quad.arg1, int) else quad.arg1
                    a2 = int(quad.arg2) if not isinstance(quad.arg2, int) else quad.arg2
                    if quad.op == "PLUS":
                        val = a1 + a2
                    elif quad.op == "MINUS":
                        val = a1 - a2
                    elif quad.op == "MULTIPLY":
                        val = a1 * a2
                    elif quad.op == "DIVIDE":
                        val = a1 // a2 if a2 != 0 else 0
                    result.append(Quadruple("ASSIGN", val, "", quad.result))
                except (ValueError, TypeError):
                    result.append(quad)
            else:
                result.append(quad)
        return result

    def _dead_code_elimination(self, ir):
        """Remove assignments to variables that are never subsequently read."""
        used_vars = set()
        for quad in ir:
            if quad.op == "PRINT":
                if quad.arg2:
                    used_vars.add(str(quad.arg2))
            elif quad.op in ["PLUS", "MINUS", "MULTIPLY", "DIVIDE", "ASSIGN"]:
                if quad.arg1 and isinstance(quad.arg1, str) and not quad.arg1.isdigit():
                    used_vars.add(quad.arg1)
                if quad.arg2 and isinstance(quad.arg2, str) and not quad.arg2.isdigit():
                    used_vars.add(quad.arg2)

        result = []
        for quad in ir:
            if quad.op == "ASSIGN" and quad.result and quad.result not in used_vars:
                if quad.result.startswith("t"):
                    continue
            result.append(quad)
        return result

    def _constant_propagation(self, ir):
        """Propagate known constant values through the IR."""
        constants = {}
        result = []
        for quad in ir:
            if quad.op == "ASSIGN" and quad.arg2 == "":
                try:
                    val = int(quad.arg1) if not isinstance(quad.arg1, int) else quad.arg1
                    constants[quad.result] = val
                except (ValueError, TypeError):
                    if str(quad.arg1) in constants:
                        result.append(Quadruple("ASSIGN", constants[str(quad.arg1)], "", quad.result))
                        constants[quad.result] = constants[str(quad.arg1)]
                        continue
            new_arg1 = quad.arg1
            new_arg2 = quad.arg2
            if isinstance(quad.arg1, str) and quad.arg1 in constants:
                new_arg1 = constants[quad.arg1]
            if isinstance(quad.arg2, str) and quad.arg2 in constants:
                new_arg2 = constants[quad.arg2]
            result.append(Quadruple(quad.op, new_arg1, new_arg2, quad.result))
        return result
