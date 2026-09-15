/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — OBSIDIAN APP CONTROLLER
   Router, UI Interactions, Event Listeners, State Wiring
   ========================================================================== */

import { PRODUCTS, CATEGORIES, ACCESSORIES } from './products.js';
import { cart } from './cart.js';
import { checkout } from './checkout.js';
import { calculateSolarSystem } from './calculator.js';
import { findOrder } from './tracking.js';
import { adminPortal } from './admin.js';
import { chatbot } from './chatbot.js';
import { initHeroParticles } from './particles.js';

class ZeltApp {
  constructor() {
    this.currentView = 'home'; // 'home', 'catalog', 'calculator', 'tracking', 'admin'
    this.selectedProduct = null;
    this.activeFilterCategory = 'all';
  }

  init() {
    this.initOpeningHours();
    this.initHeaderScroll();
    this.initSearch();
    this.initTopSellers();
    this.initFlashDealCountdown();
    this.initAccordion();
    this.initCartDrawer();
    this.initCalculator();
    this.initCheckout();
    this.initTracking();
    this.initAdmin();
    this.initChatbot();
    this.initBackToTop();
    this.initHeroParticles();
    this.setupEventListeners();
    this.renderCategoryGrid();
  }

  // 1. Live Nairobi Opening Hours Status
  initOpeningHours() {
    const statusEl = document.getElementById('storeOpenStatus');
    if (!statusEl) return;

    const now = new Date();
    // Convert to Nairobi time (UTC+3)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const nairobiTime = new Date(utc + (3600000 * 3));
    
    const day = nairobiTime.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = nairobiTime.getHours();
    const minutes = nairobiTime.getMinutes();
    const timeDecimal = hours + (minutes / 60);

    // Mon–Sat: 8:00am – 6:00pm, Sun: Closed
    const isOpen = (day >= 1 && day <= 6) && (timeDecimal >= 8.0 && timeDecimal < 18.0);

    if (isOpen) {
      statusEl.innerHTML = `<span class="status-dot open"></span> <span class="text-mint font-semibold">Open Now</span> · Closes 6:00 PM`;
    } else {
      statusEl.innerHTML = `<span class="status-dot closed"></span> <span class="text-muted">Closed</span> · Opens ${day === 0 ? 'Mon' : 'Tomorrow'} 8:00 AM`;
    }
  }

