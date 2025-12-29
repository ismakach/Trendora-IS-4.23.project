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

    /* ========================================= */
    /* LOGIC FROM CARD (Checkout Logic)          */
    /* ========================================= */

    // Data
    let items = [
        {
            id: 1,
            name: "Zarina Man-Shirt",
            variant: "Medium | Gray",
            price: 24000,
            image: "images/zarinaManshirt.png",
            quantity: 1
        },
        {
            id: 2,
            name: "Outvunter Coat",
            variant: "Small | Blue-Gray",
            price: 24000,
            image: "images/OutvunterCoat.png",
            quantity: 1
        }
    ];

    const shippingCost = 1500;
    const shippingAssurance = 3500;

    // Elements
    const cartItemsContainer = document.querySelector('.cart-items');
    const summaryCard = document.querySelector('.summary-card');
    
    // Modal Elements
    const paymentBtn = document.querySelector('.payment-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('#close-modal-btn');

    // Render Functions
    function renderCartItems() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="wishlist-icon">
                    <i data-lucide="heart" fill="#E62E2D" color="#E62E2D" style="width: 16px; height: 16px;"></i>
                </div>
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                  <div class="item-header">
                      <div>
                          <h3 class="item-name">${item.name}</h3>
                          <p class="item-meta">${item.variant}</p>
                      </div>
                      <button class="remove-btn" data-id="${item.id}">
                        <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                      </button>
                  </div>
                  
                  <div class="item-actions">
                    <div class="item-price">${item.price} ₸</div>
                    <div class="qty-control">
                      <button class="qty-btn minus" data-id="${item.id}">-</button>
                      <span>${item.quantity}</span>
                      <button class="qty-btn plus" data-id="${item.id}">+</button>
                    </div>
                  </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Re-attach listeners
        attachItemListeners();
        lucide.createIcons();
    }

    function renderSummary() {
        const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const grandTotal = totalPrice + shippingCost + shippingAssurance;

        const summaryContent = document.querySelector('.summary-content');
        if (summaryContent) {
            summaryContent.innerHTML = `
                <div class="summary-row">
                  <span class="text-gray">Total price (${totalQty} item)</span>
                  <span class="font-bold">${totalPrice} ₸</span>
                </div>
                <div class="summary-row">
                  <span class="text-gray">Shipping cost</span>
                  <span class="font-bold">${shippingCost} ₸</span>
                </div>
                <div class="summary-row">
                  <span class="text-gray">Shipping Assurance</span>
                  <span class="font-bold">${shippingAssurance} ₸</span>
                </div>

                <div class="summary-total">
                  <span>TOTAL</span>
                  <span>${grandTotal} ₸</span>
                </div>
            `;
        }
    }

    // Logic Functions
    function updateQuantity(id, delta) {
        items = items.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        renderCartItems();
        renderSummary();
    }

    function removeItem(id) {
        items = items.filter(item => item.id !== id);
        renderCartItems();
        renderSummary();
    }

    function attachItemListeners() {
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                updateQuantity(id, -1);
            });
        });

        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                updateQuantity(id, 1);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                removeItem(id);
            });
        });
    }

    // Modal Logic
    if (paymentBtn && modalOverlay) {
        paymentBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });

        // Close when clicking outside modal content
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    // Initial Render
    renderCartItems();
    renderSummary();
});
