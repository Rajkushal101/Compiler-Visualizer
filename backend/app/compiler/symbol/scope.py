from typing import Dict, List, Optional
from .symbol import Symbol

class Scope:
    def __init__(self, name: str, parent: 'Scope' = None):
        self.name = name
        self.parent = parent
        self.children: List['Scope'] = []
        self.symbols: Dict[str, Symbol] = {}

    def insert(self, symbol: Symbol):
        self.symbols[symbol.name] = symbol

    def lookup(self, name: str, current_only: bool = False) -> Optional[Symbol]:
        if name in self.symbols:
            return self.symbols[name]
        if not current_only and self.parent:
            return self.parent.lookup(name)
        return None

    def add_child(self, scope: 'Scope'):
        self.children.append(scope)

    def to_dict(self):
        return {
            "name": self.name,
            "symbols": {k: v.to_dict() for k, v in self.symbols.items()},
            "children": [c.to_dict() for c in self.children]
        }
