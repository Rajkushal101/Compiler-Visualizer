from .phases.lexical import LexicalAnalyzer
from .phases.syntax import Parser
from .phases.semantic import SemanticAnalyzer
from .phases.ir import IRGenerator
from .phases.optimizer import Optimizer
from .phases.codegen import CodeGenerator
from .passes.self_documenting import DocumentationGenerator
from .passes.verification import Verifier
from .passes.probabilistic import ProbabilisticExecutor
from .utils.errors import CompilationError

class CompilationResult:
    def __init__(self):
        self.tokens = []
        self.ast = None
        self.symbol_table = None
        self.ir = []
        self.optimized_ir = []
        self.target_code = ""
        self.errors = []
        self.documentation = ""
        self.verification_results = []
        self.probabilistic_output = {}

    def to_dict(self):
        return {
            "tokens": [t.to_dict() for t in self.tokens] if self.tokens else [],
            "ast": self.ast.to_dict() if self.ast else None,
            "symbol_table": self.symbol_table.to_dict() if self.symbol_table else None,
            "ir": [quad.to_dict() for quad in self.ir] if self.ir else [],
            "optimized_ir": [quad.to_dict() for quad in self.optimized_ir] if self.optimized_ir else [],
            "target_code": self.target_code,
            "errors": [str(e) for e in self.errors],
            "documentation": self.documentation,
            "verification_results": self.verification_results,
            "probabilistic_output": self.probabilistic_output
        }

class Orchestrator:
    def compile(self, source: str, flags: dict):
        result = CompilationResult()
        print("\n" + "="*50)
        print("[COMPILER] Starting Compilation Pipeline...")
        print("="*50)
        try:
            # 1. Lexical
            print("[1/6] Running Lexical Analysis...")
            lexer = LexicalAnalyzer()
            result.tokens = lexer.analyze(source)
            print(f"      -> Success: {len(result.tokens)} tokens generated.")
            
            # 2. Syntax
            print("[2/6] Running Syntax Analysis (Parsing)...")
            parser = Parser()
            result.ast = parser.parse(result.tokens)
            print("      -> Success: Abstract Syntax Tree (AST) constructed.")
            
            # 3. Semantic
            print("[3/6] Running Semantic Analysis & Symbol Table Generation...")
            semantic = SemanticAnalyzer()
            result.symbol_table = semantic.analyze(result.ast)
            print("      -> Success: Scopes nested and Symbol Table linked.")
            
            # 4. IR
            print("[4/6] Generating Intermediate Representation (IR)...")
            ir_gen = IRGenerator()
            result.ir = ir_gen.generate(result.ast)
            print(f"      -> Success: {len(result.ir)} Three-Address Code (TAC) instructions created.")
            
            # 5. Optimization
            print("[5/6] Running Code Optimization...")
            if flags.get("optimization_level", 0) > 0:
                optimizer = Optimizer()
                result.optimized_ir = optimizer.optimize(result.ir)
                saved = len(result.ir) - len(result.optimized_ir)
                print(f"      -> Success: IR optimized ({len(result.optimized_ir)} instructions, {saved} eliminated).")
            else:
                result.optimized_ir = list(result.ir)
                print("      -> Skipped: Optimization disabled by flags.")
            
            # 6. Target Code Gen
            print("[6/6] Generating Target Machine Code (MIPS)...")
            codegen = CodeGenerator(target="mips")
            ir_to_eval = result.optimized_ir if result.optimized_ir else result.ir
            result.target_code = codegen.generate(ir_to_eval)
            print("      -> Success: MIPS Assembly code ready.")
            
            # Optional Passes
            print("[INFO] Running Optional Passes (If Enabled)...")
            if flags.get("documentation"):
                doc_gen = DocumentationGenerator()
                opt_log = ["Constant Folding", "Dead Code Elimination", "Constant Propagation"] if flags.get("optimization_level", 0) > 0 else []
                result.documentation = doc_gen.generate(result.ast, result.symbol_table, opt_log, source, result.target_code)
                print("      -> Success: Self-Documentation Generated.")
                
            if flags.get("verification"):
                verifier = Verifier()
                result.verification_results = verifier.verify(result.ast, result.symbol_table)
                print("      -> Success: Formal Verification complete.")

            if flags.get("probabilistic"):
                prob_exec = ProbabilisticExecutor()
                result.probabilistic_output = prob_exec.execute(result.ast, result.symbol_table)
                print("      -> Success: Probabilistic Execution analysis complete.")
                
            print("="*50)
            print("[COMPILER] Compilation Finished Successfully!")
            print("="*50 + "\n")
                
        except CompilationError as e:
            error_msg = f"CompilationError: {e.message} at line {e.line}, col {e.col}"
            result.errors.append(error_msg)
            print(f"\n[ERROR] {error_msg}")
        except Exception as e:
            error_msg = f"SystemError: {str(e)}"
            result.errors.append(error_msg)
            print(f"\n[CRITICAL ERROR] {error_msg}")
            
        return result
