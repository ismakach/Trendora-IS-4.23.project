// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if(burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if(isOpen) {
        mobileMenu.classList.remove('open');
        burgerBtn.innerHTML = '<i data-lucide="menu" class="burger-icon"></i>';
      } else {
        mobileMenu.classList.add('open');
        burgerBtn.innerHTML = '<i data-lucide="x" class="burger-icon"></i>';
      }
      lucide.createIcons();
    });
}

// Profile Menu Toggle
const profileTrigger = document.querySelector('.profile-trigger');
const grayMenu = document.querySelector('.gray-menu-popup');
const closeGrayMenu = document.querySelector('.close-gray-menu');

if(profileTrigger && grayMenu) {
    profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if(grayMenu.style.display === 'none' || grayMenu.style.display === '') {
            grayMenu.style.display = 'block';
        } else {
            grayMenu.style.display = 'none';
        }
    });
}

if(closeGrayMenu && grayMenu) {
    closeGrayMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        grayMenu.style.display = 'none';
    });
}

// Mega Menu Toggle
const megaMenuBtn = document.querySelector('.cat-link-btn');
const megaMenu = document.querySelector('.mega-menu');

if(megaMenuBtn && megaMenu) {
    megaMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if(megaMenu.style.display === 'none' || megaMenu.style.display === '') {
            megaMenu.style.display = 'block';
            megaMenuBtn.classList.add('active');
        } else {
            megaMenu.style.display = 'none';
            megaMenuBtn.classList.remove('active');
        }
    });
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if(grayMenu && !grayMenu.contains(e.target) && !profileTrigger.contains(e.target)) {
        grayMenu.style.display = 'none';
    }
    if(megaMenu && !megaMenu.contains(e.target) && !megaMenuBtn.contains(e.target)) {
        megaMenu.style.display = 'none';
        if(megaMenuBtn) megaMenuBtn.classList.remove('active');
    }
});