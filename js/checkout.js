/* ==========================================================================
   ZELT CHECKOUT & PESAPAL PAYMENT ENGINE
   3-Step Distraction-Free Flow, M-Pesa STK Push Simulation,
   Card & PesaLink Unified Gateway, Order Placement
   ========================================================================== */

import { cart } from './cart.js';

export class CheckoutManager {
  constructor() {
    this.currentStep = 1;
    this.formData = {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      address: '',
      city: 'Nairobi',
      county: 'Nairobi',
      deliveryMethod: 'nairobi-boda',
      paymentMethod: 'mpesa'
    };
  }

  setStep(step) {
    this.currentStep = step;
    this.renderStepView();
  }

  renderStepView() {
    const stepNodes = document.querySelectorAll('.checkout-step-node');
    stepNodes.forEach((node, idx) => {
      const stepNum = idx + 1;
      node.classList.remove('active', 'done');
      if (stepNum === this.currentStep) {
        node.classList.add('active');
      } else if (stepNum < this.currentStep) {
        node.classList.add('done');
      }
    });

    const stepSections = document.querySelectorAll('.checkout-step-content');
    stepSections.forEach((sec, idx) => {
      sec.style.display = (idx + 1 === this.currentStep) ? 'block' : 'none';
    });
  }

  processPayment(onSuccess) {
    const phone = this.formData.phone || '+254 712 345 678';
    const amount = cart.getTotal();
    const orderId = `ZLT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (this.formData.paymentMethod === 'mpesa') {
      // Show M-Pesa STK Push Prompt modal
      const stkModal = document.getElementById('mpesaStkModal');
      const stkPhoneDisplay = document.getElementById('stkPhoneDisplay');
      const stkAmountDisplay = document.getElementById('stkAmountDisplay');
      
      if (stkPhoneDisplay) stkPhoneDisplay.textContent = phone;
      if (stkAmountDisplay) stkAmountDisplay.textContent = `KSh ${amount.toLocaleString()}`;
      if (stkModal) stkModal.classList.add('active');

      // Simulate phone confirmation after 2.8 seconds
      setTimeout(() => {
        if (stkModal) stkModal.classList.remove('active');
        this.completeOrder(orderId, onSuccess);
      }, 2800);
    } else {
      // Direct processing for Card / PesaLink
      setTimeout(() => {
        this.completeOrder(orderId, onSuccess);
      }, 1500);
    }
  }

  completeOrder(orderId, onSuccess) {
    const orderRecord = {
      id: orderId,
      date: new Date().toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customer: `${this.formData.firstName || 'Jane'} ${this.formData.lastName || 'Wanjiku'}`,
      phone: this.formData.phone || '+254 701 884 358',
      email: this.formData.email || 'customer@gmail.com',
      address: `${this.formData.address || 'Westlands'}, ${this.formData.city || 'Nairobi'}`,
      items: [...cart.items],
      subtotal: cart.getSubtotal(),
      deliveryFee: cart.deliveryFee,
      total: cart.getTotal(),
      paymentMethod: this.formData.paymentMethod.toUpperCase(),
      status: 'Confirmed & Processing',
      trackingStage: 2, // 1: Received, 2: Confirmed, 3: Ready, 4: Out for Delivery, 5: Delivered
      waybill: `WF-2026-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Store in localStorage for tracking & admin views
    const existingOrders = JSON.parse(localStorage.getItem('zelt_orders_obsidian') || '[]');
    existingOrders.unshift(orderRecord);
    localStorage.setItem('zelt_orders_obsidian', JSON.stringify(existingOrders));

    // Clear the cart
    cart.clearCart();

    if (onSuccess) onSuccess(orderRecord);
  }
}

export const checkout = new CheckoutManager();
