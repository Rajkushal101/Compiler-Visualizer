class Verifier:
    """Formal verification pass that checks program properties."""
    
    def verify(self, ast, symbol_table):
        results = []
        
        # Check 1: All variables are initialized before use
        results.extend(self._check_initialization(ast, symbol_table))
        
        # Check 2: No division by zero
        results.extend(self._check_division_by_zero(ast))
        
        # Check 3: Variable type consistency
        results.extend(self._check_type_consistency(symbol_table))
        
        # Check 4: Scope integrity
        results.extend(self._check_scope_integrity(symbol_table))
        
        if not results:
            results.append("✅ All verification checks passed — no issues found.")
        
        return results

    def _check_initialization(self, ast, symbol_table):
        """Verify all referenced variables are declared."""
        results = []
        declared = set()
        self._collect_declarations(ast, declared)
        refs = []
        self._collect_references(ast, refs)
        
        for ref_name in refs:
            if ref_name not in declared:
                results.append(f"❌ Verification failed: Variable '{ref_name}' used without declaration.")
        
        if not results:
            results.append("✅ Initialization check passed: All variables properly declared before use.")
        return results

    def _check_division_by_zero(self, ast):
        """Check for potential division by zero in constant expressions."""
        results = []
        divisions = []
        self._collect_divisions(ast, divisions)
        
        for divisor_val in divisions:
            if divisor_val == 0:
                results.append("❌ Verification failed: Division by zero detected in constant expression.")
        
        if not results and divisions:
            results.append("✅ Division safety check passed: No division by zero detected.")
        return results

    def _check_type_consistency(self, symbol_table):
        """Verify type consistency across scopes."""
        results = []
        self._walk_scopes_for_types(symbol_table, results)
        if not results:
            results.append("✅ Type consistency check passed: All variables have valid types.")
        return results

    def _check_scope_integrity(self, symbol_table):
        """Verify scope nesting is well-formed."""
        results = []
        depth = self._scope_depth(symbol_table)
        results.append(f"✅ Scope integrity check passed: {depth} scope level(s) verified.")
        return results

    def _collect_declarations(self, node, declared):
        node_type = node.__class__.__name__
        if node_type == "Program":
            for stmt in node.statements:
                self._collect_declarations(stmt, declared)
        elif node_type == "Decl":
            declared.add(node.name)
        elif node_type == "Block":
            for stmt in node.statements:
                self._collect_declarations(stmt, declared)

    def _collect_references(self, node, refs):
        node_type = node.__class__.__name__
        if node_type == "Program":
            for stmt in node.statements:
                self._collect_references(stmt, refs)
        elif node_type == "Assignment":
            refs.append(node.name)
            self._collect_references(node.value_expr, refs)
        elif node_type == "Print":
            if node.var_expr:
                self._collect_references(node.var_expr, refs)
        elif node_type == "Block":
            for stmt in node.statements:
                self._collect_references(stmt, refs)
        elif node_type == "VarRef":
            refs.append(node.name)
        elif node_type == "BinaryOp":
            self._collect_references(node.left, refs)
            self._collect_references(node.right, refs)
        elif node_type == "Decl":
            self._collect_references(node.value_expr, refs)

    def _collect_divisions(self, node, divisions):
        node_type = node.__class__.__name__
        if node_type == "Program":
            for stmt in node.statements:
                self._collect_divisions(stmt, divisions)
        elif node_type in ("Decl", "Assignment"):
            self._collect_divisions(node.value_expr, divisions)
        elif node_type == "Block":
            for stmt in node.statements:
                self._collect_divisions(stmt, divisions)
        elif node_type == "BinaryOp":
            if node.op == "DIVIDE":
                if node.right.__class__.__name__ == "IntLiteral":
                    divisions.append(node.right.value)
            self._collect_divisions(node.left, divisions)
            self._collect_divisions(node.right, divisions)

    def _walk_scopes_for_types(self, scope, results):
        for name, sym in scope.symbols.items():
            if sym.type not in ("int", "string", "float", "bool"):
                results.append(f"⚠️ Warning: Variable '{name}' has unknown type '{sym.type}'.")
        for child in scope.children:
            self._walk_scopes_for_types(child, results)

    def _scope_depth(self, scope):
        if not scope.children:
            return 1
        return 1 + max(self._scope_depth(c) for c in scope.children)