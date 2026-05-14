from ingestion.pdf_reader import load_docx, load_pdf, load_txt
from ingestion.chunker import chunk_text
import logging


def test_txt_returns_text():
    text = load_txt("home/ubuntu/Desktop/RAG Architecture.pdf")
    assert isinstance(text, str), "Loaded text must be a string"
    assert len(text) > 0, "Extracted text should not be empty"

def test_pdf_returns_text():
    text = load_pdf('/home/ubuntu/Desktop/RAG Architecture.pdf')
    assert len(text) > 100

def test_chunks_are_correct_size():
    chunks = chunk_text('word ' * 2000)
    assert all (len(c) <= 600 for c in chunks)

def test_docx_returns_text():
    text = load_docx("home/ubuntu/Desktop/RAG Architecture.pdf")
    assert len(text) > 0, "Extracted text should not be empty"

def text_docx_returns_text():
    text =load_docx("home/ubuntu/Desktop/RAG Architecture.pdf")
    assert isinstance(text, str), "load_docx must return a string"

