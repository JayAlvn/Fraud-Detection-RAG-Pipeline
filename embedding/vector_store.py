import chromadb

from .embedder import embed_batch, embed_text

client = chromadb.PersistentClient(path='./chroma_db')

collection = client.get_or_create_collection('fraud_rag')


def store_chunks(chunks: list[str], doc_name: str):
    
    embeddings = embed_batch(chunks)

    ids = [f'{doc_name}_chunk_{i}' for i in range(len(chunks))]

    collection.add(documents=chunks, embeddings=embeddings, ids=ids)

 #will automatically default to returning the top 5 matches.
def query(query_text: str, n=5) -> list[str]:
    #converting query to numbers
    query_vector = embed_text(query_text)
    results = collection.query(query_embeddings=[query_vector], n_results =n)
    return results['documents'][0]
