document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const addQuoteButton = document.getElementById('addQuoteButton');

    // Default quotes array
    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation"},
        { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" }
];

// Show a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quqotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `$quotes[randomIndex].text" - ${quotes[randomIndex].category}`;
}

// Add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText').ariaValueMax.trim();
    const categoryInput = document.getElementById('newQuoteCategory').value.trim();

    if (textInput === "" || categoryInput === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    quotes.push({ text: textInput, category: categoryInput });
    showRandomQuote();

    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
}

// Event listener for Add Quote button
addQuoteButton.addEventListener('click', addQuote);

// Display a random quote on page load
showRandomQuote();
});