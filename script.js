// Select DOM elements
const themeToggleBtn = document.querySelector('.toggle-slider');
const textQuoteBtn = document.getElementById('text-quote-btn');
const imageQuoteBtn = document.getElementById('image-quote-btn');
const quoteContainer = document.querySelector('.quote-container');
const getQuoteBtn = document.getElementById('get-quote-btn');
const quoteOptions = document.querySelector('.quote-options');

// Initialize quote type
let quoteType = null;

// Create loading animation element
const loadingAnimation = document.createElement('div');
loadingAnimation.classList.add('loading-animation');
for (let i = 0; i < 3; i++) {
  const dot = document.createElement('div');
  dot.classList.add('loading-dot');
  loadingAnimation.appendChild(dot);
}

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
        const timestamp = new Date().getTime();
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/random')}?timestamp=${timestamp}`);
        const data = await response.json();
        const quoteData = JSON.parse(data.contents);
        const quote = quoteData[0];
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
    quoteOptions.classList.add('fade-out');
    setTimeout(() => {
      quoteOptions.style.display = 'none';
      quoteContainer.innerHTML = '<div class="loading-container"><p class="loading-text">Finding a quote for you<span class="loading-dots">...</span></p></div>';
    }, 500);

    const timestamp = new Date().getTime();
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/image')}?timestamp=${timestamp}`);
    const data = await response.json();
    const imageUrl = data.contents;
    const quoteImage = new Image();
    quoteImage.src = imageUrl;
    quoteImage.classList.add('quote-image');
    quoteImage.alt = 'Quote Image';
    quoteImage.addEventListener('load', () => {
      quoteContainer.innerHTML = '';
      quoteContainer.appendChild(quoteImage);
      showQuoteContainer();
    });
  } catch (error) {
    console.error('Error fetching quote image:', error);
  }
}

// Function to show quote container and hide quote options
function showQuoteContainer() {
    quoteOptions.classList.add('fade-out');
    setTimeout(() => {
        quoteOptions.style.display = 'none';
        quoteContainer.style.display = 'block';
        getQuoteBtn.style.display = 'block';
        quoteContainer.classList.add('fade-in');
    }, 500); // Delay to allow fade-out animation to complete
}

// Function to hide quote container and show quote options
function showQuoteOptions() {
    quoteContainer.classList.remove('fade-in');
    quoteContainer.classList.add('fade-out');
    setTimeout(() => {
        quoteContainer.style.display = 'none';
        quoteOptions.style.display = 'flex';
        getQuoteBtn.style.display = 'none';
        quoteOptions.classList.remove('fade-out');
    }, 500); // Delay to allow fade-out animation to complete
}

// Function to show loading animation
function showLoadingAnimation() {
    quoteContainer.innerHTML = '';
    quoteContainer.appendChild(loadingAnimation);
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