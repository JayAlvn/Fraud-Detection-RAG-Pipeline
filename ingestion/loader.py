import os
from ingestion.pdf_reader import load_pdf
from ingestion.docx_reader import load_docx
from ingestion.text_reader import load_txt

def load_document(path: str) -> str:
    
    extract = os.path.splitext(path)[1].lower()

    loaders = {
        ".pdf": load_pdf,
        ".docx": load_docx,
        ".txt": load_txt,
    }

    if extract not in loaders:
        raise ValueError(f"Unsupported file type:{extract}")

    return loaders[extract](path)

