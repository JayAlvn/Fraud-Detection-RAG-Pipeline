from docx.text.paragraph import Paragraph
from pypdf import PdfReader
import logging

logging.basicConfig(level=logging.INFO)

def load_pdf(path: str) -> str:

    logging.info(f"loading the pdf: {path}")
    try:
        reader = PdfReader(path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        logging.info(f"Success: extracted text from PDF")
        return text 
    except Exception as e:
        print(f"Error loading pdf file {e}")
        return ""

def load_pdf_metadata(path: str) -> dict:
    reader = PdfReader(path)
    metadata = reader.metadata

    return {
        "author": metadata.author,
        "title": metadata.title,
        "creation_date": metadata.creation_date
    }
