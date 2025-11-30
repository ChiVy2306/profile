let currentLang = 'vi';

const translations = {
    vi: {},
    en: {},
    ja: {}
};

const names = ['Phan Chí Vỹ', 'Hoshimiya', 'Heo'];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentName = names[nameIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentName.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

/**
 * Calculates detailed age breakdown from birth date
 * @returns {Object} Age in years, months, days, hours, minutes, seconds
 */
function calculateDetailedAge() {
    const birthDate = new Date(2006, 5, 23, 0, 0, 0);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        years--;
    }

    const totalMs = now - birthDate;
    const totalSeconds = Math.floor(totalMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    let tempDate = new Date(birthDate);
    tempDate.setFullYear(tempDate.getFullYear() + years);

    let months = now.getMonth() - tempDate.getMonth();
    if (months < 0) {
        months += 12;
        years--;
        tempDate.setFullYear(tempDate.getFullYear() + years);
    }
    tempDate.setMonth(tempDate.getMonth() + months);

    let days = now.getDate() - tempDate.getDate();
    if (days < 0) {
        const prevMonth = new Date(tempDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        days += new Date(tempDate.getFullYear(), tempDate.getMonth(), 0).getDate();
        months--;
        if (months < 0) {
            months += 12;
            years--;
        }
    }
    tempDate.setDate(tempDate.getDate() + days);

    let hours = now.getHours() - tempDate.getHours();
    if (hours < 0) {
        hours += 24;
        days--;
    }

    let minutes = now.getMinutes() - tempDate.getMinutes();
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    let seconds = now.getSeconds() - tempDate.getSeconds();
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

function updateAge() {
    const ageData = calculateDetailedAge();

    const tooltips = {
        vi: `${ageData.years} năm, ${ageData.months} tháng, ${ageData.days} ngày, ${ageData.hours} giờ, ${ageData.minutes} phút, ${ageData.seconds} giây`,
        en: `${ageData.years} years, ${ageData.months} months, ${ageData.days} days, ${ageData.hours} hours, ${ageData.minutes} minutes, ${ageData.seconds} seconds`,
        ja: `${ageData.years}年 ${ageData.months}ヶ月 ${ageData.days}日 ${ageData.hours}時間 ${ageData.minutes}分 ${ageData.seconds}秒`
    };

    const ageElements = [
        { id: 'age', lang: 'vi' },
        { id: 'age-en', lang: 'en' },
        { id: 'age-ja', lang: 'ja' }
    ];

    ageElements.forEach(({ id, lang }) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = ageData.years;
            element.title = tooltips[lang];
            element.style.cursor = 'help';
            element.style.textDecoration = 'underline dotted';
            element.style.textUnderlineOffset = '3px';
        }
    });
}

function calculateAge() {
    updateAge();
}

const quotes = [
    { text: '"Be yourself; everyone else is already taken."', author: '— Oscar Wilde' },
    { text: '"In the end, we only regret the chances we didn\'t take."', author: '— Lewis Carroll' },
    { text: '"Do what you can, with what you have, where you are."', author: '— Theodore Roosevelt' },
    { text: '"Life isn\'t about finding yourself. Life is about creating yourself."', author: '— George Bernard Shaw' },
    { text: '"The only impossible journey is the one you never begin."', author: '— Tony Robbins' },
    { text: '"Don\'t watch the clock; do what it does. Keep going."', author: '— Sam Levenson' },
    { text: '"You miss 100% of the shots you don\'t take."', author: '— Wayne Gretzky' },
    { text: '"The best time to plant a tree was 20 years ago. The second best time is now."', author: '— Chinese Proverb' },
    { text: '"Dream big and dare to fail."', author: '— Norman Vaughan' },
    { text: '"What we think, we become."', author: '— Buddha' },
    { text: '"It always seems impossible until it\'s done."', author: '— Nelson Mandela' },
    { text: '"Life is short, and it\'s up to you to make it sweet."', author: '— Sarah Louise Delany' },
    { text: '"You only live once, but if you do it right, once is enough."', author: '— Mae West' },
    { text: '"Not all those who wander are lost."', author: '— J.R.R. Tolkien' },
    { text: '"Life is a journey, not a destination."', author: '— Ralph Waldo Emerson' }
];

function displayQuote() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    const quote = quotes[quoteIndex];

    const quoteElement = document.getElementById('quote-text');
    if (quoteElement) {
        quoteElement.innerHTML = `<p>${quote.text}</p><p style="text-align: right; margin-top: 10px; font-weight: 600;">${quote.author}</p>`;
    }
}

