const terminalOutput = document.getElementById('terminal-output');
const terminalActions = document.getElementById('terminal-actions');
const redDot = document.querySelector('.terminal-dot.red');

let currentLang = 'vi';
let state = 'booting';
let isTyping = false;

const translations = {
    vi: {
        booting: {
            title: 'Hoshimiya Portfolio Terminal v1.0.0',
            init: 'Đang khởi động hệ thống...',
            modules: 'Đang tải modules...',
            apis: 'Đang kết nối đến APIs...',
            ready: 'Sẵn sàng!',
            welcome: 'Chào mừng đến với Hồ sơ của Phan Chí Vỹ! 💻',
            select: 'Chọn ngôn ngữ bạn muốn sử dụng:',
            lang1: '[1] Tiếng Việt',
            lang2: '[2] English',
            lang3: '[3] 日本語',
            enterLang: 'Tap a number below to select language...',
            selectWhat: 'Chọn điều bạn muốn biết:',
            enterNumber: 'Tap a number below to select...',
            invalidLang: 'Số không hợp lệ! Vui lòng nhập từ 1-3',
            invalidNumber: 'bạn gì ơi, bạn đánh sai hay bạn bị ngoo vậy 💀? TAO BẢO TỪ 1-9',
            relationship: 'Tình Trạng',
            relationshipStatus: 'Đã Có nóc nhà òi ❤️',
            changeLanguage: 'Thay Đổi Ngôn Ngữ',
            returnMenu: 'Tap menu button to return...',
            closed: 'Terminal đã đóng',
            returnToGUI: 'Quay lại GUI mode'
        },
        menu: [
            { num: 1, title: 'Về Tôi' },
            { num: 2, title: 'Dự án GitHub' },
            { num: 3, title: 'Hoạt động trên Discord của tôi' },
            { num: 4, title: 'Game Yêu Thích của tôi' },
            { num: 5, title: 'Quote truyền động lực sau khi lọ' },
            { num: 6, title: 'thêm thông tin về Discord Server của tôi' },
            { num: 7, title: 'check trạng thái người yêu' },
            { num: 8, title: 'Thay Đổi Ngôn Ngữ' },
            { num: 9, title: 'Quay lại GUI mode' }
        ]
    },
    en: {
        booting: {
            title: 'Hoshimiya Portfolio Terminal v1.0.0',
            init: 'Initializing system...',
            modules: 'Loading modules...',
            apis: 'Connecting to APIs...',
            ready: 'Ready!',
            welcome: 'Welcome to Phan Chí Vỹ Portfolio Terminal! 💻',
            select: 'Select language you want to use:',
            lang1: '[1] Vietnamese',
            lang2: '[2] English',
            lang3: '[3] Japanese',
            enterLang: 'Tap a number below to select language...',
            selectWhat: 'Select what you want to know:',
            enterNumber: 'Tap a number below to select...',
            invalidLang: 'Invalid number! Please enter 1-3',
            invalidNumber: 'Invalid number! Please enter 1-9',
            relationship: 'Relationship Status',
            relationshipStatus: 'Taken ❤️. Girls, stay out of my way. no one can compare with my queen. she is the best',
            changeLanguage: 'Change Language',
            returnMenu: 'Tap menu button to return...',
            closed: 'Terminal closed',
            returnToGUI: 'Return to GUI mode'
        },
        menu: [
            { num: 1, title: 'About Me' },
            { num: 2, title: 'GitHub Projects' },
            { num: 3, title: 'Discord Activity' },
            { num: 4, title: 'Favorite Games' },
            { num: 5, title: 'Quote of the Day' },
            { num: 6, title: 'Discord Server' },
            { num: 7, title: 'Relationship Status' },
            { num: 8, title: 'Change Language' },
            { num: 9, title: 'Return to GUI mode' }
        ]
    },
    ja: {
        booting: {
            title: 'Hoshimiya Portfolio Terminal v1.0.0',
            init: 'システムを初期化中...',
            modules: 'モジュールを読み込み中...',
            apis: 'APIに接続中...',
            ready: '準備完了！',
            welcome: 'Phan Chí Vỹ Portfolio Terminalへようこそ！ 💻',
            select: '使用する言語を選択してください：',
            lang1: '[1] ベトナム語',
            lang2: '[2] 英語',
            lang3: '[3] 日本語',
            enterLang: '下の番号をタップして言語を選択してください...',
            selectWhat: '知りたいことを選んでください：',
            enterNumber: '下の番号をタップして選択してください...',
            invalidLang: '無効な番号です！1-3を入力してください',
            invalidNumber: '無効な番号です！1-9を入力してください',
            relationship: '恋愛状況',
            relationshipStatus: '彼女あり ❤️',
            changeLanguage: '言語を変更',
            returnMenu: 'メニューボタンをタップして戻る...',
            closed: 'ターミナルが閉じられました',
            returnToGUI: 'GUIモードに戻る'
        },
        menu: [
            { num: 1, title: '自己紹介' },
            { num: 2, title: 'GitHubプロジェクト' },
            { num: 3, title: 'Discordアクティビティ' },
            { num: 4, title: 'お気に入りのゲーム' },
            { num: 5, title: '今日の名言' },
            { num: 6, title: 'Discordサーバー' },
            { num: 7, title: '恋愛状況' },
            { num: 8, title: '言語を変更' },
            { num: 9, title: 'GUIモードに戻る' }
        ]
    }
};

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

