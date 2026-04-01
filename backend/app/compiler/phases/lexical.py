import re
from enum import Enum
from typing import List, Any
from ..utils.errors import LexicalError

class TokenType(Enum):
    INT = 'INT'
    PRINT = 'PRINT'
    IDENTIFIER = 'IDENTIFIER'
    NUMBER = 'NUMBER'
    ASSIGN = 'ASSIGN'
    SEMICOLON = 'SEMICOLON'
    LBRACE = 'LBRACE'
    RBRACE = 'RBRACE'
    LPAREN = 'LPAREN'
    RPAREN = 'RPAREN'
    COMMA = 'COMMA'
    STRING = 'STRING'
    PLUS = 'PLUS'
    MINUS = 'MINUS'
    MULTIPLY = 'MULTIPLY'
    DIVIDE = 'DIVIDE'
    EOF = 'EOF'

class Token:
    def __init__(self, type_: TokenType, value: Any, line: int, col: int):
        self.type = type_
        self.value = value
        self.line = line
        self.col = col

    def __repr__(self):
        return f"Token({self.type.name}, {repr(self.value)}, line={self.line}, col={self.col})"
        
    def to_dict(self):
        return {
            "type": self.type.name,
            "value": self.value,
            "line": self.line,
            "col": self.col
        }

class LexicalAnalyzer:
    def __init__(self):
        self.rules = [
            (r'^\s+', None),  # Whitespace
            (r'^\/\/.*', None),  # Comments
            (r'^int\b', TokenType.INT),
            (r'^print\b', TokenType.PRINT),
            (r'^[a-zA-Z_]\w*', TokenType.IDENTIFIER),
            (r'^\d+', TokenType.NUMBER),
            (r'^=', TokenType.ASSIGN),
            (r'^;', TokenType.SEMICOLON),
            (r'^\{', TokenType.LBRACE),
            (r'^\}', TokenType.RBRACE),
            (r'^\(', TokenType.LPAREN),
            (r'^\)', TokenType.RPAREN),
            (r'^,', TokenType.COMMA),
            (r'^\+', TokenType.PLUS),
            (r'^\-', TokenType.MINUS),
            (r'^\*', TokenType.MULTIPLY),
            (r'^\/', TokenType.DIVIDE),
            (r'^"[^"]*"', TokenType.STRING),
        ]

    def analyze(self, source: str) -> List[Token]:
        tokens = []
        line = 1
        col = 1
        pos = 0
        
        while pos < len(source):
            match = None
            for pattern, token_type in self.rules:
                regex = re.compile(pattern)
                match = regex.search(source[pos:])
                if match:
                    text = match.group(0)
                    if token_type:
                        val = text
                        if token_type == TokenType.NUMBER:
                            val = int(text)
                        elif token_type == TokenType.STRING:
                            val = text[1:-1] # strip quotes
                        tokens.append(Token(token_type, val, line, col))
                    
                    # Update line and col
                    lines_in_text = text.split('\n')
                    if len(lines_in_text) > 1:
                        line += len(lines_in_text) - 1
                        col = len(lines_in_text[-1]) + 1
                    else:
                        col += len(text)
                        
                    pos += len(text)
                    break
            
            if not match:
                raise LexicalError(f"Unexpected character '{source[pos]}' at line {line}, col {col}", line, col)
                
        tokens.append(Token(TokenType.EOF, "EOF", line, col))
        return tokens
