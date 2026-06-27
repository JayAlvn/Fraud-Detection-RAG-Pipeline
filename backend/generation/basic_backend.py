import ollama
import json
from generation.base import Base

MODEL = "llama3.2"


class BasicBackend(Base):
    def generate(self, query: str, chunks: list[str]) -> dict:
        context = "\n\n".join(f"[{i + 1}] {c}" for i, c in enumerate(chunks))

        prompt = (
            "You are a fraud-detection assistant. Use ONLY the context below.\n"
            "Answer the user's question AND assess fraud risk.\n"
            "Respond with a JSON object EXACTLY in this shape:\n"
            "{\n"
            '  "summary": "<concise answer to the question, plain text>",\n'
            '  "risk_level": "<one of: low, medium, high>",\n'
            '  "risk_score": <integer 0-100>,\n'
            '  "factors": [\n'
            '    {"name": "<short risk factor>", "weight": <integer 0-100>}\n'
            "  ]\n"
            "}\n"
            "If the context does not support an assessment, use low risk, "
            "score 0, and an empty factors list.\n\n"
            f"Context:\n{context}\n\nQuestion: {query}"
        )

        response = ollama.chat(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            format="json",
            options={"temperature": 0},
        )

        raw = response["message"]["content"]
        try:
            data = json.loads(raw)
            finding = data.get("summary", raw)
            risk_level = data.get("risk_level", "unknown")
            risk_score = int(data.get("risk_score", 0))
            factors = data.get("factors", [])
        except (json.JSONDecodeError, ValueError, TypeError):
            finding = raw
            risk_level = "unknown"
            risk_score = 0
            factors = []

        return {
            "finding": finding,
            "sources": chunks,
            "risk_level": risk_level,
            "risk_score": risk_score,
            "factors": factors,
            "confidence": 0.0,
            "mode": "basic (structured risk)",
        }