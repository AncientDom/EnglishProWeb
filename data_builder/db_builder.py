import json
import os

# Set output directory to the public_db folder one level up
output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public_db")
os.makedirs(output_dir, exist_ok=True)

# --- 1. VOCABULARY DATA ---
vocab_data = [
    {"word": "Ephemeral", "type": "Adj", "meaning": "Lasting for a very short time.", "sentence": "Fashions are ephemeral, changing with every season."},
    {"word": "Serendipity", "type": "Noun", "meaning": "Finding something good without looking for it.", "sentence": "Meeting my best friend was pure serendipity."},
    {"word": "Obfuscate", "type": "Verb", "meaning": "To render obscure, unclear, or unintelligible.", "sentence": "The politician used jargon to obfuscate the truth."},
    {"word": "Cacophony", "type": "Noun", "meaning": "A harsh, discordant mixture of sounds.", "sentence": "The city street was a cacophony of horns and shouting."},
    {"word": "Pragmatic", "type": "Adj", "meaning": "Dealing with things sensibly and realistically.", "sentence": "We need a pragmatic solution, not a theoretical one."},
    {"word": "Ineffable", "type": "Adj", "meaning": "Too great or extreme to be expressed in words.", "sentence": "The beauty of the sunset was ineffable."},
    {"word": "Sycophant", "type": "Noun", "meaning": "A person who acts obsequiously to gain advantage.", "sentence": "The CEO was surrounded by sycophants agreeing with his every word."},
    {"word": "Ubiquitous", "type": "Adj", "meaning": "Present, appearing, or found everywhere.", "sentence": "Smartphones have become ubiquitous in modern society."}
]

# --- 2. READING DATA ---
stories_data = [
    {
        "id": 1,
        "title": "The Silent Watchmaker",
        "content": "In the old town of Geneva, there lived a watchmaker who never spoke. The townspeople believed he was mute, but in reality, he had taken a vow of silence to focus entirely on his craft. One day, the Mayor brought him a clock that had stopped ticking at the exact moment the war ended. The watchmaker inspected it and handed it back without fixing it. Inside, he had placed a note: 'Some times are best left frozen.'",
        "questions": [
            {"q": "Why did the townspeople think the watchmaker was mute?", "options": ["He was deaf.", "He never spoke.", "He wrote notes.", "He lived alone."], "correct": 1},
            {"q": "What was the real reason for his silence?", "options": ["A secret.", "He hated the town.", "To focus on craft.", "Punishment."], "correct": 2},
            {"q": "Why did he refuse to fix the Mayor's clock?", "options": ["He couldn't.", "To preserve the memory.", "The Mayor was rude.", "For money."], "correct": 1},
            {"q": "What trait describes the watchmaker?", "options": ["Greedy", "Talkative", "Sentimental", "Lazy"], "correct": 2},
            {"q": "The story implies the war ended:", "options": ["Happily", "At a significant moment", "Recently", "Unknown"], "correct": 1}
        ]
    },
    {
        "id": 2,
        "title": "The Glass Bridge",
        "content": "The architect designed a bridge made entirely of glass. Critics said it would shatter under the first heavy boot. On opening day, a thousand people walked across it. It didn't crack. However, they looked down and saw the rushing river beneath their feet. Terrified, they crawled on hands and knees. The architect laughed, 'The glass is strong; it is your minds that are fragile.'",
        "questions": [
            {"q": "What was the critics' concern?", "options": ["It was too expensive.", "It would break easily.", "It was ugly.", "It was too slippery."], "correct": 1},
            {"q": "Why did people crawl?", "options": ["The bridge was shaking.", "The glass was slippery.", "Fear of the height/view.", "To show respect."], "correct": 2},
            {"q": "What is the moral of the story?", "options": ["Glass is dangerous.", "Fear is often mental.", "Critics are always right.", "Architects are cruel."], "correct": 1}
        ]
    }
]

# --- 3. GRAMMAR DATA ---
grammar_data = [
    {
        "category": "Tenses",
        "rules": [
            {"title": "Present Perfect", "desc": "Actions started in past, continuing now.", "example": "I have lived here for two years."},
            {"title": "Past Continuous", "desc": "Action going on at a certain time in the past.", "example": "I was reading when he called."}
        ]
    },
    {
        "category": "Parts of Speech",
        "rules": [
            {"title": "Adjective Order", "desc": "Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material.", "example": "A lovely little old rectangular red French wooden table."},
            {"title": "Adverbs", "desc": "Modifies a verb, adjective, or another adverb. Often ends in -ly.", "example": "She ran QUICKLY."}
        ]
    }
]

# --- WRITE FILES ---
def save_json(filename, data):
    path = os.path.join(output_dir, filename)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Generated: {path}")

save_json("vocab.json", vocab_data)
save_json("stories.json", stories_data)
save_json("grammar.json", grammar_data)

print("Database generation complete! Check the 'public_db' folder.")
