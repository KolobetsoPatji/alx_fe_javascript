 // Load quotes from local storage or use default
 let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation"},
    { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" }
];

    const quoteDisplay = document.getElementById("quoteDisplay");
    const addQuoteButton = document.getElementById("addQuoteButton");
    const exportQuotesButton = document.getElementById("exportQuotesButton");
    const importFile = document.getElementById("importFile");
    const categoryFilter = document.getElementById("categorFilter");
    const syncStatus = document.getElementById("syncStatus");

    
    function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    }
    function displayQuotes(list) {
        quoteDisplay.innerHTML = "";

        if (list.length === 0) {
            quoteDisplay.textContent = "No quotes available.";
            return;
        }

        list.forEach(quote => {
        
        const p = document.createElement("p");
        
        p.textContent = `"${quote.text}" - ${quote.category}`;
        
        quoteDisplay.appendChild(p);
        });
    }

    function populateCategories() {
    
    const categories = ["all", ...new Set(quotes.map(q => q.category))];
    
    categoryFilter.innerHTML = "";
    
    categories.forEach(cat => {
    
    const option = document.createElement("option");

    option.value = cat;
    option.textContent = cat;

    categoryFilter.appendChild(option);
    
});
}

    function filterQuotes() {
    
    const selectedCategory = categoryFilter.value;
    
    localStorage.setItem("selectedCategory", selectedCategory);
    
    if (selectedCategory === "all") {
        displayQuotes(quotes);
        } else {
            
    const filtered = quotes.filter(q.category === selectedCategory);
    displayQuotes(filtered);
        }
    }

    // Add a new quote
    function addQuote() {
        const text = document.getElementById("newQuoteText").value.trim();
        const category = document.getElementById("newQuoteCategory").value.trim();

        if (text === "" || category === "") {
            alert("Pease enter both quote text and category.");
            return;
        }

        const newQuote = { text, category };

        quotes.push(newQuote);
        
        saveQuotes();
        
        populateCategories();
        
        filterQuotes();

        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
    }

    // JSON Export
    function exportQuotes() {
    
    const blob = new Blob([JSON.stringify(quotes,null, 2)], { type: "application/json"});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "quotes.json";

    a.click();

    URL.revokeObjectURL(url);
    
    }

    // JSON Import
    function importFromJsonFile(event) {

    const fileReader = new FileReader();

    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);

            quotes.push(...importedQuotes);

            saveQuotes();

            populateCategories();

            filterQuotes();

            alert("Quotes imported successfully!");

        } catch {
            alert("Invalid JSON file");
        }
    };

    fileReader.readAsText(event.target.files[0]);
    }

    // Server Syncing
    async function syncWithServer() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const serverData = await response.json();

            const serverQuotes = serverData.slice(0.5).map(post => ({
                text: post.title,
                category: "Server"
            }));

            let updated = false;

            serverQuotes.forEaach(serverQuote => {
                
            const exists = quotes.some(q.text === serverQuote.text);

            if (!exists) {
                quotes.push(serverQuote);

                updated = true;
            }
            });

            if (updated) {
            
            saveQuotes();

            populateCategories();

            filterQuotes();

            syncStatus.textContent = "Quotes updated from server.";
            }
        } catch (error) {

            syncStatus.textContent = "Server sync failed.";
        }
    }
    

    // Restore saved filter
    function restoreFilter() {
    
    const saved = localStorage.getItem("selectedCategory") || "all";
    
    categoryFilter.value = saved;

    filterQuotes();

    }

    // Event listener
    addQuoteButton.addEventListener("click", addQuote);
    exportQuotesButton.addEventListener("click", exportQuotes);
    importFile.addEventListener("change", importFromJsonFile);

    // Initialize app 
    populateCategories();
    restoreFilter();

    // Sync every 30 seconds
    setInterval(syncWithServer, 3000);