const games = [
    { name: 'Elden Ring', title: '' },
    { name: 'dead by daylight', title: 'steamid: 76561199580084775s' },
    { name: 'Genshin Impact', title: 'UID: 819369165' },
    { name: 'Honkai: star rail', title: 'UID: 801239878' },
    { name: 'zenless zone zero', title: 'UID: 1300969124' },
    { name: 'League of Legends', title: 'con heo gian ác#TERA' },
    { name: 'Valorant', title: 'con heo gian ác#TERA' },
    { name: 'CS2', title: 'steamid: 76561199580084775s' },
    { name: 'Minecraft', title: '' },
    { name: 'Sekiro: Shadows Die Twice', title: '' },
    { name: 'roblox', title: 'username: huygaming09youtube' },
    { name: 'project sekai', title: '' }
];

function getUI() {
    return translations[currentLang] || translations.vi;
}

function calculateAge() {
    const birthDate = new Date(2006, 5, 23, 0, 0, 0);
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        years--;
    }
    return years;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTextWidth(text) {
    let width = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        if ((code >= 0x3040 && code <= 0x309F) || 
            (code >= 0x30A0 && code <= 0x30FF) ||
            (code >= 0x4E00 && code <= 0x9FAF) ||
            (code >= 0x3400 && code <= 0x4DBF) ||
            (code >= 0x20000 && code <= 0x2A6DF) ||
            (code >= 0xFF00 && code <= 0xFFEF)) {
            width += 2;
        } else {
            width += 1;
        }
    }
    return width;
}

function createBox(text) {
    const cleanText = text.replace(/<[^>]*>/g, '');
    const textWidth = getTextWidth(cleanText);
    const padding = 3;
    const contentWidth = textWidth + (padding * 2);
    const dashes = '─'.repeat(contentWidth);
    
    const spacesBefore = ' '.repeat(padding);
    const spacesAfter = ' '.repeat(padding);
    
    return {
        top: `┌${dashes}┐`,
        middle: `│${spacesBefore}${text}${spacesAfter}│`,
        bottom: `└${dashes}┘`
    };
}

