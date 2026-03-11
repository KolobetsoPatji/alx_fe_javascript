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

    
    function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    }
    function displayQuotes(filteredQuotes) {
        quoteDisplay.innerHTML = "";

        if (filteredQuotes.length === 0) {
            quoteDisplay.textContent = "No quotes available.";
            return;
        }

        filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
        });
    }

    function populateCategories() {
    const categories = ["all", ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = "";
    categories.forEach(category => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

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

    // Restore saved filter
    function restoreFilter() {
    
    const savedFilter = localStorage.getItem("selectedCategory") || "all";
    
    categoryFilter.value = savedFilter;

    filterQuotes();

    }

    // Event listener
    addQuoteButton.addEventListener("click", addQuote);

    // Initialize app 
    populateCategories();
    restoreFilter();