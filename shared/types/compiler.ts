export interface Token {
    type: string;
    value: any;
    line: number;
    col: number;
}

export interface Symbol {
    name: string;
    type: string;
    value: any;
    is_constant: boolean;
}

export interface Scope {
    name: string;
    symbols: Record<string, Symbol>;
    children: Scope[];
}

export interface Quadruple {
    op: string;
    arg1: any;
    arg2: any;
    result: any;
}
