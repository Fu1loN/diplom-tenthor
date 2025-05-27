// Last.fm API configuration
const API_KEY = '09306916780f240d14703fd6b4f4dd0a'; // You'll need to add your Last.fm API key here
const API_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

// DOM Elements
const artistsGrid = document.querySelector('.artists__grid');
const tracksList = document.querySelector('.tracks__list');
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');

// Utility functions
function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}

async function fetchFromAPI(method, params = {}) {
    const queryParams = new URLSearchParams({
        method,
        api_key: API_KEY,
        format: 'json',
        ...params
    });

    try {
        const response = await fetch(`${API_BASE_URL}?${queryParams}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to fetch data. Please try again later.');
        return null;
    }
}

function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background-color: #ffebee;
        color: #c62828;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
        text-align: center;
    `;

    // Insert error message at the top of the main content
    const main = document.querySelector('.main');
    main.insertBefore(errorDiv, main.firstChild);

    // Remove error message after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
}

// Artist rendering
function createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'artist-card';
    
    const imageUrl = artist.image.find(img => img.size === 'large')?.['#text'] 
        || 'https://via.placeholder.com/150?text=No+Image';

    card.innerHTML = `
        <img src="${imageUrl}" alt="${artist.name}" class="artist-card__image">
        <h3 class="artist-card__name">${artist.name}</h3>
        <p class="artist-card__listeners">${formatNumber(artist.listeners)} listeners</p>
    `;

    return card;
}

async function loadTopArtists() {
    const data = await fetchFromAPI('chart.gettopartists', { limit: 12 });
    if (!data) return;

    artistsGrid.innerHTML = '';
    data.artists.artist.forEach(artist => {
        artistsGrid.appendChild(createArtistCard(artist));
    });
}

// Track rendering
function createTrackItem(track) {
    const item = document.createElement('div');
    item.className = 'track-item';
    
    const imageUrl = track.image.find(img => img.size === 'small')?.['#text']
        || 'https://via.placeholder.com/50?text=No+Image';

    item.innerHTML = `
        <img src="${imageUrl}" alt="${track.name}" class="track-item__image">
        <div class="track-item__info">
            <h3 class="track-item__title">${track.name}</h3>
            <p class="track-item__artist">${track.artist.name}</p>
        </div>
        <p class="track-item__listeners">${formatNumber(track.listeners)} listeners</p>
    `;

    return item;
}

async function loadTopTracks() {
    const data = await fetchFromAPI('chart.gettoptracks', { limit: 10 });
    if (!data) return;

    tracksList.innerHTML = '';
    data.tracks.track.forEach(track => {
        tracksList.appendChild(createTrackItem(track));
    });
}

// Search functionality
async function performSearch(query) {
    if (!query.trim()) {
        showError('Please enter a search term');
        return;
    }

    // Clear existing content
    artistsGrid.innerHTML = '<div class="loading">Searching...</div>';
    tracksList.innerHTML = '';

    // Search for artists
    const artistsData = await fetchFromAPI('artist.search', { artist: query, limit: 8 });
    if (artistsData) {
        artistsGrid.innerHTML = '';
        const artists = artistsData.results.artistmatches.artist;
        if (artists.length === 0) {
            artistsGrid.innerHTML = '<div class="no-results">No artists found</div>';
        } else {
            artists.forEach(artist => {
                artistsGrid.appendChild(createArtistCard(artist));
            });
        }
    }

    // Search for tracks
    const tracksData = await fetchFromAPI('track.search', { track: query, limit: 5 });
    if (tracksData) {
        tracksList.innerHTML = '';
        const tracks = tracksData.results.trackmatches.track;
        if (tracks.length === 0) {
            tracksList.innerHTML = '<div class="no-results">No tracks found</div>';
        } else {
            tracks.forEach(track => {
                tracksList.appendChild(createTrackItem(track));
            });
        }
    }
}

// Event listeners
searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

// Navigation handling
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.textContent.toLowerCase();
        
        if (page === 'home') {
            loadTopArtists();
            loadTopTracks();
        }
    });
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadTopArtists();
    loadTopTracks();
}); 