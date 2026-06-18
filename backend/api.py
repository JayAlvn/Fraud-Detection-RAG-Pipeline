from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pipeline.pipeline import ingest, answer_query
import os, shutil

app = FastAPI(title='DF-RAG API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return{
        "status": "ok"
    }

class QueryRequest(BaseModel):
    query: str
    mode: str = "naive" #defaults to naive


@app.post("/upload")
async def upload(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)
    path = os.path.join("uploads", file.filename)

    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    count = ingest(path)

    return{
        "filename":file.filename,
        "chunks_indexed":count,
    }


@app.post("/query")
def query_endpoint(request: QueryRequest):
    return answer_query(request.query, request.mode)