  // 2. Header Scroll Effect
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
  }

  // 3. Instant Search with Live Dropdown
  initSearch() {
    const input = document.getElementById('siteSearchInput');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) {
        dropdown.classList.remove('active');
        return;
      }

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">No matching products found for "${q}".</div>`;
      } else {
        dropdown.innerHTML = matches.map(p => `
          <div class="search-result-item" data-product-id="${p.id}">
            <img src="${p.image}" class="search-result-img" alt="${p.name}">
            <div class="search-result-info">
              <h5>${p.name}</h5>
              <p>KSh ${p.price.toLocaleString()} <span style="color: var(--text-muted); font-size: 11px;">(${p.brand})</span></p>
            </div>
          </div>
        `).join('');

        dropdown.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const pId = item.getAttribute('data-product-id');
            this.openProductModal(pId);
            dropdown.classList.remove('active');
            input.value = '';
          });
        });
      }

      dropdown.classList.add('active');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        dropdown.classList.remove('active');
      }
    });
  }

  // 4. Render Category Grid
  renderCategoryGrid() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.slice(0, 6).map(cat => `
      <a href="#catalog" class="category-card" data-category="${cat.id}">
        <img src="${cat.image}" class="category-bg-img" alt="${cat.name}">
        <div class="category-gradient-overlay"></div>
        <div class="category-content">
          <div class="category-texts">
            <h3>${cat.name}</h3>
            <p>${cat.itemCount} Products In Stock</p>
          </div>
          <div class="category-arrow-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </a>
    `).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const catId = card.getAttribute('data-category');
        this.openCatalogView(catId);
      });
    });
  }

  // 5. Top Sellers & Filter Tabs
  initTopSellers() {
    this.renderTopSellers('all');

    const tabs = document.querySelectorAll('.filter-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        this.renderTopSellers(filter);
      });
    });
  }

  renderTopSellers(filter = 'all') {
    const grid = document.getElementById('topSellersGrid');
    if (!grid) return;

    let items = PRODUCTS;
    if (filter === 'solar') {
      items = PRODUCTS.filter(p => p.category.includes('solar'));
    } else if (filter === 'lighting') {
      items = PRODUCTS.filter(p => p.category.includes('lighting') || p.category.includes('indoor'));
    } else if (filter === 'electrical') {
      items = PRODUCTS.filter(p => p.category === 'electrical-infrastructure');
    }

    grid.innerHTML = items.slice(0, 8).map(p => this.createProductCardHtml(p)).join('');
    this.bindProductCardEvents(grid);
  }

  createProductCardHtml(p) {
    const isWish = cart.isWishlisted(p.id);
    const saveAmt = p.comparePrice > p.price ? p.comparePrice - p.price : 0;
    const savePercent = p.comparePrice > p.price ? Math.round((saveAmt / p.comparePrice) * 100) : 0;

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-image-wrap">
          <img src="${p.image}" class="product-img" alt="${p.name}" loading="lazy">
          
          <div class="product-badges">
            ${p.isTopSeller ? '<span class="badge badge-gold">Best Seller</span>' : ''}
            ${p.isDeal ? '<span class="badge badge-mint">Special Deal</span>' : ''}
          </div>

          ${p.stockQty <= 8 ? `<div class="product-scarcity">Only ${p.stockQty} left</div>` : ''}

          <button class="product-wishlist-btn ${isWish ? 'active' : ''}" data-wishlist-id="${p.id}" title="Save to Wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>

          <button class="quick-view-overlay-btn" data-quickview-id="${p.id}">
            Quick View
          </button>
        </div>

        <div class="product-body">
          <div class="product-category-tag">${p.brand} · ${p.subCategory}</div>
          <h4 class="product-name" title="${p.name}">${p.name}</h4>

          <div class="product-rating-row">
            <span class="product-stars">★★★★★</span>
            <span class="product-reviews-count">(${p.reviewsCount})</span>
          </div>

          <div class="product-price-row">
            <span class="product-price-current">KSh ${p.price.toLocaleString()}</span>
            ${p.comparePrice > p.price ? `<span class="product-price-old">KSh ${p.comparePrice.toLocaleString()}</span>` : ''}
            ${saveAmt > 0 ? `<span class="product-save-badge">Save ${savePercent}%</span>` : ''}
          </div>

          ${p.inStock ? `
            <button class="product-add-cart-btn" data-add-cart-id="${p.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Cart
            </button>
          ` : `
            <button class="product-out-of-stock-btn" disabled>Out of Stock</button>
          `}
        </div>
      </div>
    `;
  }

  bindProductCardEvents(container) {
    container.querySelectorAll('[data-add-cart-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-add-cart-id');
        const product = cart.addItem(pId, 1);
        this.showToast(`Added ${product.name.slice(0, 30)}... to cart!`);
        this.openCartDrawer();
      });
    });

    container.querySelectorAll('[data-quickview-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-quickview-id');
        this.openProductModal(pId);
      });
    });

    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const pId = card.getAttribute('data-id');
          this.openProductModal(pId);
        }
      });
    });

    container.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-wishlist-id');
        const added = cart.toggleWishlist(pId);
        btn.classList.toggle('active', added);
        this.showToast(added ? 'Saved to your Wishlist!' : 'Removed from Wishlist');
      });
    });
  }

  // 6. Seasonal Flash Deals Live Countdown
  initFlashDealCountdown() {
    const daysEl = document.getElementById('cdDays');
    const hrsEl = document.getElementById('cdHours');
    const minEl = document.getElementById('cdMins');
    const secEl = document.getElementById('cdSecs');
    if (!daysEl) return;

    let targetTime = Date.now() + (2 * 86400000) + (14 * 3600000) + (37 * 60000) + (55 * 1000);

    setInterval(() => {
      const diff = Math.max(0, targetTime - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(d).padStart(2, '0');
      hrsEl.textContent = String(h).padStart(2, '0');
      minEl.textContent = String(m).padStart(2, '0');
      secEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // 7. Accordion for "Why Choose Zelt"
  initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  // 8. Slide-in Cart Drawer
  initCartDrawer() {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const drawer = document.getElementById('cartDrawer');
    const openBtns = document.querySelectorAll('[data-open-cart]');
    const closeBtn = document.getElementById('closeCartBtn');

    openBtns.forEach(btn => btn.addEventListener('click', () => this.openCartDrawer()));
    closeBtn?.addEventListener('click', () => this.closeCartDrawer());
    backdrop?.addEventListener('click', () => this.closeCartDrawer());

    // Listen for cart state events
    window.addEventListener('zelt:cart-updated', (e) => {
      this.updateCartUi(e.detail);
    });

    // Discount Form
    const discountBtn = document.getElementById('applyDiscountBtn');
    const discountInput = document.getElementById('discountInput');
    discountBtn?.addEventListener('click', () => {
      const res = cart.applyDiscount(discountInput?.value);
      this.showToast(res.message, res.success ? 'info' : 'danger');
    });

    // Checkout CTA inside Cart
    const toCheckoutBtn = document.getElementById('cartToCheckoutBtn');
    toCheckoutBtn?.addEventListener('click', () => {
      this.closeCartDrawer();
      this.openCheckoutModal();
    });

    // Initial render of cart UI
    this.updateCartUi({
      items: cart.items,
      subtotal: cart.getSubtotal(),
      total: cart.getTotal(),
      count: cart.getItemCount(),
      deliveryFee: cart.deliveryFee,
      discountAmount: cart.discountAmount
    });
  }

  openCartDrawer() {
    document.getElementById('cartDrawerBackdrop')?.classList.add('active');
    document.getElementById('cartDrawer')?.classList.add('active');
  }

  closeCartDrawer() {
    document.getElementById('cartDrawerBackdrop')?.classList.remove('active');
    document.getElementById('cartDrawer')?.classList.remove('active');
  }

  updateCartUi({ items, subtotal, total, count, deliveryFee, discountAmount }) {
    // Badges in header
    document.querySelectorAll('.cart-count-badge').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });

    const itemsContainer = document.getElementById('cartDrawerItems');
    const subtotalEl = document.getElementById('cartSubtotalDisplay');
    const totalEl = document.getElementById('cartTotalDisplay');
    const deliveryEl = document.getElementById('cartDeliveryDisplay');
    const discountEl = document.getElementById('cartDiscountRow');
    const toCheckoutBtn = document.getElementById('cartToCheckoutBtn');

    if (subtotalEl) subtotalEl.textContent = `KSh ${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `KSh ${total.toLocaleString()}`;
    if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee.toLocaleString()}`;

    if (discountEl) {
      if (discountAmount > 0) {
        discountEl.style.display = 'flex';
        discountEl.querySelector('.discount-val').textContent = `-KSh ${discountAmount.toLocaleString()}`;
      } else {
        discountEl.style.display = 'none';
      }
    }

    if (toCheckoutBtn) {
      toCheckoutBtn.disabled = items.length === 0;
    }

    if (!itemsContainer) return;

    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
          <h4>Your cart is empty</h4>
          <p>Discover our high-efficiency solar systems and modern lighting.</p>
          <button class="btn btn-outline-mint" onclick="window.zeltApp.closeCartDrawer(); window.zeltApp.openCatalogView('all');">Explore Products</button>
        </div>
      `;
      return;
    }

    itemsContainer.innerHTML = items.map(item => `
      <div class="cart-item-row">
        <img src="${item.image}" class="cart-item-thumb" alt="${item.name}">
        <div class="cart-item-details">
          <div>
            <h5 class="cart-item-title">${item.name}</h5>
            ${item.variant ? `<div style="font-size: 11px; color: var(--text-muted); margin: 2px 0;">Variant: ${item.variant}</div>` : ''}
            <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button class="qty-btn minus" data-id="${item.id}" data-variant="${item.variant || ''}">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn plus" data-id="${item.id}" data-variant="${item.variant || ''}">+</button>
            </div>
            <button class="cart-item-remove-btn" data-remove-id="${item.id}" data-variant="${item.variant || ''}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');

    itemsContainer.querySelectorAll('.qty-btn.minus').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        const v = b.getAttribute('data-variant') || null;
        const current = items.find(i => i.id === id && i.variant === v)?.quantity || 1;
        cart.updateQuantity(id, v, current - 1);
      });
    });

    itemsContainer.querySelectorAll('.qty-btn.plus').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        const v = b.getAttribute('data-variant') || null;
        const current = items.find(i => i.id === id && i.variant === v)?.quantity || 1;
        cart.updateQuantity(id, v, current + 1);
      });
    });

    itemsContainer.querySelectorAll('.cart-item-remove-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-remove-id');
        const v = b.getAttribute('data-variant') || null;
        cart.removeItem(id, v);
      });
    });
  }

  // 9. Product Detail Modal (PDP)
  openProductModal(productId) {
    const p = PRODUCTS.find(prod => prod.id === productId);
    if (!p) return;

    this.selectedProduct = p;
    const modalBackdrop = document.getElementById('pdpModalBackdrop');
    const modalContent = document.getElementById('pdpModalContent');
    if (!modalBackdrop || !modalContent) return;

    let selectedVariant = p.variants ? p.variants[0] : null;
    let selectedQty = 1;

    modalContent.innerHTML = `
      <button class="modal-close-btn" id="closePdpBtn">✕</button>
      
      <div class="pdp-top-grid">
        <!-- Gallery -->
        <div>
          <div class="pdp-gallery-main">
            <img id="pdpMainImg" src="${p.image}" alt="${p.name}">
          </div>
          <div class="pdp-thumbnails">
            <img src="${p.image}" class="pdp-thumb active" data-src="${p.image}">
            <img src="assets/images/showroom.jpg" class="pdp-thumb" data-src="assets/images/showroom.jpg">
            <img src="assets/images/hero.jpg" class="pdp-thumb" data-src="assets/images/hero.jpg">
          </div>
        </div>

        <!-- Info -->
        <div class="pdp-info-col">
          <div class="pdp-breadcrumb">Home › ${p.category} › ${p.subCategory}</div>
          <div class="badge badge-stock" style="width: fit-content; margin-bottom: 8px;">
            <span class="status-dot open" style="width:8px;height:8px;"></span> In Stock — ${p.stockQty} Units Available
          </div>

          <h2 class="pdp-title">${p.name}</h2>
          <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 12px;">${p.subtitle}</p>

          <div class="product-rating-row" style="margin-bottom: 12px;">
            <span class="product-stars">★★★★★</span>
            <span style="color: var(--accent-secondary); font-weight: 700;">${p.rating} / 5</span>
            <span class="product-reviews-count">(${p.reviewsCount} Verified Customer Reviews)</span>
          </div>

          <div class="pdp-price-box">
            <span class="pdp-current-price">KSh ${p.price.toLocaleString()}</span>
            ${p.comparePrice > p.price ? `<span class="pdp-old-price">KSh ${p.comparePrice.toLocaleString()}</span>` : ''}
            ${p.comparePrice > p.price ? `<span class="badge badge-gold">Save KSh ${(p.comparePrice - p.price).toLocaleString()}</span>` : ''}
          </div>

          <!-- Variants -->
          ${p.variants && p.variants.length > 0 ? `
            <div class="variants-picker">
              <label style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Select Specification:</label>
              <div class="variant-chips" id="pdpVariantChips">
                ${p.variants.map((v, i) => `
                  <button class="variant-chip ${i === 0 ? 'active' : ''}" data-variant="${v}">${v}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Actions -->
          <div class="pdp-cta-row">
            <div class="qty-stepper" style="height: 48px;">
              <button class="qty-btn" id="pdpMinusBtn" style="width: 38px; height: 100%;">−</button>
              <span class="qty-val" id="pdpQtyVal" style="font-size: 16px; padding: 0 14px;">1</span>
              <button class="qty-btn" id="pdpPlusBtn" style="width: 38px; height: 100%;">+</button>
            </div>
            <button class="btn btn-primary" id="pdpAddToCartBtn" style="flex-grow: 1; height: 48px; font-size: 15px;">
              Add to Cart
            </button>
          </div>

          <!-- WhatsApp Button prefilled -->
          <a href="https://wa.me/254701884358?text=${encodeURIComponent(`Hi Zelt Solar & Electricals, I am interested in purchasing: ${p.name} (KSh ${p.price.toLocaleString()}). Can you share technical advice and delivery details?`)}" 
             target="_blank" class="pdp-whatsapp-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            Ask Technical Team on WhatsApp
          </a>

          <!-- Delivery and Trust -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; font-size: 13px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; color: var(--text-primary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> <strong>Nairobi Delivery:</strong> Same/Next-Day Bodaboda (KSh 300)
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; color: var(--text-primary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> <strong>Upcountry Kenya:</strong> 2–3 Days via Wells Fargo Couriers (KSh 600)
            </div>
            <div style="display: flex; align-items: center; gap: 8px; color: var(--accent-primary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> <strong>Shop Pickup:</strong> Free at Mwangaza Arcade Shop G7 or JBC Mall
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="pdp-tabs-nav">
        <button class="pdp-tab-btn active" data-tab="desc">Product Description</button>
        <button class="pdp-tab-btn" data-tab="specs">Technical Specifications</button>
        <button class="pdp-tab-btn" data-tab="reviews">Verified Reviews (${p.reviewsCount})</button>
        <button class="pdp-tab-btn" data-tab="delivery">Delivery & Warranty</button>
      </div>

      <div class="pdp-tab-pane active" id="tab-desc">
        <p style="margin-bottom: 16px;">${p.description}</p>
        <h5 style="color: var(--text-primary); margin-bottom: 8px; font-size: 15px;">Key Engineering Highlights:</h5>
        <ul style="padding-left: 20px; line-height: 1.8;">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="pdp-tab-pane" id="tab-specs">
        <table class="specs-table">
          <tbody>
            ${Object.entries(p.specs).map(([k, v]) => `
              <tr><td>${k}</td><td>${v}</td></tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pdp-tab-pane" id="tab-reviews">
        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 24px; padding: 20px; background: var(--bg-card); border-radius: var(--radius-md);">
          <div>
            <div style="font-size: 40px; font-family: var(--font-mono); font-weight: 700; color: var(--accent-primary); line-height: 1;">${p.rating}</div>
            <div class="product-stars" style="font-size: 18px; margin-top: 4px;">★★★★★</div>
            <div style="font-size: 12px; color: var(--text-muted);">Based on ${p.reviewsCount} reviews</div>
          </div>
          <div style="flex-grow: 1; border-left: 1px solid var(--border-default); padding-left: 20px; font-size: 13px;">
            <div>5★ ████████████████ 85%</div>
            <div>4★ ███ 12%</div>
            <div>3★ █ 3%</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="padding: 14px; background: var(--bg-elevated); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <strong>Engineer David Ochieng (Nakuru)</strong>
              <span class="badge badge-stock">Verified Purchase</span>
            </div>
            <div class="product-stars" style="margin-bottom: 6px;">★★★★★</div>
            <p style="font-size: 13px; color: var(--text-secondary);">"Installed on our commercial warehouse. Exceptional brightness and zero maintenance during recent rainstorms. Delivered to Nakuru within 48 hours."</p>
          </div>
        </div>
      </div>

      <div class="pdp-tab-pane" id="tab-delivery">
        <p><strong>Zelt Nationwide Delivery Guarantee:</strong> All orders are dispatched directly from our Nairobi CBD central warehouse. Upcountry shipments are packed in reinforced foam crates and insured with Wells Fargo Couriers Kenya.</p>
        <p style="margin-top: 10px;"><strong>Warranty Terms:</strong> All electronic solar products carry official manufacturer warranty with fast repair/replacement handled directly at our Mwangaza Arcade counter.</p>
      </div>
    `;

    // Bind modal gallery thumbnail clicks
    modalContent.querySelectorAll('.pdp-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        modalContent.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const mainImg = document.getElementById('pdpMainImg');
        if (mainImg) mainImg.src = thumb.getAttribute('data-src');
      });
    });

    // Bind variant chips
    modalContent.querySelectorAll('#pdpVariantChips button').forEach(chip => {
      chip.addEventListener('click', () => {
        modalContent.querySelectorAll('#pdpVariantChips button').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedVariant = chip.getAttribute('data-variant');
      });
    });

    // Quantity stepper
    const qtyVal = document.getElementById('pdpQtyVal');
    document.getElementById('pdpMinusBtn')?.addEventListener('click', () => {
      if (selectedQty > 1) {
        selectedQty--;
        if (qtyVal) qtyVal.textContent = selectedQty;
      }
    });
    document.getElementById('pdpPlusBtn')?.addEventListener('click', () => {
      selectedQty++;
      if (qtyVal) qtyVal.textContent = selectedQty;
    });

    // Add to Cart
    document.getElementById('pdpAddToCartBtn')?.addEventListener('click', () => {
      cart.addItem(p.id, selectedQty, selectedVariant);
      this.showToast(`Added ${selectedQty}x ${p.name.slice(0, 25)}... to cart!`);
      modalBackdrop.classList.remove('active');
      this.openCartDrawer();
    });

    // Tab switching
    modalContent.querySelectorAll('.pdp-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        modalContent.querySelectorAll('.pdp-tab-btn').forEach(b => b.classList.remove('active'));
        modalContent.querySelectorAll('.pdp-tab-pane').forEach(p => p.classList.remove('active'));
        tabBtn.classList.add('active');
        const tabId = tabBtn.getAttribute('data-tab');
        document.getElementById(`tab-${tabId}`)?.classList.add('active');
      });
    });

    // Close button
    document.getElementById('closePdpBtn')?.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.classList.add('active');
  }

  // 10. Solar Sizing Calculator Wizard
  initCalculator() {
    const calcForm = document.getElementById('solarCalcForm');
    const billSlider = document.getElementById('calcBillInput');
    const billDisplay = document.getElementById('calcBillVal');
    const resultsContainer = document.getElementById('calcResultsSection');

    if (billSlider && billDisplay) {
      billSlider.addEventListener('input', () => {
        billDisplay.textContent = Number(billSlider.value).toLocaleString();
        this.runCalculatorEngine();
      });
    }

    document.querySelectorAll('.calc-appliance-checkbox, input[name="calcGoal"], input[name="calcLocation"]').forEach(el => {
      el.addEventListener('change', () => this.runCalculatorEngine());
    });

    // Run initial calculation
    this.runCalculatorEngine();

    // "Shop Recommended Products" button inside calculator
    document.getElementById('calcShopMatchingBtn')?.addEventListener('click', () => {
      this.closeCalculatorModal();
      this.openCatalogView('solar-energy');
    });
  }

  runCalculatorEngine() {
    const billInput = document.getElementById('calcBillInput');
    if (!billInput) return;

    const bill = Number(billInput.value) || 6000;
    const appliances = Array.from(document.querySelectorAll('.calc-appliance-checkbox:checked')).map(cb => cb.value);
    const goal = document.querySelector('input[name="calcGoal"]:checked')?.value || 'reduce';
    const location = document.querySelector('input[name="calcLocation"]:checked')?.value || 'nairobi';

    const res = calculateSolarSystem({
      monthlyBillKes: bill,
      appliances,
      goal,
      location
    });

    // Update Teaser Preview stats on Homepage
    const teaserKw = document.getElementById('teaserSolarKw');
    const teaserBat = document.getElementById('teaserBattery');
    const teaserSav = document.getElementById('teaserSavings');
    if (teaserKw) teaserKw.textContent = `${res.solarKw} kW`;
    if (teaserBat) teaserBat.textContent = `${res.batteryAh48V}Ah / 48V`;
    if (teaserSav) teaserSav.textContent = `KSh ${res.monthlySavings.toLocaleString()}/mo`;

    // Update Full Wizard View
    const outKw = document.getElementById('calcOutSolarKw');
    const outPanels = document.getElementById('calcOutPanels');
    const outBat = document.getElementById('calcOutBattery');
    const outInv = document.getElementById('calcOutInverter');
    const outCost = document.getElementById('calcOutCost');
    const outSav = document.getElementById('calcOutSavings');
    const outPayback = document.getElementById('calcOutPayback');

    if (outKw) outKw.textContent = `${res.solarKw} kW`;
    if (outPanels) outPanels.textContent = `${res.panelsCount}× 550W Mono PERC Panels`;
    if (outBat) outBat.textContent = `${res.batteryKwh} kWh (${res.batteryAh48V}Ah @ 48V)`;
    if (outInv) outInv.textContent = `${res.inverterKw} kW Pure Sine Wave Hybrid`;
    if (outCost) outCost.textContent = `KSh ${res.costRangeMin.toLocaleString()} – KSh ${res.costRangeMax.toLocaleString()}`;
    if (outSav) outSav.textContent = `KSh ${res.monthlySavings.toLocaleString()} / Month`;
    if (outPayback) outPayback.textContent = `${res.paybackYears} Years`;
  }

  openCalculatorModal() {
    const modal = document.getElementById('calculatorModal');
    if (modal) modal.classList.add('active');
    this.runCalculatorEngine();
  }

  closeCalculatorModal() {
    const modal = document.getElementById('calculatorModal');
    if (modal) modal.classList.remove('active');
  }

  // 11. Checkout Flow
  initCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const closeBtn = document.getElementById('closeCheckoutBtn');

    closeBtn?.addEventListener('click', () => {
      checkoutModal?.classList.remove('active');
    });

    // Step 1: Contact
    document.getElementById('toDeliveryBtn')?.addEventListener('click', () => {
      checkout.formData.email = document.getElementById('coEmail')?.value;
      checkout.formData.phone = document.getElementById('coPhone')?.value;
      if (!checkout.formData.phone) {
        this.showToast('Please enter your phone number for delivery updates', 'danger');
        return;
      }
      checkout.setStep(2);
    });

    // Step 2: Delivery
    document.getElementById('backToContactBtn')?.addEventListener('click', () => checkout.setStep(1));
    document.getElementById('toPaymentBtn')?.addEventListener('click', () => {
      checkout.formData.firstName = document.getElementById('coFirstName')?.value;
      checkout.formData.lastName = document.getElementById('coLastName')?.value;
      checkout.formData.address = document.getElementById('coAddress')?.value;
      checkout.formData.city = document.getElementById('coCity')?.value;
      checkout.formData.county = document.getElementById('coCounty')?.value;
      checkout.setStep(3);
      this.updateCheckoutSummaryDisplay();
    });

    // Delivery options cards
    document.querySelectorAll('.delivery-opt-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.delivery-opt-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const method = card.getAttribute('data-method');
        cart.setDeliveryMethod(method);
      });
    });

    // Payment options cards
    document.querySelectorAll('.payment-opt-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.payment-opt-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        checkout.formData.paymentMethod = card.getAttribute('data-payment');
      });
    });

    // Step 3: Payment Submit
    document.getElementById('backToDeliveryBtn')?.addEventListener('click', () => checkout.setStep(2));
    document.getElementById('placeOrderBtn')?.addEventListener('click', () => {
      checkout.processPayment((order) => {
        checkoutModal?.classList.remove('active');
        this.openOrderConfirmation(order);
      });
    });
  }

  openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;
    checkout.setStep(1);
    this.updateCheckoutSummaryDisplay();
    modal.classList.add('active');
  }

  updateCheckoutSummaryDisplay() {
    const sub = document.getElementById('coSubtotal');
    const fee = document.getElementById('coDeliveryFee');
    const tot = document.getElementById('coTotal');

    if (sub) sub.textContent = `KSh ${cart.getSubtotal().toLocaleString()}`;
    if (fee) fee.textContent = cart.deliveryFee === 0 ? 'FREE' : `KSh ${cart.deliveryFee.toLocaleString()}`;
    if (tot) tot.textContent = `KSh ${cart.getTotal().toLocaleString()}`;
  }

  openOrderConfirmation(order) {
    const confirmModal = document.getElementById('orderConfirmModal');
    if (!confirmModal) return;

    document.getElementById('confirmOrderId').textContent = order.id;
    document.getElementById('confirmPhone').textContent = order.phone;
    document.getElementById('confirmAddress').textContent = order.address;
    document.getElementById('confirmTotal').textContent = `KSh ${order.total.toLocaleString()}`;
    
    // Simulate SMS toast
    this.showToast(`SMS Sent to ${order.phone} via Africa's Talking: "Zelt Order #${order.id} Confirmed!"`);
    confirmModal.classList.add('active');
  }

  // 12. 5-Stage Order Tracking
  initTracking() {
    const trackBtn = document.getElementById('lookupOrderBtn');
    const trackInput = document.getElementById('trackOrderInput');

    trackBtn?.addEventListener('click', () => {
      const q = trackInput?.value.trim();
      this.renderOrderTracking(q);
    });

    trackInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.renderOrderTracking(trackInput.value.trim());
      }
    });
  }

  renderOrderTracking(orderId) {
    const order = findOrder(orderId);
    const container = document.getElementById('trackingResultContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="tracking-header-card">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-default); padding-bottom: 16px; margin-bottom: 16px;">
          <div>
            <span class="section-label">LIVE ORDER DISPATCH TELEMETRY</span>
            <h3 style="font-size: 22px;">Order #${order.id}</h3>
            <p style="color: var(--text-secondary); font-size: 13px;">Placed on ${order.date} · Customer: ${order.customer}</p>
          </div>
          <div class="badge badge-mint" style="font-size: 13px; padding: 6px 14px;">
            ${order.status}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">
          <div>
            <div style="color: var(--text-muted);">Destination Address:</div>
            <strong style="color: var(--text-primary);">${order.address}</strong>
          </div>
          <div>
            <div style="color: var(--text-muted);">Courier & Waybill:</div>
            <strong style="color: var(--accent-primary);">${order.courier || 'Wells Fargo Couriers Kenya'} (${order.waybill})</strong>
          </div>
        </div>

        <!-- 5-Stage Timeline -->
        <h4 style="font-size: 14px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 14px;">5-Stage Fulfillment Pipeline</h4>
        <div class="tracking-timeline">
          ${order.stages.map((stg) => `
            <div class="tracking-step-row ${stg.done ? 'completed' : ''} ${stg.current ? 'current' : ''}">
              <div class="tracking-step-bullet">
                ${stg.done && !stg.current ? '✓' : ''}
              </div>
              <div class="tracking-step-body">
                <h4>${stg.name}</h4>
                <p>${stg.time}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Order Items -->
        <div style="margin-top: 30px; border-top: 1px solid var(--border-default); padding-top: 20px;">
          <h5 style="font-size: 13px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 12px;">Package Contents:</h5>
          ${order.items.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
              <span>${item.name} × ${item.quantity}</span>
              <span class="mono" style="color: var(--text-primary);">KSh ${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 13. Admin Dashboard View (/admin)
  initAdmin() {
    this.renderAdminView();
  }

  renderAdminView() {
    const adminContainer = document.getElementById('adminViewContainer');
    if (!adminContainer) return;

    const metrics = adminPortal.getMetrics();
    const orders = adminPortal.getOrders();

    adminContainer.innerHTML = `
      <div class="admin-header-row">
        <div>
          <span class="section-label">ZELT INTERNAL OPERATIONS PORTAL</span>
          <h2 style="font-size: 30px;">Good morning, Fatuma</h2>
          <p style="color: var(--text-secondary); font-size: 13px;">Counter & Dispatch Manager · Mwangaza Arcade Shop G7</p>
        </div>
        <div class="badge badge-stock" style="font-size: 12px;">
          System Status: Connected to Pesapal & Africa's Talking SMS
        </div>
      </div>

      <!-- Metrics -->
      <div class="admin-metrics-grid">
        <div class="admin-metric-card">
          <div class="text-secondary" style="font-size: 12px; text-transform: uppercase;">Today's Revenue</div>
          <div class="admin-metric-val">KSh ${metrics.salesToday.toLocaleString()}</div>
          <div class="text-muted" style="font-size: 12px; margin-top: 4px;">6 retail orders processed</div>
        </div>

        <div class="admin-metric-card">
          <div class="text-secondary" style="font-size: 12px; text-transform: uppercase;">Orders Pending Dispatch</div>
          <div class="admin-metric-val" style="color: var(--accent-secondary);">${metrics.pendingCount} Orders</div>
          <div class="text-muted" style="font-size: 12px; margin-top: 4px;">Requires packaging & waybill check</div>
        </div>

        <div class="admin-metric-card alert">
          <div style="color: var(--accent-danger); font-size: 12px; text-transform: uppercase;">Low Stock Inventory Alert</div>
          <div class="admin-metric-val">${metrics.lowStockProducts.length} Items Below Threshold</div>
          <div style="color: var(--accent-danger); font-size: 12px; margin-top: 4px;">
            ${metrics.lowStockProducts.map(p => `${p.name.slice(0, 20)}: ${p.stockQty} left`).join(' · ')}
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 18px; margin-bottom: 16px;">Live Customer Orders</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total (KES)</th>
              <th>Waybill</th>
              <th>Fulfillment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td class="mono font-bold" style="color: var(--accent-primary);">${o.id}</td>
                <td>
                  <strong>${o.customer}</strong><br>
                  <span style="color: var(--text-muted); font-size: 11px;">${o.phone}</span>
                </td>
                <td>${o.items}</td>
                <td class="mono">KSh ${o.total.toLocaleString()}</td>
                <td class="mono">${o.waybill || '—'}</td>
                <td>
                  <select class="admin-status-select" data-order-id="${o.id}" style="padding: 4px 8px; font-size: 12px;">
                    <option value="Confirmed & Processing" ${o.status === 'Confirmed & Processing' ? 'selected' : ''}>Confirmed & Processing</option>
                    <option value="Ready for Dispatch" ${o.status === 'Ready for Dispatch' ? 'selected' : ''}>Ready for Dispatch</option>
                    <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                    <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-outline-mint" data-update-order="${o.id}" style="padding: 4px 10px; font-size: 11px;">
                    Update & SMS
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind Admin status updates
    adminContainer.querySelectorAll('[data-update-order]').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.getAttribute('data-update-order');
        const select = adminContainer.querySelector(`select[data-order-id="${orderId}"]`);
        const newStatus = select?.value;

        let newStage = 2;
        if (newStatus === 'Ready for Dispatch') newStage = 3;
        if (newStatus === 'Out for Delivery') newStage = 4;
        if (newStatus === 'Delivered') newStage = 5;

        adminPortal.updateOrderStatus(orderId, newStatus, newStage, ({ phone, message }) => {
          this.showToast(`SMS Sent to ${phone} via Africa's Talking: "${message}"`);
        });
        this.renderAdminView();
      });
    });
  }

  // 14. Zelt AI Advisor Chatbot
  initChatbot() {
    const fab = document.getElementById('chatbotFab');
    const chatWin = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('closeChatBtn');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    const msgsBox = document.getElementById('chatMessages');

    fab?.addEventListener('click', () => {
      chatWin?.classList.toggle('active');
    });

    closeBtn?.addEventListener('click', () => {
      chatWin?.classList.remove('active');
    });

    const handleSend = () => {
      const txt = input?.value.trim();
      if (!txt) return;

      // Append user msg
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user';
      userMsg.textContent = txt;
      msgsBox?.appendChild(userMsg);
      input.value = '';

      if (msgsBox) msgsBox.scrollTop = msgsBox.scrollHeight;

      // Bot thinking response
      setTimeout(() => {
        const reply = chatbot.getResponse(txt);
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        botMsg.innerHTML = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgsBox?.appendChild(botMsg);
        if (msgsBox) msgsBox.scrollTop = msgsBox.scrollHeight;
      }, 500);
    };

    sendBtn?.addEventListener('click', handleSend);
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // 15. Back to Top Button
  initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn?.classList.add('show');
      } else {
        btn?.classList.remove('show');
      }
    });

    btn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 16. Catalog View Filtering
  openCatalogView(categoryId = 'all') {
    this.activeFilterCategory = categoryId;
    this.switchView('catalog');
    this.renderCatalogView();
  }

  renderCatalogView() {
    const grid = document.getElementById('catalogProductsGrid');
    const titleEl = document.getElementById('catalogCategoryTitle');
    const countEl = document.getElementById('catalogItemCount');
    if (!grid) return;

    let items = PRODUCTS;
    if (this.activeFilterCategory !== 'all') {
      items = PRODUCTS.filter(p => p.category === this.activeFilterCategory);
      const catObj = CATEGORIES.find(c => c.id === this.activeFilterCategory);
      if (titleEl) titleEl.textContent = catObj ? catObj.name : 'All Products';
    } else {
      if (titleEl) titleEl.textContent = 'Complete Product Catalog';
    }

    if (countEl) countEl.textContent = `${items.length} Products`;
    grid.innerHTML = items.map(p => this.createProductCardHtml(p)).join('');
    this.bindProductCardEvents(grid);
  }

  switchView(viewName) {
    this.currentView = viewName;
    const views = ['homeView', 'catalogView', 'trackingView', 'adminView'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.style.display = (v === `${viewName}View`) ? 'block' : 'none';
    });

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
    document.querySelector(`[data-nav="${viewName}"]`)?.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupEventListeners() {
    // Nav links
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav');
        this.switchView(target);
      });
    });

    // Calculator triggers
    document.querySelectorAll('[data-open-calculator]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCalculatorModal();
      });
    });

    document.getElementById('closeCalcBtn')?.addEventListener('click', () => {
      this.closeCalculatorModal();
    });

    // Dismiss modals when clicking backdrop outside card
    document.getElementById('calculatorModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'calculatorModal') this.closeCalculatorModal();
    });
    document.getElementById('pdpModalBackdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'pdpModalBackdrop') document.getElementById('pdpModalBackdrop').classList.remove('active');
    });
    document.getElementById('checkoutModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'checkoutModal') document.getElementById('checkoutModal').classList.remove('active');
    });

    // Mobile menu toggle
    const mobBtn = document.getElementById('mobileMenuBtn');
    const mobDrawer = document.getElementById('mobileNavDrawer');
    const closeMob = document.getElementById('closeMobileNavBtn');

    const mobBackdrop = document.createElement('div');
    mobBackdrop.id = 'mobileNavBackdrop';
    mobBackdrop.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:498;-webkit-tap-highlight-color:transparent;';
    document.body.appendChild(mobBackdrop);

    const openMobileNav = () => {
      mobDrawer?.classList.add('active');
      mobBackdrop.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };
    const closeMobileNav = () => {
      mobDrawer?.classList.remove('active');
      mobBackdrop.style.display = 'none';
      document.body.style.overflow = '';
    };

    mobBtn?.addEventListener('click', openMobileNav);
    closeMob?.addEventListener('click', closeMobileNav);
    mobBackdrop.addEventListener('click', closeMobileNav);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'danger' ? 'toast-danger' : ''}`;
    toast.innerHTML = `
      <span>${type === 'danger' ? '!' : '✓'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Instantiate and attach to window
window.addEventListener('DOMContentLoaded', () => {
  window.zeltApp = new ZeltApp();
  window.zeltApp.init();
});
