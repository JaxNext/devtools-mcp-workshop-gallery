import hangzhouData from './data/hangzhou.js';
import beijingData from './data/beijing.js';
import shenzhenData from './data/shenzhen.js';
import shanghaiData from './data/shanghai.js';

// City data mapping
const citiesData = {
    'Hangzhou': hangzhouData,
    'Beijing': beijingData,
    'Shenzhen': shenzhenData,
    'Shanghai': shanghaiData,
};

// Get city name in Chinese
function getCityNameChinese(cityName) {
    const chineseNames = {
        'Hangzhou': '杭州',
        'Beijing': '北京',
        'Shenzhen': '深圳',
        'Shanghai': '上海'
    };
    return chineseNames[cityName] || cityName;
}

// Get workshop date
function getWorkshopDate(cityName) {
    const dates = {
        'Hangzhou': '2025.11.01',
        'Beijing': '2025.11.09',
        'Shenzhen': '2025.11.16',
        'Shanghai': '2025.11.22'
    };
    return dates[cityName] || '';
}

// Render cities on homepage
function renderCities() {
    const citiesGrid = document.getElementById('citiesGrid');
    const cities = ['Hangzhou', 'Beijing', 'Shenzhen', 'Shanghai'];
    
    citiesGrid.innerHTML = cities.map(city => {
        const data = citiesData[city] || [];
        const count = data.length;
        
        return `
            <a href="city.html?name=${city}" class="city-card" data-city="${city}">
                <div class="city-header">
                    <p class="workshop-date">${getWorkshopDate(city)}</p>
                    <h3>${getCityNameChinese(city)}</h3>
                    <p class="student-count">${count} Developer${count !== 1 ? 's' : ''}</p>
                </div>
                <div class="city-body">
                    <p>Click to view gallery →</p>
                </div>
            </a>
        `;
    }).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCities();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

