export const formatTokenType = (type) => {
    const icons = {
        INT: 'int', PRINT: 'fn', IDENTIFIER: 'id', NUMBER: '#',
        ASSIGN: '=', SEMICOLON: ';', LBRACE: '{', RBRACE: '}',
        LPAREN: '(', RPAREN: ')', COMMA: ',', STRING: 'str',
        PLUS: '+', MINUS: '-', MULTIPLY: '*', DIVIDE: '/', EOF: 'EOF'
    };
    return icons[type] || '•';
};

export const formatIRInstruction = (quad, index) => {
    const { op, arg1, arg2, result } = quad;
    switch (op) {
        case 'ASSIGN':
            return `${result} := ${arg1}`;
        case 'PLUS':
            return `${result} := ${arg1} + ${arg2}`;
        case 'MINUS':
            return `${result} := ${arg1} - ${arg2}`;
        case 'MULTIPLY':
            return `${result} := ${arg1} × ${arg2}`;
        case 'DIVIDE':
            return `${result} := ${arg1} ÷ ${arg2}`;
        case 'PRINT':
            return `PRINT ${arg1 ? `"${arg1}"` : ''} ${arg2 || ''}`.trim();
        case 'ENTER_SCOPE':
            return '{ ENTER SCOPE';
        case 'EXIT_SCOPE':
            return '} EXIT SCOPE';
        case 'ASSERT':
            return `ASSERT(${arg1})`;
        default:
            return `${op} ${arg1}, ${arg2} → ${result}`;
    }
};

export const formatNumber = (num) => {
    if (typeof num !== 'number') return num;
    return num.toLocaleString();
};

export const truncate = (str, maxLen = 50) => {
    if (!str || str.length <= maxLen) return str;
    return str.substring(0, maxLen) + '...';
};
