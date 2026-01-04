const app = {
    data: {},
    state: { vocabIndex: 0, vocabShuffled: [], currentScore: 0, currentStoryQuiz: [] },

    async init() {
        const db = await DataService.loadAll();
        if (db && db.vocab && db.vocab.length > 0) {
            this.data = db;
            this.state.vocabShuffled = [...this.data.vocab].sort(() => 0.5 - Math.random());
            this.renderVocab();
            this.renderGrammarList(this.data.grammar);
            this.renderStoryList();
            this.generateExam();
        } else {
            console.warn("Data load incomplete. Ensure db_builder.py was run.");
        }
    },

    nav(tabId) {
        document.querySelectorAll('section').forEach(el => el.classList.add('hidden-section'));
        document.querySelectorAll('section').forEach(el => el.classList.remove('active-section'));
        const target = document.getElementById(tabId + '-section');
        if(target) { target.classList.remove('hidden-section'); target.classList.add('active-section'); }
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        document.getElementById('nav-' + tabId).classList.add('active');
    },

    renderVocab() {
        if(!this.state.vocabShuffled.length) return;
        const wordObj = this.state.vocabShuffled[this.state.vocabIndex];
        document.getElementById('v-word').innerText = wordObj.word;
        document.getElementById('v-type').innerText = wordObj.type;
        document.getElementById('v-meaning').innerText = wordObj.meaning;
        document.getElementById('v-sentence').innerText = `"${wordObj.sentence}"`;
        document.getElementById('v-progress').innerText = `Word ${this.state.vocabIndex + 1} / ${this.state.vocabShuffled.length}`;
    },

    nextWord() {
        if (this.state.vocabIndex < this.state.vocabShuffled.length - 1) {
            this.state.vocabIndex++;
            this.renderVocab();
        } else {
            if(confirm("Finished deck! Restart?")) {
                this.state.vocabIndex = 0;
                this.state.vocabShuffled.sort(() => 0.5 - Math.random());
                this.renderVocab();
            }
        }
    },

    renderGrammarList(list) {
        const container = document.getElementById('grammar-list');
        if(!container || !list) return;
        container.innerHTML = '';
        list.forEach(cat => {
            let html = `<h3>${cat.category}</h3>`;
            cat.rules.forEach(rule => {
                html += `<div class="grammar-item"><strong>${rule.title}</strong><p>${rule.desc}</p><div style="background:#eef; padding:5px; border-radius:4px; margin-top:5px;"><em>Ex: ${rule.example}</em></div></div>`;
            });
            container.innerHTML += html;
        });
    },

    filterGrammar() {
        const term = document.getElementById('grammar-search').value.toLowerCase();
        document.querySelectorAll('.grammar-item').forEach(item => {
            item.style.display = item.innerText.toLowerCase().includes(term) ? 'block' : 'none';
        });
    },

    renderStoryList() {
        const container = document.getElementById('story-list-view');
        if(!container) return;
        container.innerHTML = this.data.stories.map((s, idx) => `
            <div class="story-item" onclick="app.openStory(${idx})"><h3>${s.title}</h3><p>Tap to read & quiz</p></div>
        `).join('');
    },

    openStory(index) {
        const story = this.data.stories[index];
        document.getElementById('story-list-view').classList.add('hidden');
        document.getElementById('story-detail-view').classList.remove('hidden');
        document.getElementById('story-title').innerText = story.title;
        document.getElementById('story-text').innerText = story.content;
        this.currentStoryQuiz = story.questions;
        document.getElementById('story-quiz-container').classList.add('hidden');
    },

    closeStory() {
        document.getElementById('story-detail-view').classList.add('hidden');
        document.getElementById('story-list-view').classList.remove('hidden');
    },

    startStoryQuiz() {
        document.getElementById('story-quiz-container').classList.remove('hidden');
        const qArea = document.getElementById('quiz-questions-area');
        qArea.innerHTML = this.currentStoryQuiz.map((q, qIdx) => `
            <div class="quiz-q" id="sq-${qIdx}"><p><strong>Q${qIdx+1}:</strong> ${q.q}</p>
                ${q.options.map((opt, oIdx) => `<button class="quiz-opt" onclick="app.checkStoryAns(this, ${qIdx}, ${q.correct}, ${oIdx})">${opt}</button>`).join('')}
            </div>`).join('');
    },

    checkStoryAns(btn, qIdx, correctIdx, selectedIdx) {
        const parent = document.getElementById(`sq-${qIdx}`);
        const allBtns = parent.querySelectorAll('.quiz-opt');
        allBtns.forEach(b => b.disabled = true);
        if (selectedIdx === correctIdx) { btn.classList.add('correct'); } 
        else { btn.classList.add('wrong'); allBtns[correctIdx].classList.add('correct'); }
    },

    generateExam() {
        const container = document.getElementById('exam-container');
        const randomWord = this.data.vocab[Math.floor(Math.random() * this.data.vocab.length)];
        const distractors = this.data.vocab.filter(w => w.word !== randomWord.word).sort(() => 0.5 - Math.random()).slice(0, 3).map(w => w.meaning);
        const options = [...distractors, randomWord.meaning].sort(() => 0.5 - Math.random());
        container.innerHTML = `<div class="flashcard"><p style="color:#888">VOCABULARY CHALLENGE</p><h3>${randomWord.word}</h3>
            ${options.map(opt => `<button class="btn-action" style="background:#fff; color:#333; border:1px solid #ccc" onclick="app.checkExam(this, '${opt === randomWord.meaning}')">${opt}</button>`).join('')}</div>`;
    },

    checkExam(btn, isCorrect) {
        const parent = btn.parentElement;
        parent.querySelectorAll('button').forEach(b => b.disabled = true);
        if (isCorrect === 'true') { btn.classList.add('correct'); this.state.currentScore++; document.getElementById('exam-score').innerText = this.state.currentScore; } 
        else { btn.classList.add('wrong'); }
        setTimeout(() => this.generateExam(), 1500);
    }
};
window.onload = () => app.init();
