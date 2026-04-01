class Visualizer:
    def to_text(self, scope, prefix=""):
        res = f"{prefix}{scope.name}\n"
        for sym in scope.symbols.values():
            val_str = sym.value if sym.value is not None else 'null'
            res += f"{prefix}  {sym.name} ({sym.type}) = {val_str}\n"
        for i, child in enumerate(scope.children):
            is_last = (i == len(scope.children) - 1)
            connector = "└── " if is_last else "├── "
            res += self.to_text(child, prefix + ("    " if is_last else "│   "))
        return res
