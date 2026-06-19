import re
import unicodedata

def clean_text(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if ch.isprintable() or ch.isspace())
    text = text.replace("■", " ").replace("□", " ")

    text = re.sub(r"\s+", "", text)

    return text.strip()
    