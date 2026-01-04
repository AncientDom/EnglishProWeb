const DataService = {
    // 1. ONLINE: The "Live" Link (Fixed for your Repo: EnglishProWeb)
    onlineBase: 'https://raw.githubusercontent.com/AncientDom/EnglishProWeb/main/public_db/',
    
    // 2. OFFLINE: The "Local" backup files bundled inside the APK
    localBase: './public_db/',

    async fetchWithFallback(filename) {
        // Step A: Try Online Link first
        try {
            console.log(`Checking online for ${filename}...`);
            const response = await fetch(this.onlineBase + filename);
            if (!response.ok) throw new Error("Online fetch failed");
            const data = await response.json();
            
            // Save to localStorage
            localStorage.setItem(filename, JSON.stringify(data));
            return data;
        } catch (e) {
            console.log(`Online failed/offline. Checking cache for ${filename}...`);
        }

        // Step B: Check Local Storage Cache
        const cached = localStorage.getItem(filename);
        if (cached) {
            console.log(`Found cached data for ${filename}`);
            return JSON.parse(cached);
        }

        // Step C: Load from APK assets
        try {
            const response = await fetch(this.localBase + filename);
            return await response.json();
        } catch (e) {
            console.error(`Critical Failure: Could not load ${filename}.`);
            return [];
        }
    },

    async loadAll() {
        const [vocab, stories, grammar] = await Promise.all([
            this.fetchWithFallback('vocab.json'),
            this.fetchWithFallback('stories.json'),
            this.fetchWithFallback('grammar.json')
        ]);
        
        return { vocab, stories, grammar };
    }
};
