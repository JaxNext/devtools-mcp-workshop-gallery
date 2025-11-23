import hangzhouData from './data/hangzhou.js';
import beijingData from './data/beijing.js';
import shenzhenData from './data/shenzhen.js';
import shanghaiData from './data/shanghai.js';

// Get city name from URL
const urlParams = new URLSearchParams(window.location.search);
const cityName = urlParams.get('name') || 'Hangzhou';

// City data mapping
const cityDataMap = {
    'Hangzhou': hangzhouData,
    'Beijing': beijingData,
    'Shenzhen': shenzhenData,
    'Shanghai': shanghaiData
};

// Update page title and header
document.getElementById('cityName').textContent = `${cityName} Workshop Gallery`;
document.title = `${cityName} Gallery - DevTools MCP Workshop`;

// Set data attribute for background image styling
const galleryHeader = document.querySelector('.gallery-header');
if (galleryHeader) {
    galleryHeader.setAttribute('data-city', cityName);
}

// Render websites
function renderWebsites() {
    const websitesGrid = document.getElementById('websitesGrid');
    const websites = cityDataMap[cityName] || [];
    
    if (websites.length === 0) {
        websitesGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎨</div>
                <h3>No websites yet</h3>
                <p>Developers' websites will appear here soon!</p>
            </div>
        `;
        return;
    }
    
    websitesGrid.innerHTML = websites.map((site, index) => {
        const author = site.authorName || 'Developer';
        const projectName = site.name || site.link.replace(/^https?:\/\//, '');
        const screenshotUrl = `https://api.microlink.io/screenshot?url=${encodeURIComponent(site.link)}&viewport.width=800&viewport.height=600&screenshot=true&embed=screenshot.url`;
        const avatarUrl = author ? `https://github.com/${author}.png` : '';
        
        return `
            <div class="website-card">
                <a href="${site.link}" target="_blank" rel="noopener noreferrer" class="website-link-wrapper">
                    <div class="website-preview" data-url="${site.link}">
                        <div class="preview-loading">📸</div>
                        <img class="preview-image" data-screenshot="${screenshotUrl}" alt="${projectName} preview" />
                    </div>
                    <div class="website-info">
                        <h3 class="website-title">${projectName}</h3>
                        <p class="website-url">${site.link.replace(/^https?:\/\//, '')}</p>
                        <p class="website-author">
                            <span class="author-info">
                                ${avatarUrl ? `<img src="${avatarUrl}" alt="${author}" class="author-avatar" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'" />` : ''}
                                <span class="author-emoji" style="${avatarUrl ? 'display:none' : ''}">👤</span>
                                <a href="https://github.com/${author}" target="_blank" rel="noopener noreferrer" class="github-link">@${author}</a>
                            </span>
                        </p>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
    // Load preview images
    loadPreviewImages();
}

// Cache management for preview images
const CACHE_KEY_PREFIX = 'preview_cache_';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

function getCachedImageUrl(siteLink) {
    try {
        const cacheKey = CACHE_KEY_PREFIX + btoa(siteLink);
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
            const { url, timestamp } = JSON.parse(cached);
            const now = Date.now();
            
            // Check if cache is still valid
            if (now - timestamp < CACHE_TTL) {
                return url;
            } else {
                // Cache expired, remove it
                localStorage.removeItem(cacheKey);
            }
        }
    } catch (error) {
        console.error('Error reading cache:', error);
    }
    
    return null;
}

function setCachedImageUrl(siteLink, imageUrl) {
    try {
        const cacheKey = CACHE_KEY_PREFIX + btoa(siteLink);
        const cacheData = {
            url: imageUrl,
            timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error setting cache:', error);
    }
}

// Fetch preview image URL from microlink.io API
async function fetchPreviewImageUrl(siteLink) {
    // Check cache first
    const cachedUrl = getCachedImageUrl(siteLink);
    if (cachedUrl) {
        console.log('Using cached preview for:', siteLink);
        return cachedUrl;
    }
    
    const screenshotUrl = `https://api.microlink.io/screenshot?url=${encodeURIComponent(siteLink)}&viewport.width=800&viewport.height=600&screenshot=true&embed=screenshot.url`;
    
    try {
        const response = await fetch(screenshotUrl);
        const data = await response.json();
        
        if (data && data.data && data.data.screenshot && data.data.screenshot.url) {
            const imageUrl = data.data.screenshot.url;
            // Cache the result
            setCachedImageUrl(siteLink, imageUrl);
            return imageUrl;
        } else {
            console.log('No screenshot in response:', data);
            return null;
        }
    } catch (error) {
        console.error('Failed to load preview:', error);
        return null;
    }
}

// Load a single preview image
async function loadPreviewImage(img) {
    const siteLink = img.parentElement.getAttribute('data-url');
    const previewContainer = img.parentElement;
    const loadingIndicator = previewContainer.querySelector('.preview-loading');
    
    const imageUrl = await fetchPreviewImageUrl(siteLink);
    
    if (imageUrl) {
        img.src = imageUrl;
        img.onload = () => {
            img.style.opacity = '1';
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        };
        img.onerror = () => {
            // Fallback to emoji if image fails to load
            if (loadingIndicator) {
                loadingIndicator.textContent = '🌐';
            }
        };
    } else {
        // Fallback to emoji if no screenshot available
        if (loadingIndicator) {
            loadingIndicator.textContent = '🌐';
        }
    }
}

// Load preview images using lazy loading with Intersection Observer
function loadPreviewImages() {
    const previewImages = document.querySelectorAll('.preview-image');
    
    // Create an Intersection Observer for lazy loading
    const observerOptions = {
        root: null, // viewport
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load the image
                loadPreviewImage(img);
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, observerOptions);
    
    // Observe all preview images
    previewImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderWebsites();
});

