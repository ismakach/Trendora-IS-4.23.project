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

// Profile Trigger
const profileTrigger = document.querySelector('.profile-trigger');
const grayMenuPopup = document.querySelector('.gray-menu-popup');
const closeGrayMenu = document.querySelector('.close-gray-menu');

if (profileTrigger && grayMenuPopup) {
  profileTrigger.addEventListener('click', () => {
    const isVisible = grayMenuPopup.style.display === 'block';
    grayMenuPopup.style.display = isVisible ? 'none' : 'block';
  });
}

if (closeGrayMenu && grayMenuPopup) {
  closeGrayMenu.addEventListener('click', () => {
    grayMenuPopup.style.display = 'none';
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (grayMenuPopup && 
      grayMenuPopup.style.display === 'block' && 
      !grayMenuPopup.contains(e.target) && 
      !profileTrigger.contains(e.target)) {
    grayMenuPopup.style.display = 'none';
  }
});

// Mega Menu Toggle
const newBtn = document.querySelector('.cat-link-btn');
const megaMenu = document.querySelector('.mega-menu');

if (newBtn && megaMenu) {
  newBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = megaMenu.style.display === 'block';
    megaMenu.style.display = isVisible ? 'none' : 'block';
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (megaMenu.style.display === 'block' && !megaMenu.contains(e.target) && !newBtn.contains(e.target)) {
      megaMenu.style.display = 'none';
    }
  });
}