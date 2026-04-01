from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import compile, health

app = FastAPI(title="Compiler Visualizer API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compile.router, prefix="/api")
app.include_router(health.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
