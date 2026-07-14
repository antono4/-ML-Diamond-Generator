// ========================================
// ML Diamond Rewards - JavaScript
// ========================================

// State Management
let currentUser = null;
let currentTask = null;
let currentReward = null;

// Available Tasks
const tasks = [
    {
        id: 1,
        title: "Isi Survei Mini",
        type: "survei",
        icon: "📋",
        description: "Jawab 5 pertanyaan singkat tentang preferensi gaming Anda.",
        reward: 50,
        duration: "2-3 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Jawab 5 pertanyaan survei",
            "Tunggu konfirmasi",
            "Poin akan langsung masuk"
        ]
    },
    {
        id: 2,
        title: "Tonton Video Promosi",
        type: "video",
        icon: "🎬",
        description: "Tonton video pendek tentang game terbaru dan dapatkan reward.",
        reward: 25,
        duration: "1-2 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Tonton video hingga selesai",
            "Verifikasi penayangan",
            "Poin akan langsung masuk"
        ]
    },
    {
        id: 3,
        title: "Unduh & Coba App",
        type: "download",
        icon: "📱",
        description: "Instal aplikasi partner dan buka selama 30 detik.",
        reward: 100,
        duration: "2 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Ikuti link untuk download",
            "Buka aplikasi selama 30 detik",
            "Kembali ke sini untuk klaim poin"
        ]
    },
    {
        id: 4,
        title: "Main Game Mini",
        type: "game",
        icon: "🎮",
        description: "Selesaikan 3 level game mini untuk mendapatkan poin bonus.",
        reward: 75,
        duration: "3-5 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Buka game mini di tab baru",
            "Selesaikan 3 level",
            "Kembali dan klaim reward"
        ]
    },
    {
        id: 5,
        title: "Survei Pendapat",
        type: "survei",
        icon: "💭",
        description: "Berikan pendapat Anda tentang fitur game Mobile Legends.",
        reward: 150,
        duration: "5 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Baca pertanyaan dengan teliti",
            "Pilih jawaban yang sesuai",
            "Submit dan klaim poin"
        ]
    },
    {
        id: 6,
        title: "Tonton 3 Video",
        type: "video",
        icon: "📺",
        description: "Tonton 3 video edukasi gaming dan kumpulkan bonus.",
        reward: 60,
        duration: "3-4 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Tonton video pertama",
            "Lanjutkan ke video berikutnya",
            "Selesaikan semua dan klaim"
        ]
    },
    {
        id: 7,
        title: "Review Aplikasi",
        type: "review",
        icon: "⭐",
        description: "Berikan rating dan review untuk aplikasi partner.",
        reward: 200,
        duration: "5 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Buka halaman aplikasi",
            "Berikan rating 5 bintang",
            "Tulis review singkat dan submit"
        ]
    },
    {
        id: 8,
        title: "Ikuti Tantangan",
        type: "challange",
        icon: "🏆",
        description: "Selesaikan tantangan harian untuk poin ekstra.",
        reward: 120,
        duration: "5-10 menit",
        steps: [
            "Klik tombol Mulai di bawah",
            "Pilih tantangan yang tersedia",
            "Selesaikan sesuai instruksi",
            "Upload bukti dan klaim poin"
        ]
    }
];

// Available Rewards
const rewards = [
    {
        id: 1,
        name: "Google Play Gift Card",
        value: "86 Diamonds",
        points: 1000,
        image: "google-play",
        description: "Tukarkan dengan 86 diamond di Mobile Legends"
    },
    {
        id: 2,
        name: "Google Play Gift Card",
        value: "172 Diamonds",
        points: 2000,
        image: "google-play",
        description: "Tukarkan dengan 172 diamond di Mobile Legends"
    },
    {
        id: 3,
        name: "Google Play Gift Card",
        value: "430 Diamonds",
        points: 5000,
        image: "google-play",
        description: "Tukarkan dengan 430 diamond di Mobile Legends"
    },
    {
        id: 4,
        name: "Google Play Gift Card",
        value: "860 Diamonds",
        points: 10000,
        image: "google-play",
        description: "Tukarkan dengan 860 diamond di Mobile Legends"
    }
];

// Page Navigation
function showPage(page) {
    const pages = ['landing', 'login', 'register', 'dashboard'];
    pages.forEach(p => {
        document.getElementById(`${p}-page`).classList.add('hidden');
    });
    document.getElementById(`${page}-page`).classList.remove('hidden');
}

