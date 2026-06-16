import os
from ingestion import load_document, chunk_text
from embedding.vector_store import store_chunks, query
from generation.naive_backend import NaiveBackend


BACKENDS = {
    "naive": NaiveBackend()
}


def ingest(doc_path: str) -> int:
    text = load_document(doc_path)
    chunks = chunk_text(text)
    doc_name = os.path.basename(doc_path)
    store_chunks(chunks, doc_name)
    
    return len(chunks)


def answer_query(user_query: str, mode: str="naive") -> dict:
    if mode not in BACKENDS:
        raise ValueError(f"Uknown mode: {mode}")

    top_chunks = query(user_query)
    backend = BACKENDS[mode]

    return backend.generate(user_query, top_chunks)


def run_pipeline(doc_path: str, user_query: str,  mode: str="naive") -> dict:
    ingest(doc_path)
    return answer_query(user_query, mode)
