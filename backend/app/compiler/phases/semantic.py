from ..symbol.scope import Scope
from ..symbol.symbol import Symbol
from ..utils.errors import SemanticError

class SemanticAnalyzer:
    def __init__(self):
        self.global_scope = Scope("global")
        self.current_scope = self.global_scope
        self.scope_counter = 1

    def analyze(self, ast):
        self.global_scope = Scope("global")
        self.current_scope = self.global_scope
        self.scope_counter = 1
        self._visit(ast)
        return self.global_scope

    def _enter_scope(self, name: str):
        new_scope = Scope(name, parent=self.current_scope)
        self.current_scope.add_child(new_scope)
        self.current_scope = new_scope

    def _exit_scope(self):
        if self.current_scope.parent:
            self.current_scope = self.current_scope.parent

    def _visit(self, node):
        node_type = node.__class__.__name__
        if node_type == "Program":
            for stmt in node.statements:
                self._visit(stmt)
        elif node_type == "Decl":
            if self.current_scope.lookup(node.name, current_only=True):
                raise SemanticError(f"Variable '{node.name}' already declared in current scope.")
            val = self._visit(node.value_expr)
            self.current_scope.insert(Symbol(node.name, "int", val))
        elif node_type == "Print":
            if node.var_expr:
                self._visit(node.var_expr)
        elif node_type == "Block":
            self._enter_scope(f"block_{self.scope_counter}")
            self.scope_counter += 1
            for stmt in node.statements:
                self._visit(stmt)
            self._exit_scope()
        elif node_type == "Assignment":
            sym = self.current_scope.lookup(node.name)
            if not sym:
                raise SemanticError(f"Undefined variable '{node.name}'")
            val = self._visit(node.value_expr)
            sym.value = val # update symbol value
            return val
        elif node_type == "BinaryOp":
            left_val = self._visit(node.left)
            right_val = self._visit(node.right)
            if left_val is None or right_val is None:
                return 0
            if node.op == "PLUS": return left_val + right_val
            if node.op == "MINUS": return left_val - right_val
            if node.op == "MULTIPLY": return left_val * right_val
            if node.op == "DIVIDE": return left_val // right_val if right_val != 0 else 0
        elif node_type == "IntLiteral":
            return node.value
        elif node_type == "VarRef":
            sym = self.current_scope.lookup(node.name)
            if not sym:
                raise SemanticError(f"Undefined variable '{node.name}'")
            return sym.value
        else:
            raise SemanticError(f"Unknown AST node type: {node_type}")
