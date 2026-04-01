from ..ast.statements import Program, Decl, Print, Block, Assignment
from ..ast.expressions import IntLiteral, VarRef, BinaryOp
from ..utils.errors import SyntaxError
from .lexical import TokenType

class Parser:
    def __init__(self):
        self.tokens = []
        self.pos = 0

    def parse(self, tokens):
        self.tokens = tokens
        self.pos = 0
        statements = []
        while not self._is_at_end():
            statements.append(self._parse_statement())
        return Program(statements)

    def _parse_statement(self):
        if self._match(TokenType.INT):
            return self._parse_declaration()
        if self._match(TokenType.PRINT):
            return self._parse_print()
        if self._match(TokenType.IDENTIFIER):
            # Assignment
            name = self._previous().value
            self._consume(TokenType.ASSIGN, "Expected '=' after variable name.")
            value_expr = self._parse_expression()
            self._consume(TokenType.SEMICOLON, "Expected ';' after assignment.")
            return Assignment(name, value_expr)
        if self._match(TokenType.LBRACE):
            return self._parse_block()
        raise SyntaxError(f"Unexpected token {self._peek().type.name} at line {self._peek().line}")

    def _parse_declaration(self):
        name = self._consume(TokenType.IDENTIFIER, "Expected variable name.").value
        self._consume(TokenType.ASSIGN, "Expected '=' after variable name.")
        value_expr = self._parse_expression()
        self._consume(TokenType.SEMICOLON, "Expected ';' after declaration.")
        return Decl(name, value_expr)

    def _parse_print(self):
        self._consume(TokenType.LPAREN, "Expected '(' after print.")
        string_val = None
        if self._match(TokenType.STRING):
            string_val = self._previous().value
            if self._match(TokenType.COMMA):
                pass
        var_expr = self._parse_expression()
        self._consume(TokenType.RPAREN, "Expected ')' after print arguments.")
        self._consume(TokenType.SEMICOLON, "Expected ';' after print statement.")
        return Print(string_val, var_expr)

    def _parse_block(self):
        statements = []
        while not self._check(TokenType.RBRACE) and not self._is_at_end():
            statements.append(self._parse_statement())
        self._consume(TokenType.RBRACE, "Expected '}' after block.")
        return Block(statements)

    def _parse_expression(self):
        expr = self._parse_term()
        while self._match(TokenType.PLUS, TokenType.MINUS, TokenType.MULTIPLY, TokenType.DIVIDE):
            op = self._previous().type.name
            right = self._parse_term()
            expr = BinaryOp(expr, op, right)
        return expr

    def _parse_term(self):
        if self._match(TokenType.NUMBER):
            return IntLiteral(self._previous().value)
        if self._match(TokenType.IDENTIFIER):
            return VarRef(self._previous().value)
        raise SyntaxError(f"Expected expression at line {self._peek().line}")

    # Helper methods
    def _match(self, *types):
        for t in types:
            if self._check(t):
                self._advance()
                return True
        return False

    def _check(self, type_):
        if self._is_at_end(): return False
        return self._peek().type == type_

    def _advance(self):
        if not self._is_at_end(): self.pos += 1
        return self._previous()

    def _is_at_end(self):
        return self._peek().type == TokenType.EOF

    def _peek(self):
        return self.tokens[self.pos]

    def _previous(self):
        return self.tokens[self.pos - 1]

    def _consume(self, type_, message):
        if self._check(type_): return self._advance()
        raise SyntaxError(message)
