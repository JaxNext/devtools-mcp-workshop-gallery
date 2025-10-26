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
        const author = site.author || 'Developer';
        const previewEmoji = getPreviewEmoji(site.link);
        
        return `
            <a href="${site.link}" target="_blank" rel="noopener noreferrer" class="website-card">
                <div class="website-preview">${previewEmoji}</div>
                <div class="website-info">
                    <h3 class="website-title">${site.link.replace(/^https?:\/\//, '')}</h3>
                    <p class="website-author">by ${author}</p>
                </div>
            </a>
        `;
    }).join('');
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

