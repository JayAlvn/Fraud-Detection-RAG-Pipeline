def load_txt(path: str) -> str:
    with open(path, 'r', encoding='utf-8') as text:
        return text.read()