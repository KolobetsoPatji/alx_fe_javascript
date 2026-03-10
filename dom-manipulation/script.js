document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const addQuoteButton = document.getElementById('addQuoteButton');
    const exportButton = document.getElementById('exportQuotesButton');
    const importFile = document.getElementById('importFile');

    // Load quotes from local storage or use default
    let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');

    // Display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.textContent = "No quotes available.";
            return;
        } 
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
        sessionStorage.setItem('lastQuoteIndex', randomIndex); // optional
    }

    // save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Add a new quote
    function addQuote() {
        const textInput = document.getElementById('newQuoteText').value.trim();
        const categoryInput = document.getElementById('newQuoteCategory').value.trim();

        if (textInput === "" || categoryInput === "") {
            alert("Pease enter both quote text and category.");
            return;
        }

        quotes.push({ text: textInput, category: categoryInput });
        saveQuotes();
        showRandomQuote();

        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
    }

    // Export quotes as JSON
    function exportQuotes() {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url); 
    }

    // Import quotes from JSON
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            try {
                const importedQuotes = JSON.parse(e.target.result);
                if (!Array.isArray(importedQuotes)) throw new Error();
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            } catch {
                alert('Invalid JSON file.');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Event listeners
    addQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportQuotes);
    importFile.addEventListener('change', importFromJsonFile);

    // Show a random quote on load
    showRandomQuote();
});

