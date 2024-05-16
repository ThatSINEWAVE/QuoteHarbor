// Select DOM elements
const themeToggleBtn = document.querySelector('.toggle-slider');
const textQuoteBtn = document.getElementById('text-quote-btn');
const imageQuoteBtn = document.getElementById('image-quote-btn');
const quoteContainer = document.querySelector('.quote-container');
const getQuoteBtn = document.getElementById('get-quote-btn');
const quoteOptions = document.querySelector('.quote-options');

// Initialize quote type
let quoteType = null;

// Function to toggle between light and dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    saveThemePreference();
}

// Function to save theme preference in local storage
function saveThemePreference() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Function to load theme preference from local storage
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Function to fetch and display text quote
async function getTextQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        const quote = data[0];
        quoteContainer.innerHTML = `
            <p class="quote-text">${quote.q}</p>
            <p class="quote-author">- ${quote.a}</p>
        `;
        showQuoteContainer();
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Function to fetch and display image quote
async function getImageQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/image');
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        quoteContainer.innerHTML = `
            <img class="quote-image" src="${imageUrl}" alt="Quote Image">
        `;
        showQuoteContainer();
    } catch (error) {
        console.error('Error fetching quote image:', error);
    }
}

// Function to show quote container and hide quote options
function showQuoteContainer() {
    quoteOptions.style.display = 'none';
    quoteContainer.style.display = 'block';
    getQuoteBtn.style.display = 'block';
}

// Function to hide quote container and show quote options
function showQuoteOptions() {
    quoteOptions.style.display = 'flex';
    quoteContainer.style.display = 'none';
    getQuoteBtn.style.display = 'none';
}

// Event listeners
themeToggleBtn.addEventListener('click', toggleTheme);
textQuoteBtn.addEventListener('click', () => {
    quoteType = 'text';
    getTextQuote();
});
imageQuoteBtn.addEventListener('click', () => {
    quoteType = 'image';
    getImageQuote();
});
getQuoteBtn.addEventListener('click', showQuoteOptions);

// Load theme preference on page load
loadThemePreference();
showQuoteOptions();
