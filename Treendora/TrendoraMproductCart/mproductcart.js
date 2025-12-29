// Initialize Lucide Icons
lucide.createIcons();

// State
let cart = [
    {
        id: 1,
        name: "Zarina Man Shirt",
        meta: "Medium | Grey",
        price: 16700,
        qty: 1,
        img: "images/manlookingright.png"
    },
    {
        id: 2,
        name: "Outeunter Coat",
        meta: "Small | Blue-Grey",
        price: 24000,
        qty: 1,
        img: "images/OutvunterCoat.png"
    }
];

// Selectors
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const profileTrigger = document.querySelector('.profile-trigger');
const grayMenuPopup = document.querySelector('.gray-menu-popup');
const closeGrayMenu = document.querySelector('.close-gray-menu');
const cartTrigger = document.querySelector('.cart-trigger-item');
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const closeCartBtn = document.querySelector('#close-cart-btn');
const addToCartBtn = document.querySelector('.btn-add-cart');
const cartItemsContainer = document.querySelector('#cart-items-list');
const cartSubtotalVal = document.querySelector('#cart-subtotal-val');
const addBeanieBtn = document.querySelector('#add-beanie-btn');

// Mobile Menu
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

// Profile Popup
if (profileTrigger && grayMenuPopup) {
    profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = grayMenuPopup.style.display === 'block';
        grayMenuPopup.style.display = isVisible ? 'none' : 'block';
    });
}

if (closeGrayMenu && grayMenuPopup) {
    closeGrayMenu.addEventListener('click', () => {
        grayMenuPopup.style.display = 'none';
    });
}

// Cart UI
const openCart = () => {
    cartDrawer.classList.add('open');
    cartOverlay.style.display = 'block';
    grayMenuPopup.style.display = 'none';
    renderCart();
};

const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.style.display = 'none';
};

cartTrigger?.addEventListener('click', openCart);
addToCartBtn?.addEventListener('click', openCart);
closeCartBtn?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

// Global Click
document.addEventListener('click', (e) => {
    if (grayMenuPopup && !grayMenuPopup.contains(e.target) && !profileTrigger.contains(e.target)) {
        grayMenuPopup.style.display = 'none';
    }
    
    // Mega Menu
    const newBtn = document.querySelector('.cat-link-btn');
    const megaMenu = document.querySelector('.mega-menu');
    if (newBtn && megaMenu) {
        if (newBtn.contains(e.target)) {
            const isVisible = megaMenu.style.display === 'block';
            megaMenu.style.display = isVisible ? 'none' : 'block';
        } else if (!megaMenu.contains(e.target)) {
            megaMenu.style.display = 'none';
        }
    }
});

// Cart Logic
function renderCart() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-meta">${item.meta}</div>
                <div class="cart-item-price">${item.price.toLocaleString()}₸</div>
                <div class="quantity-row">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartSubtotalVal.innerText = `${subtotal.toLocaleString()}₸`;
}

window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = Math.max(1, item.qty + delta);
        renderCart();
    }
};

window.removeItem = (id) => {
    cart = cart.filter(i => i.id !== id);
    renderCart();
};

addBeanieBtn?.addEventListener('click', () => {
    const beanie = {
        id: Date.now(),
        name: "Adidas Originals Beanie",
        meta: "One Size | Charmway Blue",
        price: 12000,
        qty: 1,
        img: "images/adidasBeanie.png"
    };
    cart.push(beanie);
    renderCart();
});
