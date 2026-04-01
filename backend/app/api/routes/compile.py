from fastapi import APIRouter, HTTPException
from ..schemas.request import CompileRequest
from ...services.compiler_service import CompilerService

router = APIRouter()
compiler_service = CompilerService()

@router.post("/compile")
async def compile_code(request: CompileRequest):
    flags = request.flags.dict() if request.flags else {}
    try:
        result = compiler_service.process_compilation(request.code, flags)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
