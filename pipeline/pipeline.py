import os
from ingestion import load_document, chunk_text
from embedding.vector_store import store_chunks, query
from generation.naive_backend import NaiveRAG


BACKENDS = {
    "naive": NaiveRAG()
}

def run_rag_pipeline(doc_path: str, user_query: str,  mode: str="naive") -> dict:

    text = load_document(doc_path)
    chunks = chunk_text(text)
    doc_name = os.path.basename(doc_path)
    store_chunks(chunks, doc_name)
    top_chunks = query(user_query)

    if mode not in BACKENDS:
        raise ValueError(f"Unknown mode: {mode}")

    backend = BACKENDS[mode]
    
    return backend.generate(user_query, top_chunks)