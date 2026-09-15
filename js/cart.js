/* ==========================================================================
   ZELT CART & WISHLIST MODULE
   Slide-in drawer state, local persistence, discount voucher codes,
   subtotal & delivery fee calculation
   ========================================================================== */

import { PRODUCTS } from './products.js';

class CartManager {
  constructor() {
    this.storageKey = 'zelt_cart_obsidian';
    this.wishlistKey = 'zelt_wishlist_obsidian';
    this.items = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.discountCode = null;
    this.discountAmount = 0;
    this.deliveryMethod = 'nairobi-boda'; // 'nairobi-boda', 'wells-fargo', 'shop-pickup'
    this.deliveryFee = 300;
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.notifyUpdate();
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(this.wishlistKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
    this.notifyWishlistUpdate();
  }

  addItem(productId, quantity = 1, variant = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex(
      item => item.id === productId && item.variant === variant
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: variant || (product.variants ? product.variants[0] : null),
        quantity: Math.max(1, quantity)
      });
    }

    this.saveCart();
    return product;
  }

  updateQuantity(productId, variant, newQty) {
    const itemIndex = this.items.findIndex(
      item => item.id === productId && item.variant === variant
    );
    if (itemIndex > -1) {
      if (newQty <= 0) {
        this.items.splice(itemIndex, 1);
      } else {
        this.items[itemIndex].quantity = newQty;
      }
      this.saveCart();
    }
  }

  removeItem(productId, variant) {
    this.items = this.items.filter(
      item => !(item.id === productId && item.variant === variant)
    );
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.discountCode = null;
    this.discountAmount = 0;
    this.saveCart();
  }

  setDeliveryMethod(method) {
    this.deliveryMethod = method;
    if (method === 'shop-pickup') {
      this.deliveryFee = 0;
    } else if (method === 'wells-fargo') {
      this.deliveryFee = 600;
    } else {
      this.deliveryFee = 300;
    }
    this.notifyUpdate();
  }

  applyDiscount(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'ZELT10') {
      this.discountCode = 'ZELT10';
      this.discountAmount = Math.round(this.getSubtotal() * 0.10);
      this.notifyUpdate();
      return { success: true, message: '10% Discount Applied Successfully!' };
    } else if (cleanCode === 'KARIBU') {
      this.discountCode = 'KARIBU';
      this.discountAmount = Math.min(500, this.getSubtotal());
      this.notifyUpdate();
      return { success: true, message: 'KSh 500 Welcome Discount Applied!' };
    } else {
      return { success: false, message: 'Invalid discount code. Try ZELT10 or KARIBU' };
    }
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotal() {
    const sub = this.getSubtotal();
    if (sub === 0) return 0;
    return Math.max(0, sub - this.discountAmount + this.deliveryFee);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Wishlist methods
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    this.saveWishlist();
    return added;
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  notifyUpdate() {
    window.dispatchEvent(new CustomEvent('zelt:cart-updated', {
      detail: {
        items: this.items,
        subtotal: this.getSubtotal(),
        total: this.getTotal(),
        count: this.getItemCount(),
        deliveryFee: this.deliveryFee,
        discountAmount: this.discountAmount
      }
    }));
  }

  notifyWishlistUpdate() {
    window.dispatchEvent(new CustomEvent('zelt:wishlist-updated', {
      detail: { wishlist: this.wishlist }
    }));
  }
}

export const cart = new CartManager();