// Section Navigation (Dashboard)
function showSection(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active'));
    
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    document.getElementById(`section-${section}`).classList.add('active');
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login (in real app, would call API)
    const users = JSON.parse(localStorage.getItem('mlUsers') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user && user.password === password) {
        currentUser = user;
        localStorage.setItem('mlCurrentUser', JSON.stringify(user));
        showSuccessModal('Login Berhasil!', `Selamat datang kembali, ${user.name}!`);
        setTimeout(() => {
            hideAllModals();
            initDashboard();
            showPage('dashboard');
        }, 1500);
    } else if (user) {
        alert('Password salah!');
    } else {
        alert('Email belum terdaftar. Silakan daftar terlebih dahulu.');
    }
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const mlId = document.getElementById('register-mlid').value;
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('mlUsers') || '[]');
    if (users.find(u => u.email === email)) {
        alert('Email sudah terdaftar!');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        mlId,
        points: 100, // Welcome bonus
        completedTasks: 0,
        diamondsEarned: 0,
        dailyBonusClaimed: new Date().toDateString(),
        referralCode: generateReferralCode(),
        referrals: 0,
        history: [
            {
                type: 'earned',
                title: 'Bonus Selamat Datang',
                points: 100,
                date: new Date().toISOString()
            }
        ]
    };
    
    users.push(newUser);
    localStorage.setItem('mlUsers', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('mlCurrentUser', JSON.stringify(newUser));
    
    showSuccessModal('Registrasi Berhasil!', `Selamat datang, ${name}! Anda mendapat 100 poin bonus selamat datang.`);
    setTimeout(() => {
        hideAllModals();
        initDashboard();
        showPage('dashboard');
    }, 2000);
}

// Handle Logout
function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        currentUser = null;
        localStorage.removeItem('mlCurrentUser');
        showPage('landing');
    }
}

// Generate Referral Code
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Initialize Dashboard
function initDashboard() {
    if (!currentUser) return;
    
    // Update displays
    document.getElementById('user-name-display').textContent = currentUser.name;
    document.getElementById('nav-user-points').textContent = `💎 ${currentUser.points.toLocaleString()} Poin`;
    document.getElementById('total-points-display').textContent = currentUser.points.toLocaleString();
    document.getElementById('completed-tasks-display').textContent = currentUser.completedTasks;
    document.getElementById('diamonds-earned-display').textContent = Math.floor(currentUser.points / 100);
    document.getElementById('referral-count').textContent = currentUser.referrals;
    document.getElementById('referral-earnings').textContent = currentUser.referrals * 500;
    
    // Generate referral link
    document.getElementById('referral-link').value = `https://mldiamond.page.link/ref/${currentUser.referralCode}`;
    
    // Render tasks
    renderTasks();
    
    // Render rewards
    renderRewards();
    
    // Render history
    renderHistory();
    
    // Check daily bonus
    checkDailyBonus();
}

