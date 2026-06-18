import re
import unicodedata

_JUNK_BLOCKS = re.compile(
    r'[─-╿'   # Box Drawing
    r'▀-▟'    # Block Elements
    r'■-◿'    # Geometric Shapes (■ □ ▪ ▫)
    r'☀-⛿'    # Miscellaneous Symbols
    r'�'           # Replacement character
    r'￾￿]',   # Non-characters
    re.UNICODE
)

_SMART_QUOTES = str.maketrans({
    '–': '-',
    '—': '-',
    '‘': "'",
    '’': "'",
    '“': '"',
    '”': '"',
    '•': '-',
    '…': '...',
})


def clean_text(text: str) -> str:
    text = unicodedata.normalize('NFC', text)
    text = text.translate(_SMART_QUOTES)
    text = _JUNK_BLOCKS.sub('', text)
    # Strip control characters (keep \n and \t)
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]', '', text)
    # Remove lines that are only a page number
    text = re.sub(r'^\s*\d+\s*$', '', text, flags=re.MULTILINE)
    # Collapse runs of spaces/tabs
    text = re.sub(r'[ \t]{2,}', ' ', text)
    # Collapse 3+ blank lines to 2
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()
