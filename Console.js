function scrapeAndDownload() {
    try {
        // Get all player elements and extract text
        const players = [];
        const elements = document.querySelectorAll('body > main > div > div:nth-child(2) > div > div > div.card-body.player-list.py-2');
        
        elements.forEach(element => {
            const text = element.textContent
                .replace(/^\s+|\s+$/gm, '')  // Remove leading/trailing whitespace
                .replace(/\s+/g, ' ')        // Normalize spaces
                .trim();                     // Final trim
            
            if (text) {
                players.push(text);
            }
        });

        if (players.length === 0) {
            console.warn('No data found to download');
            return;
        }

        // Create blob and download
        const blob = new Blob([players.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `scraped_data_${timestamp}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`Downloaded ${players.length} items`);
    } catch (error) {
        console.error('Scraping failed:', error);
    }
}

// Run the function
scrapeAndDownload();
