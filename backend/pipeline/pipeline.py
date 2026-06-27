import os

from ingestion import load_document, chunk_text, clean_text
from embedding.vector_store import store_chunks, query

from generation.naive_backend import NaiveBackend
from generation.basic_backend import BasicBackend

BACKENDS = {
    "naive": NaiveBackend(),
    "basic": BasicBackend()
}

def ingest(doc_path: str) -> int:
    text = load_document(doc_path)
    text = clean_text(text)
    chunks = chunk_text(text)
    doc_name = os.path.basename(doc_path)
    store_chunks(chunks, doc_name)    
    return len(chunks)


def _calculate_relevance_score(distance: float) -> float:
    return round (1 / (1 + distance), 3)

def answer_query(user_query: str, mode: str = "basic", source: str | None = None) -> dict:
    if mode not in BACKENDS:
        raise ValueError(f"Unknown mode: {mode}")

    top_chunks, distances = query(user_query, source=source)

    result = BACKENDS[mode].generate(user_query, top_chunks)
    
    result["retrieval"] = [
        {"source": f"Source {index + 1}", "score": _calculate_relevance_score(dist)}
        for index, dist in enumerate(distances)
    ]
    return result

def run_pipeline(doc_path: str, user_query: str,  mode: str="basic") -> dict:
    ingest(doc_path)
    return answer_query(user_query, mode)


