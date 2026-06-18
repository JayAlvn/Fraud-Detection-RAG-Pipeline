from generation.base import Base


class NaiveBackend(Base):

    def generate(self, query: str, chunks: list[str]) -> dict:
        formatted = [f"Source {i + 1}: {chunk}" for i, chunk in enumerate(chunks)]
        sources_text = "\n\n".join(formatted)
        finding = f"Retrieved {len(chunks)} relevant passages for query: '{query}'\n\n{sources_text}"

        return {
            "finding": finding,
            "sources": chunks,
            "confidence": 0.0,
            "mode": "semantic search (retrieval only)",
        }
