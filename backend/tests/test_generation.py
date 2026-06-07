from generation.naive_backend import NaiveRAG

def test_naive_returns_correct_keys():

    fake_chunks = [
        "Architectural patterns describe subsystems.",
        "Components are independent units.",
        "A subsystem has no meaning beyond its context."
    ]

    result = NaiveRAG().generate("what is a component?", fake_chunks)

    assert isinstance(result, dict)
    assert "finding" in result
    assert "sources" in result
    assert "confidence" in result
    assert "mode" in result


def test_naive_mode_is_correct():
    result = NaiveRAG().generate("test", ["chunk_one"])
    assert result["mode"] == "naive"

def test_naive_source_matches_input():
    chunks = ["first_chunk","second_chunk"]
    result = NaiveRAG().generate("test", chunks)
    assert result["sources"] == chunks

def test_naive_finding_contains_query():
    result = NaiveRAG().generate("What is a pattern", ["some text"])
    assert "What is a pattern" in result["finding"]


def test_naive_finding_contains_sources():
    result = NaiveRAG().generate("test", ["important text here"])
    assert "important text here" in result["finding"]