import sys

from pipeline.pipeline import run_pipeline

user_query = "What is Architecture in the small?"

result= run_pipeline(
    "tests/fixtures/Architecture.pdf",
    user_query,
    mode="naive"
)

print()

print("\tMODE / Version of the Program", result["mode"])
print("\tCONFIDENCE", result["confidence"])

print("\n\nQUERY: ", user_query,"\n")

print("\tRETRIEVED SOURCES:\n")

for i, source  in enumerate(result["sources"]):
    print(f"SOURCE {i + 1}: ")
    print(f"\t{source.replace('\n', '\n\t')}\n")
    
print("FINDING:")
print(f"{result["finding"].replace('\n', '\n\t')}")

print()
