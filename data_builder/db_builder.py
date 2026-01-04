import json, os
output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public_db")
os.makedirs(output_dir, exist_ok=True)

vocab = [
    {"word": "Ephemeral", "type": "Adj", "meaning": "Lasting for a very short time.", "sentence": "Fashions are ephemeral."},
    {"word": "Serendipity", "type": "Noun", "meaning": "Finding something good by chance.", "sentence": "It was pure serendipity."},
    {"word": "Pragmatic", "type": "Adj", "meaning": "Dealing with things sensibly.", "sentence": "We need a pragmatic solution."}
]
stories = [
    {
        "id": 1, "title": "The Silent Watchmaker", "content": "In Geneva lived a watchmaker who never spoke...",
        "questions": [{"q": "Why was he silent?", "options": ["Mute", "Vow of silence", "Deaf", "Shy"], "correct": 1}]
    }
]
grammar = [{"category": "Tenses", "rules": [{"title": "Present Perfect", "desc": "Started in past, continues now.", "example": "I have lived here for years."}]}]

def save(name, data):
    with open(os.path.join(output_dir, name), 'w') as f: json.dump(data, f)
    print(f"Saved {name}")

save("vocab.json", vocab)
save("stories.json", stories)
save("grammar.json", grammar)
