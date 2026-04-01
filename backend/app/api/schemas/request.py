from pydantic import BaseModel
from typing import Optional, Dict

class CompileFlagSchema(BaseModel):
    documentation: Optional[bool] = False
    probabilistic: Optional[bool] = False
    verification: Optional[bool] = False
    optimization_level: Optional[int] = 1

class CompileRequest(BaseModel):
    code: str
    flags: Optional[CompileFlagSchema] = CompileFlagSchema()
