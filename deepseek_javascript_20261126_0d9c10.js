// script.js

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
  initContactForm();
  initSmoothScroll();
});

/**
 * 根據目前路徑高亮導覽列項目
 */
function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 聯絡表單驗證與送出回饋
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    // 簡易驗證
    if (!name || !email || !subject || !message) {
      showStatus('請填寫所有欄位。', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('請輸入有效的電子郵件地址。', 'error');
      return;
    }

    // 模擬送出成功
    showStatus('感謝您的訊息！我們會盡快與您聯繫。', 'success');
    form.reset();

    // 3 秒後清除提示
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }, 4000);
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/**
 * 頁內平滑滾動（錨點連結）
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * 卡片懸停微互動（適用產品頁）
 */
document.querySelectorAll('.info-card, .feature-card, .map-card, .rarity-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease';
  });
});