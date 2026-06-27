import logging

logging.basicConfig(level=logging.INFO)


def load_pdf(path: str) -> str:
    logging.info(f"loading the pdf: {path}")
    try:
        import fitz  # PyMuPDF
        doc = fitz.open(path)
        text = "\n".join(page.get_text("text") for page in doc)
        doc.close()
        if text.strip():
            logging.info("Success: extracted text from PDF (PyMuPDF)")
            return text
    except ImportError:
        logging.info("PyMuPDF is not installed; falling back to pypdf.")
    except Exception as e:
        logging.info(f"PyMuPDF failed ({e}); falling back to pypdf.")

    try:
        from pypdf import PdfReader
        reader = PdfReader(path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        logging.info("Success: extracted text from PDF (pypdf)")
        return text
    except Exception as e:
        print(f"Error loading pdf file {e}")
        return ""


def load_pdf_metadata(path: str) -> dict:
    from pypdf import PdfReader
    reader = PdfReader(path)
    metadata = reader.metadata
    return {
        "author": metadata.author,
        "title": metadata.title,
        "creation_date": metadata.creation_date,
    }