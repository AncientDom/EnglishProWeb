const DataService = {
    // 1. ONLINE: The "Live" Links (For updates without reinstalling APK)
    // REPLACE [YOUR_USERNAME] WITH YOUR ACTUAL GITHUB USERNAME
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
            
            // Save to localStorage so next time it's instant
            localStorage.setItem(filename, JSON.stringify(data));
            return data;
        } catch (e) {
            console.log(`Online failed or offline. Checking local/cache for ${filename}...`);
        }

        // Step B: If Online fails, check Local Storage Cache
        const cached = localStorage.getItem(filename);
        if (cached) {
            console.log(`Found cached data for ${filename}`);
            return JSON.parse(cached);
        }

        // Step C: If all else fails, load from the APK assets folder
        try {
            const response = await fetch(this.localBase + filename);
            return await response.json();
        } catch (e) {
            console.error(`Critical Failure: Could not load ${filename}. Ensure 'public_db' is generated.`);
            return []; // Return empty list to prevent crash
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
