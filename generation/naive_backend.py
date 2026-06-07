from generation.base import Base

class NaiveRAG(Base):

    def generate(self, query: str, chunks: list[str]) -> dict:

        formatted = []

        for i, chunk in enumerate(chunks):
            formatted.append(f"Source {i + 1}: {chunk}")
            
        sources_text = "\n\n".join(formatted)

        finding = f"Retrieved {len(chunks)} relevant passages for query: '{query}'\n\n{sources_text}"

        return {

            "finding": finding,
            "sources":chunk,
            "confidence": 0.0,
            "mode": "naive"
        }

        

