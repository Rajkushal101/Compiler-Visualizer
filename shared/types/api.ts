import { Token, Scope, Quadruple } from './compiler';

export interface CompileRequest {
    code: string;
    flags?: {
        documentation?: boolean;
        probabilistic?: boolean;
        verification?: boolean;
        optimization_level?: number;
    };
}

export interface CompileResponse {
    tokens: Token[];
    ast: any;
    symbol_table: Scope;
    ir: Quadruple[];
    optimized_ir: Quadruple[];
    target_code: string;
    errors: string[];
    documentation: string;
    verification_results: string[];
    probabilistic_output: any;
}
