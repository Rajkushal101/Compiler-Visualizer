from ..ir.quadruple import Quadruple

class IRGenerator:
    def __init__(self):
        self.instructions = []
        self.temp_count = 0

    def generate(self, ast):
        self.instructions = []
        self.temp_count = 0
        self._visit(ast)
        return self.instructions

    def _new_temp(self):
        self.temp_count += 1
        return f"t{self.temp_count}"

    def _visit(self, node):
        node_type = node.__class__.__name__
        if node_type == "Program":
            for stmt in node.statements:
                self._visit(stmt)
        elif node_type == "Decl":
            val = self._visit(node.value_expr)
            self.instructions.append(Quadruple("ASSIGN", val, "", node.name))
        elif node_type == "Assignment":
            val = self._visit(node.value_expr)
            self.instructions.append(Quadruple("ASSIGN", val, "", node.name))
        elif node_type == "BinaryOp":
            left = self._visit(node.left)
            right = self._visit(node.right)
            temp = self._new_temp()
            self.instructions.append(Quadruple(node.op, left, right, temp))
            return temp
        elif node_type == "Print":
            var_name = self._visit(node.var_expr) if node.var_expr else ""
            string_val = node.string_val if node.string_val else ""
            self.instructions.append(Quadruple("PRINT", string_val, var_name, ""))
        elif node_type == "Block":
            self.instructions.append(Quadruple("ENTER_SCOPE", "", "", ""))
            for stmt in node.statements:
                self._visit(stmt)
            self.instructions.append(Quadruple("EXIT_SCOPE", "", "", ""))
        elif node_type == "IntLiteral":
            return node.value
        elif node_type == "VarRef":
            return node.name
        elif node_type == "Assertion":
            self.instructions.append(Quadruple("ASSERT", node.condition, "", ""))
