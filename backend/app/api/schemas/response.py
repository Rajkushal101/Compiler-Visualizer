from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class TokenResponse(BaseModel):
    type: str
    value: Any
    line: int
    col: int

class QuadrupleResponse(BaseModel):
    op: str
    arg1: Any
    arg2: Any
    result: Any

class CompileResponse(BaseModel):
    tokens: List[TokenResponse] = []
    ast: Optional[Dict] = None
    symbol_table: Optional[Dict] = None
    ir: List[QuadrupleResponse] = []
    optimized_ir: List[QuadrupleResponse] = []
    target_code: str = ""
    errors: List[str] = []
    documentation: str = ""
    verification_results: List[str] = []
    probabilistic_output: Optional[Dict] = None