// Render Tasks
function renderTasks() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = tasks.map(task => {
        const isCompleted = currentUser.history.some(h => h.taskId === task.id);
        return `
            <div class="task-card">
                <div class="task-header">
                    <span class="task-icon">${task.icon}</span>
                    <div class="task-info">
                        <h4>${task.title}</h4>
                        <span class="task-type">${task.type.toUpperCase()}</span>
                    </div>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-footer">
                    <span class="task-reward">+${task.reward} Poin</span>
                    <button class="task-btn ${isCompleted ? 'completed' : ''}" 
                            onclick="openTaskModal(${task.id})"
                            ${isCompleted ? 'disabled' : ''}>
                        ${isCompleted ? '✓ Selesai' : 'Mulai'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Render Rewards
function renderRewards() {
    const container = document.getElementById('rewards-container');
    container.innerHTML = rewards.map(reward => {
        const canRedeem = currentUser.points >= reward.points;
        return `
            <div class="reward-item">
                <div class="reward-item-info">
                    <div class="reward-item-icon">
                        <img src="google-play-icon.svg" alt="Gift Card">
                    </div>
                    <div class="reward-item-details">
                        <h4>${reward.name}</h4>
                        <p>${reward.description}</p>
                    </div>
                </div>
                <div class="reward-item-action">
                    <div class="redeem-points">
                        <span class="points">${reward.points.toLocaleString()} Poin</span>
                        <span class="status ${canRedeem ? 'enough' : 'not-enough'}">
                            ${canRedeem ? 'Tersedia' : `Butuh ${reward.points - currentUser.points} lagi`}
                        </span>
                    </div>
                    <button class="redeem-btn" 
                            onclick="openRedeemModal(${reward.id})"
                            ${!canRedeem ? 'disabled' : ''}>
                        Tukar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Render History
function renderHistory(filter = 'all') {
    const container = document.getElementById('history-container');
    let history = currentUser.history || [];
    
    if (filter === 'earned') {
        history = history.filter(h => h.type === 'earned');
    } else if (filter === 'redeemed') {
        history = history.filter(h => h.type === 'redeemed');
    }
    
    if (history.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--gray);">
                <p>Belum ada riwayat aktivitas</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = history.map(item => {
        const date = new Date(item.date);
        const dateStr = date.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const icon = item.type === 'earned' ? '+' : '-';
        const iconClass = item.type === 'earned' ? 'earned' : 'redeemed';
        
        return `
            <div class="history-item">
                <div class="history-item-icon ${iconClass}">${icon}</div>
                <div class="history-item-info">
                    <h4>${item.title}</h4>
                    <p>${dateStr}</p>
                </div>
                <span class="history-item-points ${item.type === 'earned' ? 'positive' : 'negative'}">
                    ${item.type === 'earned' ? '+' : '-'}${Math.abs(item.points).toLocaleString()}
                </span>
            </div>
        `;
    }).join('');
}

// Filter History
function filterHistory(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderHistory(filter);
}

// Check Daily Bonus
function checkDailyBonus() {
    const today = new Date().toDateString();
    const btn = document.getElementById('claim-daily-btn');
    
    if (currentUser.dailyBonusClaimed === today) {
        btn.textContent = '✓ Sudah Diklaim';
        btn.disabled = true;
        btn.style.background = 'var(--gray)';
    }
}

// Claim Daily Bonus
function claimDailyBonus() {
    if (currentUser.dailyBonusClaimed === new Date().toDateString()) {
        return;
    }
    
    const bonusPoints = 20;
    currentUser.points += bonusPoints;
    currentUser.dailyBonusClaimed = new Date().toDateString();
    
    addHistory('earned', `Bonus Harian`, bonusPoints);
    saveUser();
    
    showSuccessModal('Bonus Harian Diklaim!', `Anda mendapat ${bonusPoints} poin bonus harian. Kumpulkan lagi besok!`);
    
    // Update displays
    document.getElementById('nav-user-points').textContent = `💎 ${currentUser.points.toLocaleString()} Poin`;
    document.getElementById('total-points-display').textContent = currentUser.points.toLocaleString();
    document.getElementById('diamonds-earned-display').textContent = Math.floor(currentUser.points / 100);
    
    checkDailyBonus();
    renderRewards();
}

// Open Task Modal
function openTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    currentTask = task;
    
    document.getElementById('modal-task-title').textContent = task.title;
    document.getElementById('modal-task-content').innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <span class="task-type" style="margin-bottom: 1rem; display: inline-block;">${task.type.toUpperCase()}</span>
            <p style="margin-bottom: 0.5rem;">${task.description}</p>
            <p style="color: var(--gray); font-size: 0.9rem;">⏱️ Estimasi waktu: ${task.duration}</p>
        </div>
        <div style="background: var(--light); padding: 1rem; border-radius: 12px;">
            <h4 style="margin-bottom: 0.75rem;">Langkah-langkah:</h4>
            <ol style="padding-left: 1.25rem; color: var(--gray);">
                ${task.steps.map(step => `<li style="margin-bottom: 0.5rem;">${step}</li>`).join('')}
            </ol>
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(255, 215, 0, 0.2); border-radius: 12px; text-align: center;">
            <span style="font-weight: 600; color: var(--dark);">Reward: +${task.reward} Poin 💎</span>
        </div>
    `;
    
    document.getElementById('task-modal').classList.remove('hidden');
}

// Close Task Modal
function closeTaskModal() {
    document.getElementById('task-modal').classList.add('hidden');
    currentTask = null;
}

// Complete Task
function completeTask() {
    if (!currentTask) return;
    
    currentUser.points += currentTask.reward;
    currentUser.completedTasks += 1;
    
    addHistory('earned', currentTask.title, currentTask.reward, currentTask.id);
    saveUser();
    
    closeTaskModal();
    
    showSuccessModal('Tugas Selesai! 🎉', `Selamat! Anda mendapat ${currentTask.reward} poin.`);
    
    // Update displays
    document.getElementById('nav-user-points').textContent = `💎 ${currentUser.points.toLocaleString()} Poin`;
    document.getElementById('total-points-display').textContent = currentUser.points.toLocaleString();
    document.getElementById('completed-tasks-display').textContent = currentUser.completedTasks;
    document.getElementById('diamonds-earned-display').textContent = Math.floor(currentUser.points / 100);
    
    // Refresh tasks and rewards
    renderTasks();
    renderRewards();
    renderHistory();
}

// Open Redeem Modal
function openRedeemModal(rewardId) {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;
    
    if (currentUser.points < reward.points) {
        alert('Poin Anda tidak mencukupi!');
        return;
    }
    
    currentReward = reward;
    
    document.getElementById('redeem-modal-content').innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div class="reward-item-icon" style="width: 80px; height: 80px; margin: 0 auto 1rem; background: var(--gradient-gold); border-radius: 15px; display: flex; justify-content: center; align-items: center;">
                <img src="google-play-icon.svg" alt="Gift Card" style="width: 50px; height: 50px;">
            </div>
            <h4>${reward.name}</h4>
            <p style="color: var(--primary); font-size: 1.3rem; font-weight: 700;">${reward.value}</p>
        </div>
        <div style="background: var(--light); padding: 1rem; border-radius: 12px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Poin Anda:</span>
                <span style="font-weight: 600;">${currentUser.points.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Biaya Tukar:</span>
                <span style="font-weight: 600; color: var(--danger);">-${reward.points.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px dashed #ddd; padding-top: 0.5rem; margin-top: 0.5rem;">
                <span style="font-weight: 600;">Sisa Poin:</span>
                <span style="font-weight: 700; color: var(--success);">${(currentUser.points - reward.points).toLocaleString()}</span>
            </div>
        </div>
        <p style="color: var(--gray); font-size: 0.9rem; text-align: center;">
            Gift card akan dikirim ke email ${currentUser.email} dalam 1x24 jam setelah konfirmasi.
        </p>
    `;
    
    document.getElementById('redeem-modal').classList.remove('hidden');
}

// Close Redeem Modal
function closeRedeemModal() {
    document.getElementById('redeem-modal').classList.add('hidden');
    currentReward = null;
}

// Confirm Redeem
function confirmRedeem() {
    if (!currentReward) return;
    
    if (currentUser.points < currentReward.points) {
        alert('Poin tidak mencukupi!');
        return;
    }
    
    currentUser.points -= currentReward.points;
    
    addHistory('redeemed', `Tukar: ${currentReward.value}`, currentReward.points);
    saveUser();
    
    closeRedeemModal();
    
    showSuccessModal('Penukaran Berhasil! 🎁', 
        `Gift card ${currentReward.value} sedang diproses. Akan dikirim ke email Anda dalam 1x24 jam.`);
    
    // Update displays
    document.getElementById('nav-user-points').textContent = `💎 ${currentUser.points.toLocaleString()} Poin`;
    document.getElementById('total-points-display').textContent = currentUser.points.toLocaleString();
    document.getElementById('diamonds-earned-display').textContent = Math.floor(currentUser.points / 100);
    
    // Refresh rewards and history
    renderRewards();
    renderHistory();
}

// Copy Referral Link
function copyReferralLink() {
    const link = document.getElementById('referral-link');
    link.select();
    document.execCommand('copy');
    
    showSuccessModal('Link Disalin! 🔗', 'Link referral berhasil disalin. Bagikan ke teman Anda!');
}

// Show Success Modal
function showSuccessModal(title, message) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').classList.remove('hidden');
}

// Close Success Modal
function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
}

// Hide All Modals
function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Add History Entry
function addHistory(type, title, points, taskId = null) {
    const entry = {
        type,
        title,
        points,
        taskId,
        date: new Date().toISOString()
    };
    
    currentUser.history = currentUser.history || [];
    currentUser.history.unshift(entry);
}

// Save User
function saveUser() {
    // Update in users list
    const users = JSON.parse(localStorage.getItem('mlUsers') || '[]');
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
        users[index] = currentUser;
        localStorage.setItem('mlUsers', JSON.stringify(users));
    }
    
    // Update current user
    localStorage.setItem('mlCurrentUser', JSON.stringify(currentUser));
}

// Check Auth on Load
function checkAuth() {
    const savedUser = localStorage.getItem('mlCurrentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        initDashboard();
        showPage('dashboard');
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    checkAuth();
    
    // Update stats on landing page
    animateStats();
});

// Animate Landing Page Stats
function animateStats() {
    const animateNumber = (element, target) => {
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toLocaleString();
        }, 30);
    };
    
    animateNumber(document.getElementById('total-users'), 127453);
    animateNumber(document.getElementById('total-diamonds'), 5847293);
}

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
