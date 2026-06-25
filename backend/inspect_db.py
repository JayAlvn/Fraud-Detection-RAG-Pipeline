import sys
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("fraud_rag")

count = collection.count()
print(f"Collection 'fraud-rag' holds {count} chunks\n")

if count == 0:
    print("Empty.Upload a file/document first")
    sys.exit(0)
show_full = "--all" in sys.argv
limit = len(ids) if show_full else min(5, len(ids))

for i in range(limit):
    text = docs[i]
    preview = text if show_full else  (text[:300] + ("…" if len(text) > 300 else ""))
    print(f"---[{i}] id ={ids[i]}---")
    print(preview)
    print()
if not show_full and count > limit:
    print(f"(showing {limit} of {count}; run with --all to see everything)")
    