function typewriterEffect(element, text, speed = 1.5) {
    return new Promise((resolve) => {
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);
        
        function type() {
            if (i < text.length) {
                if (text[i] === '<') {
                    const closeIndex = text.indexOf('>', i);
                    if (closeIndex !== -1) {
                        const tag = text.substring(i, closeIndex + 1);
                        cursor.insertAdjacentHTML('beforebegin', tag);
                        i = closeIndex + 1;
                        type();
                        return;
                    }
                }
                cursor.insertAdjacentText('beforebegin', text[i]);
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

async function addLine(text, className = '', useTypewriter = false, speed = 1.5) {
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
    clearActions();
    
    for (const lineData of lines) {
        if (Array.isArray(lineData)) {
            await addLine(lineData[0], lineData[1] || '', lineData[2] || false, lineData[3] || 1.5);
        } else {
            await addLine(lineData);
        }
        await sleep(30);
    }
    
    isTyping = false;
}

function clearTerminal() {
    terminalOutput.innerHTML = '';
}

function clearActions() {
    if (terminalActions) {
        terminalActions.innerHTML = '';
    }
}

function createButton(number, text, onClick) {
    const button = document.createElement('button');
    button.className = 'action-button';
    button.innerHTML = `<span class="number">[${number}]</span><span class="text">${text}</span>`;
    button.addEventListener('click', onClick);
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onClick();
    }, { passive: false });
    return button;
}

function showActionButtons(buttons) {
    clearActions();
    if (!terminalActions) return;
    
    const container = document.createElement('div');
    container.className = 'action-buttons';
    
    buttons.forEach(btn => {
        container.appendChild(btn);
    });
    
    terminalActions.appendChild(container);
}

async function showBooting() {
    const ui = getUI();
    const titleBox = createBox(ui.booting.title);
    const bootLines = [
        [titleBox.top, 'prompt', true, 1.5],
        [titleBox.middle, 'system', true, 1.5],
        [titleBox.bottom, 'prompt', true, 1.5],
        ['', ''],
        [`[*] ${ui.booting.init}`, 'system', true, 1.5],
        [`[✓] ${ui.booting.modules}`, 'success', true, 1.5],
        [`[✓] ${ui.booting.apis}`, 'success', true, 1.5],
        [`[✓] ${ui.booting.ready}`, 'success', true, 1.5],
        ['', ''],
    ];
    
    await addLines(bootLines);
    await sleep(500);
    await showLanguageSelection();
}

async function showLanguageSelection() {
    state = 'language';
    clearTerminal();
    const ui = getUI();
    
    const welcomeBox = createBox(ui.booting.welcome);
    const lines = [
        [welcomeBox.top, 'prompt', true, 1.5],
        [welcomeBox.middle, 'system', true, 1.5],
        [welcomeBox.bottom, 'prompt', true, 1.5],
        ['', ''],
        [ui.booting.select, 'system', true, 1.5],
        ['', ''],
        [`  ${ui.booting.lang1}`, 'output', true, 1.5],
        [`  ${ui.booting.lang2}`, 'output', true, 1.5],
        [`  ${ui.booting.lang3}`, 'output', true, 1.5],
        ['', ''],
        [ui.booting.enterLang, 'highlight', true, 1.5]
    ];
    
    await addLines(lines);
    showLanguageButtons();
}

function showLanguageButtons() {
    const ui = getUI();
    const buttons = [
        createButton(1, ui.booting.lang1.replace('[1] ', ''), async () => {
            if (isTyping) return;
            await addLine(`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> 1`, 'command');
            currentLang = 'vi';
            await showMenu();
        }),
        createButton(2, ui.booting.lang2.replace('[2] ', ''), async () => {
            if (isTyping) return;
            await addLine(`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> 2`, 'command');
            currentLang = 'en';
            await showMenu();
        }),
        createButton(3, ui.booting.lang3.replace('[3] ', ''), async () => {
            if (isTyping) return;
            await addLine(`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> 3`, 'command');
            currentLang = 'ja';
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showMenu() {
    state = 'menu';
    clearTerminal();
    const ui = getUI();
    
    const welcomeBox = createBox(ui.booting.welcome);
    const lines = [
        [welcomeBox.top, 'prompt', true, 1.5],
        [welcomeBox.middle, 'system', true, 1.5],
        [welcomeBox.bottom, 'prompt', true, 1.5],
        ['', ''],
        [ui.booting.selectWhat, 'system', true, 1.5],
        ['', '']
    ];
    
    ui.menu.forEach(item => {
        lines.push([`  [${item.num}] ${item.title}`, 'output', true, 1.5]);
    });
    
    lines.push(['', '']);
    lines.push([ui.booting.enterNumber, 'highlight', true, 1.5]);
    
    await addLines(lines);
    showMenuButtons();
}

function showMenuButtons() {
    const ui = getUI();
    const buttons = ui.menu.map(item => {
        return createButton(item.num, item.title, async () => {
            if (isTyping) return;
            await addLine(`<span class="user-prompt guest">@guest</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${item.num}`, 'command');
            
            if (item.num === 9) {
                await showReturnToGUI();
            } else {
                const menuFuncs = [showAbout, showProjects, showActivity, showGames, showQuote, showDiscord, showRelationship, showLanguageMenu];
                await menuFuncs[item.num - 1]();
            }
        });
    });
    showActionButtons(buttons);
}

async function showAbout() {
    clearTerminal();
    const age = calculateAge();
    const ui = getUI();
    
    const aboutText = {
        vi: [
            `Hello! I'm Chí Vỹ, a ${age}-year-old student currently studying at IUH`,
            '(Industrial University of Ho Chi Minh City), majoring in IC Design.',
            '',
            'I\'m a free-spirited person who loves exploring new things and',
            'isn\'t afraid of challenges. Although I\'m studying IC design,',
            'I\'m also passionate about coding, design, and everything tech-related.',
            '',
            'Life is only once, so I want to enjoy every moment and learn',
            'as much as possible! 🌟🌟'
        ],
        en: [
            `Hello! I'm Chí Vỹ, a ${age}-year-old student currently studying at IUH`,
            '(Industrial University of Ho Chi Minh City), majoring in IC Design.',
            '',
            'I\'m a free-spirited person who loves exploring new things and',
            'isn\'t afraid of challenges. Although I\'m studying IC design,',
            'I\'m also passionate about coding, design, and everything tech-related.',
            '',
            'Life is only once, so I want to enjoy every moment and learn',
            'as much as possible! 🌟🌟'
        ],
        ja: [
            `こんにちは！私はチーヴィー、${age}歳で、現在IUH`,
            '（ホーチミン市工業大学）で集積回路設計を専攻しています。',
            '',
            '自由な精神を持ち、新しいことを探求するのが大好きで、',
            '挑戦を恐れません。集積回路を勉強していますが、',
            'プログラミング、デザイン、そして技術に関するすべてに情熱を持っています。',
            '',
            '人生は一度きりなので、すべての瞬間を楽しみ、',
            'できるだけ多くのことを学びたいです！ 🌟🌟'
        ]
    };
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[0].title}`, 'system', true, 1.5],
        ['', '']
    ];
    
    aboutText[currentLang].forEach(line => {
        lines.push([line, 'output', true, 1.5]);
    });
    
    lines.push(['', '']);
    lines.push(['────────────────────────────────────────', 'prompt', true, 1.5]);
    lines.push(['', '']);
    lines.push([ui.booting.returnMenu, 'highlight', true, 1.5]);
    
    await addLines(lines);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showProjects() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[1].title}`, 'system', true, 1.5],
        ['', ''],
        ['Fetching repositories...', 'system', true, 1.5]
    ];
    
    await addLines(lines);
    
    try {
        const response = await fetch('https://api.github.com/users/ChiVy2306/repos?sort=updated&per_page=5');
        const repos = await response.json();
        
        if (repos && repos.length > 0) {
            const repoLines = [['', '']];
            repos.forEach(repo => {
                repoLines.push([`<span class="highlight">${repo.name}</span>`, 'output', true, 1.5]);
                repoLines.push([`  ${repo.description || 'No description'}`, 'output', true, 1.5]);
                repoLines.push([`  ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}`, 'output', true, 1.5]);
                repoLines.push([`  <a href="${repo.html_url}" target="_blank">${repo.html_url}</a>`, 'output', true, 1.5]);
                repoLines.push(['', '']);
            });
            repoLines.push(['<a href="https://github.com/ChiVy2306" target="_blank">View all on GitHub →</a>', 'output', true, 1.5]);
            await addLines(repoLines);
        } else {
            await addLine('No repositories found.', 'error', true, 1.5);
        }
    } catch (error) {
        await addLine('Unable to fetch repositories. 😅', 'error', true, 1.5);
    }
    
    await addLine('', '');
    await addLine('────────────────────────────────────────', 'prompt', true, 1.5);
    await addLine('', '');
    await addLine(ui.booting.returnMenu, 'highlight', true, 1.5);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showActivity() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[2].title}`, 'system', true, 1.5],
        ['', ''],
        ['Fetching activity...', 'system', true, 1.5]
    ];
    
    await addLines(lines);
    
    try {
        const response = await fetch('https://data-fetcher-p8pv.onrender.com/api/users', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('API error');
        
        const result = await response.json();
        const data = result.data || result;
        let user = null;
        
        if (Array.isArray(data)) {
            user = data.find(u => {
                const username = u.username || u.discord_name || u.name || (u.user && u.user.username);
                return username === 'bokuwa_buta.san' || username === '@bokuwa_buta.san';
            });
        }
        
        const activityLines = [['', '']];
        
        if (user) {
            const displayName = user.username || user.discord_name || user.name || 'bokuwa_buta.san';
            activityLines.push([`<span class="highlight">${displayName}</span>`, 'system', true, 1.5]);
            activityLines.push(['', '']);
            
            let games = [];
            let music = null;
            let customStatus = null;
            
            if (user.activities && user.activities.length > 0) {
                user.activities.forEach(a => {
                    if (!a) return;
                    const name = (a.name || '').toString();
                    const type = typeof a.type === 'number' ? a.type : parseInt(a.type) || -1;
                    const details = a.details || '';
                    const state = a.state || '';
                    
                    const isSpotify = type === 2 || name.toLowerCase() === 'spotify' || 
                        /listening/i.test(String(type)) || /spotify/i.test(a.url || '') ||
                        (a.sync_id && a.party);
                    
                    const isCustomStatus = type === 4 || name.toLowerCase() === 'custom status' ||
                        (name === '' && state && !details);
                    
                    if (isSpotify) {
                        music = { track: details || name, artist: state };
                    } else if (isCustomStatus) {
                        customStatus = { state: state || details || a.emoji?.name || '' };
                    } else if (name && name.toLowerCase() !== 'custom status') {
                        games.push({ name, details, state });
                    }
                });
            }
            
            if (music) {
                activityLines.push(['🎵 Listening to:', 'output', true, 1.5]);
                activityLines.push([`  ${music.track}`, 'output', true, 1.5]);
                if (music.artist) activityLines.push([`  by ${music.artist}`, 'output', true, 1.5]);
                activityLines.push(['', '']);
            }
            
            if (games.length > 0) {
                activityLines.push(['🎮 Currently Playing:', 'output', true, 1.5]);
                games.forEach(g => {
                    activityLines.push([`  ${g.name}`, 'output', true, 1.5]);
                    if (g.details) activityLines.push([`    ${g.details}`, 'output', true, 1.5]);
                    if (g.state) activityLines.push([`    ${g.state}`, 'output', true, 1.5]);
                });
                activityLines.push(['', '']);
            }
            
            if (customStatus) {
                activityLines.push(['💬 Custom Status:', 'output', true, 1.5]);
                activityLines.push([`  ${customStatus.state}`, 'output', true, 1.5]);
                activityLines.push(['', '']);
            }
            
            if (!music && games.length === 0 && !customStatus) {
                activityLines.push(['😴 Not playing anything', 'output', true, 1.5]);
                activityLines.push(['', '']);
            }
        } else {
            activityLines.push(['User not found 🤔', 'error', true, 1.5]);
            activityLines.push(['', '']);
        }
        
        await addLines(activityLines);
    } catch (error) {
        await addLine('Unable to fetch activity. API temporarily unavailable.', 'error', true, 1.5);
        await addLine('', '');
    }
    
    await addLine('────────────────────────────────────────', 'prompt', true, 1.5);
    await addLine('', '');
    await addLine(getUI().booting.returnMenu, 'highlight', true, 1.5);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showGames() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[3].title}`, 'system', true, 1.5],
        ['', ''],
        ['Click on a game to copy its ID/username:', 'output', true, 1.5],
        ['', '']
    ];
    
    await addLines(lines);
    
    const gameGrid = document.createElement('div');
    gameGrid.className = 'game-grid';
    games.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.textContent = game.name;
        if (game.title) {
            gameItem.title = game.title;
            gameItem.addEventListener('click', async () => {
                const toCopy = game.title.includes(':') 
                    ? game.title.split(':').slice(1).join(':').trim() 
                    : game.title;
                try {
                    await navigator.clipboard.writeText(toCopy);
                    await addLine(`Copied: ${toCopy}`, 'success', true, 1.5);
                } catch (e) {
                    await addLine('Failed to copy', 'error', true, 1.5);
                }
            });
        }
        gameGrid.appendChild(gameItem);
    });
    
    terminalOutput.appendChild(gameGrid);
    await addLine('', '');
    await addLine('────────────────────────────────────────', 'prompt', true, 1.5);
    await addLine('', '');
    await addLine(getUI().booting.returnMenu, 'highlight', true, 1.5);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showQuote() {
    clearTerminal();
    const ui = getUI();
    
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const quote = quotes[dayOfYear % quotes.length];
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[4].title}`, 'system', true, 1.5],
        ['', ''],
        [`<div class="quote-box">${quote.text}<div class="quote-author">${quote.author}</div></div>`, 'output', true, 1.5],
        ['', ''],
        ['────────────────────────────────────────', 'prompt', true, 1.5],
        ['', ''],
        [ui.booting.returnMenu, 'highlight', true, 1.5]
    ];
    
    await addLines(lines);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showDiscord() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[5].title}`, 'system', true, 3],
        ['', ''],
        ['If you\'re interested, here\'s my personal Discord server!', 'output', true, 1.5],
        ['More info about my second home is in the "see more" button~', 'output', true, 1.5],
        ['', ''],
        ['<a href="https://discord.gg/25pTutE3ky" target="_blank">Join Server →</a>', 'output', true, 1.5],
        ['<a href="https://chivy2306.github.io/Teratory/" target="_blank">Learn More →</a>', 'output', true, 1.5],
        ['', ''],
        ['────────────────────────────────────────', 'prompt', true, 1.5],
        ['', ''],
        [ui.booting.returnMenu, 'highlight', true, 1.5]
    ];
    
    await addLines(lines);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showRelationship() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[6].title}`, 'system', true, 3],
        ['', ''],
        ['<span style="font-size: 48px;">❤️</span>', 'output', true, 1.5],
        ['', ''],
        [`<span class="highlight" style="font-size: 24px; font-weight: bold;">${ui.booting.relationshipStatus}</span>`, 'output', true, 1.5],
        ['', ''],
        ['────────────────────────────────────────', 'prompt', true, 1.5],
        ['', ''],
        [ui.booting.returnMenu, 'highlight', true, 1.5]
    ];
    
    await addLines(lines);
    state = 'waiting';
    showMenuButton();
}

function showMenuButton() {
    const buttons = [
        createButton('Menu', 'Return to Menu', async () => {
            if (isTyping) return;
            await showMenu();
        })
    ];
    showActionButtons(buttons);
}

async function showLanguageMenu() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[7].title}`, 'system', true, 3],
        ['', ''],
        [ui.booting.select, 'system', true, 1.5],
        ['', ''],
        [`  ${ui.booting.lang1}`, 'output', true, 1.5],
        [`  ${ui.booting.lang2}`, 'output', true, 1.5],
        [`  ${ui.booting.lang3}`, 'output', true, 1.5],
        ['', ''],
        [ui.booting.enterLang, 'highlight', true, 1.5]
    ];
    
    await addLines(lines);
    state = 'language';
    showLanguageButtons();
}

