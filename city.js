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
                                <span class="github-link" data-github="${author}">@${author}</span>
                            </span>
                        </p>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
    // Load preview images
    loadPreviewImages();
    
    // Add click handlers for GitHub links
    websitesGrid.querySelectorAll('.github-link').forEach(link => {
        const githubUser = link.getAttribute('data-github');
        link.style.cursor = 'pointer';
        link.style.textDecoration = 'underline';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(`https://github.com/${githubUser}`, '_blank', 'noopener,noreferrer');
        });
    });
}

// Load preview images using microlink.io API
function loadPreviewImages() {
    const previewImages = document.querySelectorAll('.preview-image');
    
    previewImages.forEach(img => {
        const screenshotUrl = img.getAttribute('data-screenshot');
        const previewContainer = img.parentElement;
        const loadingIndicator = previewContainer.querySelector('.preview-loading');
        
        // Fetch the screenshot URL from microlink.io
        fetch(screenshotUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.screenshot && data.data.screenshot.url) {
                    img.src = data.data.screenshot.url;
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
                    console.log('No screenshot in response:', data);
                    if (loadingIndicator) {
                        loadingIndicator.textContent = '🌐';
                    }
                }
            })
            .catch(error => {
                console.error('Failed to load preview:', error);
                // Fallback to emoji on error
                if (loadingIndicator) {
                    loadingIndicator.textContent = '🌐';
                }
            });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderWebsites();
});

