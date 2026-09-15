/* ==========================================================================
   ZELT COUNTER STAFF ADMIN PORTAL (Fatuma's View)
   Dark Obsidian theme, order management, status updates with SMS trigger,
   inventory threshold alerts
   ========================================================================== */

import { PRODUCTS } from './products.js';

export class AdminPortal {
  constructor() {
    this.ordersKey = 'zelt_orders_obsidian';
  }

  getOrders() {
    const defaultOrders = [
      {
        id: "ZLT-8851",
        customer: "Peter Kamau",
        phone: "+254 722 114 883",
        items: "4G Solar PTZ Camera ×1",
        total: 14500,
        status: "Confirmed & Processing",
        trackingStage: 2,
        waybill: "WF-2024-994102"
      },
      {
        id: "ZLT-8850",
        customer: "Grace Muthoni",
        phone: "+254 733 490 128",
        items: "200W Solar Floodlight ×4",
        total: 26000,
        status: "Delivered",
        trackingStage: 5,
        waybill: "WF-2024-993781"
      },
      {
        id: "ZLT-8849",
        customer: "Hassan Ali",
        phone: "+254 705 667 921",
        items: "63A Automatic Transfer Switch ×2",
        total: 9000,
        status: "Out for Delivery",
        trackingStage: 4,
        waybill: "Boda-CBD-44"
      }
    ];

    const stored = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    return [...stored, ...defaultOrders];
  }

  updateOrderStatus(orderId, newStatus, newStage, onSmsNotify) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.trackingStage = newStage;
      
      // Update local storage
      const customOrders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
      const customIdx = customOrders.findIndex(o => o.id === orderId);
      if (customIdx > -1) {
        customOrders[customIdx].status = newStatus;
        customOrders[customIdx].trackingStage = newStage;
        localStorage.setItem(this.ordersKey, JSON.stringify(customOrders));
      }

      // Trigger simulated Africa's Talking SMS
      if (onSmsNotify) {
        onSmsNotify({
          phone: order.phone,
          message: `Zelt Alert: Order #${order.id} status updated to [${newStatus}]. Track at zeltsolar.co.ke/track`
        });
      }
    }
  }

  getMetrics() {
    const orders = this.getOrders();
    const todaySales = orders.reduce((sum, o) => sum + (o.total || 0), 47500);
    const pendingCount = orders.filter(o => o.status.includes("Processing") || o.status.includes("Pending")).length;
    const lowStockProducts = PRODUCTS.filter(p => p.stockQty <= 8);

    return {
      salesToday: todaySales,
      ordersCount: orders.length,
      pendingCount,
      lowStockProducts
    };
  }
}

export const adminPortal = new AdminPortal();
