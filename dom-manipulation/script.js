// Array of quote objects
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal.", category: "Success" },
    { text: "Do something today that your future self will thank you for.", category: "Inspiration" }

];

//Function to show a random quote
function showRandomQuote() {

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const quoteDisplay = document.getElementById("quoteDisplay");

    quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

// Function to add a new quote
function addQuote() {

    const QuoteText =  document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote and category.");
        return;
    }

    const newQuote = {
        text: quoteText,
        category: quoteCategory
    };

    quotes.push(newQuote); 

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
}

// Event listener for new quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);