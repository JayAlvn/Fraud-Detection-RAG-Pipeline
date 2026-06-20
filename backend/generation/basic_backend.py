import ollama
from generation.base import Base

MODEL = "llama3.2"

class BasicBackend(Base):
    def generate(self, query: str, chunks: list[str]) -> dict:
        context = "\n\n".join(f"[{i + 1}]{c}" for i, c in enumerate(chunks))

        prompt = (
            "You are fraud-detection assitant. "
            "Answer the questions using ONLY the context below. "
            "If the asnwer is absent/not present in the context, output 'Absense of relevant information'\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n\n"
            "Answer:"
        )

        response = ollama.chat(
            model = MODEL,
            messages=[{"role": "user", "content": prompt}],
        )

        return{
            "finding":response["message"]["content"],
            "sources": chunks,
            "confidence": 0.0,
            "mode": "basic (retrieval + LLM)",
        }