async function fetchGitHubRepos() {
    const reposElement = document.getElementById('github-repos');
    try {
        const response = await fetch('https://api.github.com/users/ChiVy2306/repos?sort=updated&per_page=3');
        const repos = await response.json();

        if (repos && repos.length > 0) {
            reposElement.innerHTML = repos.map(repo => `
                <div style="margin-bottom: 10px; padding: 10px; background: rgba(255,255,255,0.3); border-radius: 8px;">
                    <strong>${repo.name}</strong>
                    <p style="font-size: 12px; margin-top: 5px;">${repo.description || 'No description'}</p>
                    <p style="font-size: 11px; margin-top: 5px;">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        reposElement.innerHTML = '<p style="font-size: 13px;">Unable to load repos 😅</p>';
    }
}

/**
 * Fetches and renders Discord activity data
 * @param {boolean} isFirstLoad - Whether this is the initial page load
 */
async function fetchDiscordActivity(isFirstLoad = false) {
    const activityElement = document.getElementById('discord-activity');
    const endpoint = 'https://data-fetcher-p8pv.onrender.com/api/users';

    if (isFirstLoad) {
        activityElement.innerHTML = '<p style="font-size: 13px;">Đang tải... 🔄</p>';
    }

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (isFirstLoad) {
            console.log('API Response:', result);
        }

        const data = result.data || result;
        let user = null;

        if (Array.isArray(data)) {
            user = data.find(u => {
                const username = u.username || u.discord_name || u.name || (u.user && u.user.username);
                return username === 'bokuwa_buta.san' ||
                    username === '@bokuwa_buta.san' ||
                    (u.user && (u.user.username === 'bokuwa_buta.san' || u.user.global_name === 'bokuwa_buta.san'));
            });

            if (!user) {
                console.log('Available usernames:', data.map(u => u.username || u.discord_name || u.name || (u.user && u.user.username)));
            }
        }

        console.log('Found user:', user);

        if (user) {
            const avatarUrl = user.avatarURL ||
                user.avatar_url ||
                user.avatar ||
                (user.user && user.user.avatarURL) ||
                (user.user && user.user.avatar_url) ||
                (user.user && user.user.avatar) ||
                'https://cdn.discordapp.com/embed/avatars/0.png';

            const displayName = user.username ||
                user.discord_name ||
                user.name ||
                (user.user && user.user.global_name) ||
                (user.user && user.user.username) ||
                'bokuwa_buta.san';

            try {
                let games = [];
                let music = null;
                let customStatus = null;
                
                if (user.activities && user.activities.length > 0) {
                    console.log('Activities:', user.activities);
                    
                    user.activities.forEach(a => {
                        if (!a) return;
                        const name = (a.name || '').toString();
                        const type = typeof a.type === 'number' ? a.type : parseInt(a.type) || -1;
                        const details = a.details || '';
                        const state = a.state || '';
                        
                        console.log('Activity:', { name, type, details, state });
                        
                        const isSpotify = type === 2 || 
                            name.toLowerCase() === 'spotify' || 
                            /listening/i.test(String(type)) || 
                            /spotify/i.test(a.url || '') ||
                            (a.sync_id && a.party);
                        
                        const isCustomStatus = type === 4 || 
                            name.toLowerCase() === 'custom status' ||
                            (name === '' && state && !details);
                        
                        if (isSpotify) {
                            music = { 
                                name: 'Spotify', 
                                track: details || name, 
                                artist: state, 
                                assets: a.assets || {},
                                albumArt: a.assets?.largeImageURL || a.assets?.large_image || null
                            };
                        } else if (isCustomStatus) {
                            customStatus = { state: state || details || a.emoji?.name || '' };
                        } else if (name && name.toLowerCase() !== 'custom status') {
                            games.push({ name, details, state, assets: a.assets || {} });
                        }
                    });
                }

                if (!games.length && user.activity && user.activity.name) {
                    const a = user.activity;
                    games.push({ name: a.name, details: a.details || '', state: a.state || '' });
                }

                function buildHeader(avatar, displayName) {
                    return `
                        <div class="discord-header">
                            <img src="${avatar}" alt="Discord Avatar" class="discord-avatar" onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
                            <strong class="discord-name">${displayName}</strong>
                        </div>`;
                }

                function buildCaseNone() {
                    let html = buildHeader(avatarUrl, displayName);
                    
                    if (customStatus) {
                        html += `<div class="activities-list">`;
                        html += `<div class="activity-item status-item">`;
                        html += `<span class="activity-icon">💬</span>`;
                        html += `<div class="activity-info">`;
                        html += `<p class="activity-label">Discord Custom Status</p>`;
                        html += `<p class="activity-name">${customStatus.state}</p>`;
                        html += `</div></div>`;
                        html += `</div>`;
                    } else if (user.status) {
                        const statusEmoji = {
                            'online': '🟢',
                            'idle': '🟡',
                            'dnd': '🔴',
                            'offline': '⚫'
                        };
                        const statusText = {
                            'online': 'Online',
                            'idle': 'Idle',
                            'dnd': 'Do Not Disturb',
                            'offline': 'Offline'
                        };
                        html += `<p class="status-line">${statusEmoji[user.status] || '⚫'} ${statusText[user.status] || user.status}</p>`;
                    } else {
                        html += `<p class="status-line">😴 Not playing anything</p>`;
                    }
                    return `<div class="activity-case case-none">${html}</div>`;
                }

                function buildCaseGame() {
                    let html = buildHeader(avatarUrl, displayName);
                    html += `<div class="activities-list">`;
                    games.forEach(g => {
                        html += `<div class="activity-item game-item">`;
                        html += `<span class="activity-icon">🎮</span>`;
                        html += `<div class="activity-info">`;
                        html += `<p class="activity-label">Currently Playing:</p>`;
                        html += `<p class="activity-name">${g.name}</p>`;
                        if (g.details) html += `<p class="activity-details">${g.details}</p>`;
                        if (g.state) html += `<p class="activity-state">${g.state}</p>`;
                        html += `</div></div>`;
                    });
                    if (customStatus) {
                        html += `<div class="activity-item status-item">`;
                        html += `<span class="activity-icon">💬</span>`;
                        html += `<div class="activity-info">`;
                        html += `<p class="activity-label">Discord Custom Status</p>`;
                        html += `<p class="activity-name">${customStatus.state}</p>`;
                        html += `</div></div>`;
                    }
                    html += `</div>`;
                    return `<div class="activity-case case-game">${html}</div>`;
                }

                function buildCaseMusic() {
                    let html = buildHeader(avatarUrl, displayName);
                    html += `<div class="activities-list">`;
                    
                    let albumImage = music.albumArt || 
                        (music.assets && (music.assets.largeImageURL || music.assets.large_image || music.assets.large || music.assets.large_image_url)) || 
                        null;
                    html += `<div class="activity-item music-item">`;
                    html += `<span class="activity-icon">🎵</span>`;
                    if (albumImage && albumImage.startsWith('http')) {
                        html += `<img src="${albumImage}" alt="album" class="album-art">`;
                    }
                    html += `<div class="activity-info">`;
                    html += `<p class="activity-label">Listening to:</p>`;
                    html += `<p class="activity-name">${music.track || music.name}</p>`;
                    if (music.artist) html += `<p class="activity-details">${music.artist}</p>`;
                    html += `</div></div>`;
                    
                    if (customStatus) {
                        html += `<div class="activity-item status-item">`;
                        html += `<span class="activity-icon">💬</span>`;
                        html += `<div class="activity-info">`;
                        html += `<p class="activity-label">Discord Custom Status</p>`;
                        html += `<p class="activity-name">${customStatus.state}</p>`;
                        html += `</div></div>`;
                    }
                    
                    html += `</div>`;
                    return `<div class="activity-case case-music">${html}</div>`;
                }

                function buildCaseBoth() {
                    let html = buildHeader(avatarUrl, displayName);
                    html += `<div class="activities-list">`;
                    
                    let albumImage = music.albumArt || 
                        (music.assets && (music.assets.largeImageURL || music.assets.large_image || music.assets.large || music.assets.large_image_url)) || 
                        null;
                    html += `<div class="activity-item music-item">`;
                    html += `<span class="activity-icon">🎵</span>`;
                    if (albumImage && albumImage.startsWith('http')) {
                        html += `<img src="${albumImage}" alt="album" class="album-art">`;
                    }
                    html += `<div class="activity-info">`;
                    html += `<p class="activity-label">Listening to:</p>`;
                    html += `<p class="activity-name">${music.track || music.name}</p>`;
                    if (music.artist) html += `<p class="activity-details">${music.artist}</p>`;
                    html += `</div></div>`;
                    
                    games.forEach(g => {
                        html += `<div class="activity-item game-item">`;
                        html += `<span class="activity-icon">🎮</span>`;
                        html += `<div class="activity-info">`;
                        html += `<p class="activity-label">Currently Playing:</p>`;
                        html += `<p class="activity-name">${g.name}</p>`;
                        if (g.details) html += `<p class="activity-details">${g.details}</p>`;
                        if (g.state) html += `<p class="activity-state">${g.state}</p>`;
                        html += `</div></div>`;
                    });
                    
                    if (customStatus) {
                        html += `<div class="activity-item status-item">`;
                        html += `<span class="activity-icon">💬</span>`;
                        html += `<div class="activity-info">`;
                        html += `<p class="activity-label">Discord Custom Status</p>`;
                        html += `<p class="activity-name">${customStatus.state}</p>`;
                        html += `</div></div>`;
                    }
                    
                    html += `</div>`;
                    return `<div class="activity-case case-both">${html}</div>`;
                }

                const hasGames = games.length > 0;
                const hasMusic = !!music;
                let finalHTML = '';
                if (!hasGames && !hasMusic) {
                    finalHTML = buildCaseNone();
                } else if (hasGames && !hasMusic) {
                    finalHTML = buildCaseGame();
                } else if (!hasGames && hasMusic) {
                    finalHTML = buildCaseMusic();
                } else {
                    finalHTML = buildCaseBoth();
                }
                activityElement.innerHTML = finalHTML;
                
                if (typeof window !== 'undefined') {
                    window.renderActivityForUser = function (u) {
                        try {
                            const localUser = u || user;
                            const localAvatar = localUser.avatarURL || localUser.avatar || (localUser.user && (localUser.user.avatarURL || localUser.user.avatar)) || avatarUrl;
                            const localDisplayName = localUser.username || localUser.discord_name || localUser.name || (localUser.user && (localUser.user.global_name || localUser.user.username)) || displayName;
                            const html = finalHTML;
                            document.getElementById('discord-activity').innerHTML = html;
                            return html;
                        } catch (e) {
                            console.error('renderActivityForUser test helper error:', e);
                            return null;
                        }
                    };
                }
            } catch (err) {
                console.error('Error rendering discord activity:', err);
                activityElement.innerHTML = `
                    <div style="text-align: center; padding: 15px;">
                        <p style="font-size: 13px;">Unable to display activity</p>
                    </div>
                `;
            }
        } else {
            activityElement.innerHTML = `
                <div style="text-align: center; padding: 15px;">
                    <p style="font-size: 13px;">User 'bokuwa_buta.san' not found 🤔</p>
                    <p style="font-size: 11px; opacity: 0.6; margin-top: 5px;">Check console for available users</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Discord activity fetch error:', error);
        activityElement.innerHTML = `
            <div style="text-align: center; padding: 15px;">
                <p style="font-size: 14px; margin-bottom: 8px;">🎮 Discord Activity</p>
                <p style="font-size: 12px; opacity: 0.7;">API temporarily unavailable</p>
                <p style="font-size: 11px; opacity: 0.5; margin-top: 5px;">Check back later!</p>
            </div>
        `;
    }
}

/**
 * Toggles the easter egg visibility based on language
 * Only shows in Vietnamese
 * @param {string} lang - Language code ('vi', 'en', 'ja')
 */
function toggleEasterEgg(lang) {
    const heartBeat = document.querySelector('.heart-beat');
    const easterEggImg = document.getElementById('easter-egg-img');
    
    if (lang === 'vi') {
        // Hide heart, show image
        if (heartBeat) heartBeat.style.display = 'none';
        if (easterEggImg) easterEggImg.style.display = 'flex';
    } else {
        // Show heart, hide image
        if (heartBeat) heartBeat.style.display = 'block';
        if (easterEggImg) easterEggImg.style.display = 'none';
    }
}

/**
 * Switches the UI language and updates all translatable elements
 * @param {string} lang - Language code ('vi', 'en', 'ja')
 */
function switchLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('[data-vi]').forEach(element => {
        const key = `data-${lang}`;
        if (element.hasAttribute(key)) {
            if (element.classList.contains('greeting')) {
                return;
            }
            if (element.classList.contains('about-content')) {
                element.innerHTML = element.getAttribute(key);
                calculateAge();
            } else {
                element.textContent = element.getAttribute(key);
            }
        }
    });

    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        const placeholderKey = `data-placeholder-${lang}`;
        if (terminalInput.hasAttribute(placeholderKey)) {
            terminalInput.placeholder = terminalInput.getAttribute(placeholderKey);
        }
    }

    if (window.refreshTerminalFAQ) {
        window.refreshTerminalFAQ();
    }

    // Show/hide easter egg based on language (only Vietnamese)
    toggleEasterEgg(lang);

    document.documentElement.lang = lang;
}

function initCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    const trailCount = 5;
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailCount) * 0.3;
        trail.style.width = (8 - i) + 'px';
        trail.style.height = (8 - i) + 'px';
        document.body.appendChild(trail);
        trails.push({ el: trail, x: 0, y: 0 });
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        let prevX = cursorX, prevY = cursorY;
        trails.forEach((trail, i) => {
            trail.x += (prevX - trail.x) * (0.3 - i * 0.04);
            trail.y += (prevY - trail.y) * (0.3 - i * 0.04);
            trail.el.style.left = trail.x + 'px';
            trail.el.style.top = trail.y + 'px';
            prevX = trail.x;
            prevY = trail.y;
        });
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const hoverElements = document.querySelectorAll('a, button, input, .game-item, .nav-link, .lang-btn, .guild-btn, .github-link, .gaming-link, .terminal-input');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        trails.forEach(t => t.el.style.opacity = '0');
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        trails.forEach((t, i) => t.el.style.opacity = (1 - i / trailCount) * 0.3);
    });
}

function createStars() {
    const starCount = 30;
    const colors = ['', 'purple', 'cyan', 'pink'];
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = `star ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        const side = Math.random() > 0.5 ? 'left' : 'right';
        if (side === 'left') {
            star.style.left = Math.random() * 18 + '%';
        } else {
            star.style.right = Math.random() * 18 + '%';
        }
        
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (1.5 + Math.random() * 2) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';
        
        const size = 2 + Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        document.body.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createStars();
    initCustomCursor();
    typeWriter();

    updateAge();
    setInterval(updateAge, 1000);

    displayQuote();

    fetchGitHubRepos();

    fetchDiscordActivity(true);
    setInterval(() => fetchDiscordActivity(false), 30000);

    // Initialize easter egg visibility based on current language
    toggleEasterEgg(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Only prevent default for hash links (internal navigation)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // For external links (like clone/index.html), let them work normally
        });
    });

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    const sections = document.querySelectorAll('#aboutme, #github');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));

    (function setupGameCopy() {
        const gameItems = document.querySelectorAll('.game-grid .game-item[title]:not([title=""])');
        const timers = new Map();

        async function copyText(text) {
            if (!text) return false;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                    return true;
                }
            } catch (err) {
            }
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (err) {
                return false;
            }
        }

        let toastEl;
        function ensureToast() {
            if (toastEl) return toastEl;
            toastEl = document.createElement('div');
            toastEl.className = 'copy-toast';
            document.body.appendChild(toastEl);
            return toastEl;
        }

        function showCopyToast(msg) {
            const t = ensureToast();
            t.textContent = msg;
            t.classList.add('show');
            clearTimeout(t._timer);
            t._timer = setTimeout(() => t.classList.remove('show'), 1500);
        }

        gameItems.forEach(el => {
            el.classList.add('copyable');

            el.addEventListener('click', async (e) => {
                e.preventDefault();
                const title = (el.getAttribute('title') || '').trim();
                if (!title) return;
                
                const toCopy = title.includes(':') 
                    ? title.split(':').slice(1).join(':').trim() 
                    : title;

                const ok = await copyText(toCopy);
                if (!ok) return;

                document.querySelectorAll('.game-item.copied').forEach(item => {
                    if (item !== el) {
                        item.classList.remove('copied');
                        if (timers.has(item)) {
                            clearTimeout(timers.get(item));
                            timers.delete(item);
                        }
                    }
                });

                el.classList.add('copied');
                if (timers.has(el)) {
                    clearTimeout(timers.get(el));
                }
                const t = setTimeout(() => {
                    el.classList.remove('copied');
                    timers.delete(el);
                }, 1700);
                timers.set(el, t);

                showCopyToast(`Copied: ${toCopy}`);
            });
        });
    })();

    (function initTerminalFAQ() {
        const faqDataAll = {
            vi: [
                {
                    q: "Bạn biết được bao nhiêu ngôn ngữ lập trình thế?",
                    a: "Thực ra thì tôi cũng không biết nhiều lắm đâu.\nChỉ biết 1 số ngôn ngữ như là: C, Python, Java, JavaScript, Rust thôi"
                },
                {
                    q: "Sao bạn lại tạo ra cái web này thế?",
                    a: "Tại vì tui chán, thế thui 😎"
                },
                {
                    q: "Đéo liên quan lắm nhưng specs PC của bạn là gì thế?",
                    a: "Không liên quan thật...\nNhưng thôi đây này:\n💻 i5 4590 | GTX 1050 | 16GB DDR3"
                },
                {
                    q: "Tại sao bạn lại chọn vô ngành này?",
                    a: "Vì tui có đam mê với môn vật lý và có sở thích với mấy cái bo mạch 🔧"
                },
                {
                    q: "Bạn có ngại kết bạn mới không?",
                    a: "Không, bạn có thể kết bạn với tui qua Discord nha hoặc Facebook cũng được! 🤝"
                }
            ],
            en: [
                {
                    q: "How many programming languages do you know?",
                    a: "Actually, I don't know that many.\nJust some languages like: C, Python, Java, JavaScript, Rust"
                },
                {
                    q: "Why did you create this website?",
                    a: "Because I was bored, that's it 😎"
                },
                {
                    q: "Not really related but what are your PC specs?",
                    a: "Not related indeed...\nBut here you go:\n💻 i5 4590 | GTX 1050 | 16GB DDR3"
                },
                {
                    q: "Why did you choose this major?",
                    a: "Because I have a passion for physics and an interest in circuit boards 🔧"
                },
                {
                    q: "Are you open to making new friends?",
                    a: "Yes! You can add me on Discord or Facebook! 🤝"
                }
            ],
            ja: [
                {
                    q: "プログラミング言語はいくつ知っていますか？",
                    a: "実はそんなに多くは知らないんです。\nC、Python、Java、JavaScript、Rustくらいです"
                },
                {
                    q: "なぜこのウェブサイトを作ったの？",
                    a: "暇だったから、それだけ 😎"
                },
                {
                    q: "関係ないけど、PCのスペックは？",
                    a: "確かに関係ないね...\nでもこれです：\n💻 i5 4590 | GTX 1050 | 16GB DDR3"
                },
                {
                    q: "なぜこの専攻を選んだの？",
                    a: "物理学が好きで、回路基板に興味があるから 🔧"
                },
                {
                    q: "新しい友達を作ることに抵抗はある？",
                    a: "ないよ！DiscordかFacebookで友達になれるよ！ 🤝"
                }
            ]
        };

        const uiStrings = {
            vi: {
                welcome1: "┌──────────────────────────────────────────────────┐",
                welcome2: "│   Chào mừng đến với chương mục hỏi và đáp! 💻    │",
                welcome3: "└──────────────────────────────────────────────────┘",
                selectQuestion: "Chọn câu hỏi bạn muốn biết:",
                enterNumber: "Nhập số (1-5) rồi nhấn Enter...",
                askAgain: "Bạn còn gì muốn hỏi không?",
                yesOption: "[Y] Có, cho tui xem lại menu",
                noOption: "[N] Không, cảm ơn",
                goodbye: "✨ Chúc bạn 1 ngày vui vẻ! ✨",
                restart: "Nhấn Enter để bắt đầu lại...",
                invalidNumber: "⚠️ Số không hợp lệ! Vui lòng nhập từ 1-5",
                invalidYN: "⚠️ Vui lòng nhập Y hoặc N"
            },
            en: {
                welcome1: "┌──────────────────────────────────────────────────┐",
                welcome2: "│          Welcome to FAQ Terminal! 💻             │",
                welcome3: "└──────────────────────────────────────────────────┘",
                selectQuestion: "Select a question you want to know:",
                enterNumber: "Enter a number (1-5) then press Enter...",
                askAgain: "Do you have any other questions?",
                yesOption: "[Y] Yes, show me the menu again",
                noOption: "[N] No, thanks",
                goodbye: "✨ Have a nice day! ✨",
                restart: "Press Enter to restart...",
                invalidNumber: "⚠️ Invalid number! Please enter 1-5",
                invalidYN: "⚠️ Please enter Y or N"
            },
            ja: {
                welcome1: "┌──────────────────────────────────────────────────┐",
                welcome2: "│        FAQ ターミナルへようこそ! 💻              │",
                welcome3: "└──────────────────────────────────────────────────┘",
                selectQuestion: "知りたい質問を選んでください：",
                enterNumber: "番号 (1-5) を入力してEnterを押してください...",
                askAgain: "他に質問はありますか？",
                yesOption: "[Y] はい、メニューを見せて",
                noOption: "[N] いいえ、ありがとう",
                goodbye: "✨ 良い一日を! ✨",
                restart: "Enterを押して再開...",
                invalidNumber: "⚠️ 無効な番号です！1-5を入力してください",
                invalidYN: "⚠️ YまたはNを入力してください"
            }
        };

        function getFaqData() {
            return faqDataAll[currentLang] || faqDataAll.vi;
        }

        function getUI() {
            return uiStrings[currentLang] || uiStrings.vi;
        }

        const terminalOutput = document.getElementById('terminal-output');
        const terminalInput = document.getElementById('terminal-input');
        
        if (!terminalOutput || !terminalInput) return;

        let state = 'menu';
        let isTyping = false;
        let typeQueue = [];

        function typewriterEffect(element, text, speed = 20) {
            return new Promise((resolve) => {
                let i = 0;
                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                element.appendChild(cursor);
                
                function type() {
                    if (i < text.length) {
                        if (text[i] === '<') {
                            const closeIndex = text.indexOf('>', i);
                            if (closeIndex !== -1) {
                                const tag = text.substring(i, closeIndex + 1);
                                element.insertBefore(document.createRange().createContextualFragment(tag), cursor);
                                i = closeIndex + 1;
                                type();
                                return;
                            }
                        }
                        
                        const char = document.createTextNode(text[i]);
                        element.insertBefore(char, cursor);
                        i++;
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                        setTimeout(type, speed);
                    } else {
                        cursor.remove();
                        resolve();
                    }
                }
                type();
            });
        }

        async function addLine(text, className = '', useTypewriter = false, speed = 15) {
            const line = document.createElement('div');
            line.className = `terminal-line ${className}`;
            terminalOutput.appendChild(line);
            
            if (useTypewriter && text) {
                await typewriterEffect(line, text, speed);
            } else {
                line.innerHTML = text;
            }
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        async function addLines(lines) {
            isTyping = true;
            terminalInput.disabled = true;
            
            for (const lineData of lines) {
                if (Array.isArray(lineData)) {
                    await addLine(lineData[0], lineData[1] || '', lineData[2] || false, lineData[3] || 15);
                } else {
                    await addLine(lineData);
                }
                await sleep(50);
            }
            
            isTyping = false;
            terminalInput.disabled = false;
            terminalInput.focus({ preventScroll: true });
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function clearTerminal() {
            terminalOutput.innerHTML = '';
        }

        async function showMenu() {
            state = 'menu';
            const ui = getUI();
            const faqData = getFaqData();
            
            const lines = [
                [ui.welcome1, 'prompt', true, 8],
                [ui.welcome2, 'prompt', true, 8],
                [ui.welcome3, 'prompt', true, 8],
                ['', ''],
                [ui.selectQuestion, 'system', true, 20],
                ['', '']
            ];
            
            faqData.forEach((faq, index) => {
                lines.push([`  [${index + 1}] ${faq.q}`, 'question', true, 12]);
            });
            
            lines.push(['', '']);
            lines.push([ui.enterNumber, 'highlight', true, 25]);
            
            await addLines(lines);
        }

        async function showAnswer(index) {
            clearTerminal();
            
            const ui = getUI();
            const faqData = getFaqData();
            const faq = faqData[index];
            
            const lines = [
                [`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${faq.q}`, 'question', true, 20],
                ['', ''],
                [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${faq.a}`, 'answer', true, 18],
                ['', ''],
                ['────────────────────────────────────────', 'prompt', true, 5],
                ['', ''],
                [ui.askAgain, 'highlight', true, 25],
                [`  ${ui.yesOption}`, 'question', true, 15],
                [`  ${ui.noOption}`, 'question', true, 15]
            ];
            
            await addLines(lines);
            state = 'askAgain';
        }

        async function handleInput(input) {
            if (isTyping) return;
            
            const ui = getUI();
            const faqData = getFaqData();
            const value = input.trim().toLowerCase();
            
            if (state === 'menu') {
                const num = parseInt(value);
                await addLine(`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${value}`, 'success');
                if (num >= 1 && num <= faqData.length) {
                    await showAnswer(num - 1);
                } else {
                    await addLine(ui.invalidNumber, 'system', true, 20);
                }
            } else if (state === 'askAgain') {
                await addLine(`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${value}`, 'success');
                if (value === 'y' || value === 'yes' || value === 'có' || value === '1' || value === 'はい') {
                    await sleep(300);
                    clearTerminal();
                    await showMenu();
                } else if (value === 'n' || value === 'no' || value === 'không' || value === '2' || value === 'いいえ') {
                    clearTerminal();
                    await addLine('', '');
                    await addLine(`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.goodbye}`, 'success', true, 30);
                    await addLine('', '');
                    await addLine(ui.restart, 'system', true, 25);
                    state = 'waiting';
                } else {
                    await addLine(ui.invalidYN, 'system', true, 20);
                }
            } else if (state === 'waiting') {
                clearTerminal();
                await showMenu();
            }
        }

        window.refreshTerminalFAQ = function() {
            if (!isTyping) {
                clearTerminal();
                showMenu();
            }
        };

        showMenu();

        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = terminalInput.value;
                terminalInput.value = '';
                if (value.trim() || state === 'waiting') {
                    handleInput(value);
                }
            }
        });

        document.querySelector('.terminal-container')?.addEventListener('click', () => {
            if (!isTyping) terminalInput.focus({ preventScroll: true });
        });
    })();

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const testCase = urlParams.get('activityTest');
        if (testCase && window.renderActivityForUser) {
            const sample = {
                username: 'bokuwa_buta.san',
                avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
                status: 'online',
                activities: []
            };
            if (testCase === 'none') {
            } else if (testCase === 'game') {
                sample.activities.push({ name: 'Elden Ring', details: 'Exploring the map', state: 'In-game' });
            } else if (testCase === 'music') {
                sample.activities.push({ name: 'Spotify', details: 'Desire', state: 'Perfume', assets: { largeImageURL: 'https://via.placeholder.com/150' } });
            } else if (testCase === 'both') {
                sample.activities.push({ name: 'Spotify', details: 'Desire', state: 'Perfume', assets: { largeImageURL: 'https://via.placeholder.com/150' } });
                sample.activities.push({ name: 'Elden Ring', details: 'Exploring the map', state: 'In-game' });
            }
            setTimeout(() => {
                try {
                    window.renderActivityForUser(sample);
                    console.log('Activity test executed:', testCase);
                } catch (e) {
                    console.warn('Activity test execution failed:', e);
                }
            }, 100);
        }
    } catch (e) {
    }
});
