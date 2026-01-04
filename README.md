# English Pro Web (Offline Hybrid)

## How to Build
1.  **Generate Data:** Open a terminal in the folder and run:
    `python data_builder/db_builder.py`
    This creates the `public_db` folder needed for the app to work.

2.  **Upload to GitHub:**
    Upload this entire folder to a public GitHub Repository.

3.  **Update Links:**
    Open `assets/js/dataService.js` and update `onlineBase` with your GitHub "Raw" link.

4.  **Generate APK:**
    Use "Website 2 APK", "Capacitor", or "WebViewGold" to convert your HTML code into an Android App.
