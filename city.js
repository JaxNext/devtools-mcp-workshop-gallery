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
        const previewEmoji = getPreviewEmoji(site.link);
        
        return `
            <div class="website-card">
                <a href="${site.link}" target="_blank" rel="noopener noreferrer" class="website-link-wrapper">
                    <div class="website-preview">${previewEmoji}</div>
                    <div class="website-info">
                        <h3 class="website-title">${site.link.replace(/^https?:\/\//, '')}</h3>
                        <p class="website-author">by <span class="github-link" data-github="${author}">@${author}</span></p>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
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

// Get preview emoji based on site type
function getPreviewEmoji(url) {
    if (/github\.io|vercel\.app|netlify\.app/.test(url)) {
        return '🚀';
    }
    return '🌐';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderWebsites();
});