async function showReturnToGUI() {
    clearTerminal();
    const ui = getUI();
    
    const lines = [
        [`<span class="user-prompt hoshimiya">@hoshimiya</span><span class="prompt-symbol">#</span> <span class="prompt-path">~</span> ${ui.menu[8].title}`, 'system', true, 3],
        ['', ''],
        ['Redirecting to GUI mode...', 'output', true, 1.5],
        ['', '']
    ];
    
    await addLines(lines);
    await sleep(1500);
    window.location.href = '../../index.html';
}

async function closeTerminal() {
    const ui = getUI();
    clearTerminal();
    
    await addLine(ui.booting.closed, 'system', true, 1.5);
    await sleep(1000);
    
    document.querySelector('.terminal-container').style.display = 'none';
    showGUI();
}

function showGUI() {
    const gui = document.createElement('div');
    gui.className = 'gui-container';
    gui.innerHTML = `
        <div class="gui-content">
            <h1>Portfolio</h1>
            <p>Terminal has been closed.</p>
            <button onclick="location.reload()" class="gui-button">Restart Terminal</button>
        </div>
    `;
    document.querySelector('.terminal-wrapper').appendChild(gui);
}

redDot.addEventListener('click', () => {
    if (!isTyping) {
        closeTerminal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showBooting();
});
