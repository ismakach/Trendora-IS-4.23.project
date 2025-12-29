document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    /* ========================================= */
    /* LOGIC FROM PAGETWO (Header Interactions)  */
    /* ========================================= */

    // Mobile Menu Toggle
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if(burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
          const isOpen = mobileMenu.classList.contains('open');
          if(isOpen) {
            mobileMenu.classList.remove('open');
            // Check if innerHTML exists, otherwise just toggle class
            if (burgerBtn.innerHTML) burgerBtn.innerHTML = '<i data-lucide="menu" class="burger-icon"></i>';
          } else {
            mobileMenu.classList.add('open');
            if (burgerBtn.innerHTML) burgerBtn.innerHTML = '<i data-lucide="x" class="burger-icon"></i>';
          }
          lucide.createIcons();
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
        if(megaMenu && !megaMenu.contains(e.target) && !megaMenuBtn.contains(e.target)) {
            megaMenu.style.display = 'none';
            if(megaMenuBtn) megaMenuBtn.classList.remove('active');
        }
    });

    /* ========================================= */
    /* LOGIC FROM REGISTER (Form Logic)          */
    /* ========================================= */

    // Password Toggle
    window.togglePassword = function(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.setAttribute('data-lucide', 'eye-off');
        } else {
            input.type = 'password';
            icon.setAttribute('data-lucide', 'eye');
        }
        lucide.createIcons();
    }
});
