/* ==========================================================================
   ZELT 5-STAGE ORDER TRACKING MODULE
   Stages:
   1. Order Received
   2. Confirmed & Processing
   3. Ready for Dispatch
   4. Out for Delivery
   5. Delivered
   ========================================================================== */

const SEEDED_ORDERS = [
  {
    id: "ZLT-2024-8847",
    date: "Sept 15, 2026 — 10:23am",
    customer: "Jane Wanjiku",
    phone: "+254 712 998 441",
    email: "jane.wanjiku@gmail.com",
    address: "Westlands, Nairobi",
    courier: "Wells Fargo Couriers Kenya",
    waybill: "WF-2024-993847",
    status: "Out for Delivery",
    trackingStage: 4,
    items: [
      { name: "200W Commercial Solar Floodlight IP65", quantity: 2, price: 6500 },
      { name: "550W Tier-1 Mono PERC Solar Panel", quantity: 1, price: 13500 },
      { name: "5kW 48V Pure Sine Wave Hybrid Inverter", quantity: 1, price: 85000 }
    ],
    total: 111500,
    stages: [
      { name: "Order Received", time: "Sept 15, 2026 — 10:23am", done: true },
      { name: "Confirmed & Processing", time: "Sept 15, 2026 — 11:45am", done: true },
      { name: "Ready for Dispatch", time: "Sept 16, 2026 — 08:30am", done: true },
      { name: "Out for Delivery", time: "Current — Sept 16, 2026", done: true, current: true },
      { name: "Delivered", time: "Estimated: Sept 17, 2026", done: false }
    ]
  }
];

export function findOrder(queryId) {
  const cleanId = (queryId || '').trim().toUpperCase();
  // Check local storage orders first
  const stored = JSON.parse(localStorage.getItem('zelt_orders_obsidian') || '[]');
  const match = stored.find(o => o.id.toUpperCase() === cleanId || cleanId.includes(o.id.toUpperCase()));
  if (match) {
    // Generate stages array based on trackingStage
    const stageNum = match.trackingStage || 2;
    match.stages = [
      { name: "Order Received", time: `${match.date}`, done: stageNum >= 1, current: stageNum === 1 },
      { name: "Confirmed & Processing", time: "Within 2 hours of payment", done: stageNum >= 2, current: stageNum === 2 },
      { name: "Ready for Dispatch", time: "Packaging & QA at Mwangaza Arcade", done: stageNum >= 3, current: stageNum === 3 },
      { name: "Out for Delivery", time: `Dispatched via ${match.waybill ? 'Wells Fargo' : 'Bodaboda'}`, done: stageNum >= 4, current: stageNum === 4 },
      { name: "Delivered", time: "Estimated 2–3 business days", done: stageNum >= 5, current: stageNum === 5 }
    ];
    return match;
  }

  // Check seeded orders (e.g. ZLT-2024-8847)
  const seeded = SEEDED_ORDERS.find(o => o.id.toUpperCase() === cleanId || cleanId.includes("8847") || cleanId === "");
  return seeded || SEEDED_ORDERS[0];
}
