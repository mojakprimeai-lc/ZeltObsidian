/* ==========================================================================
   ZELT SOLAR SIZING CALCULATOR ENGINE
   Exact formulas from Section 8 of zelt_ecommerce_context.md
   Kenya tariff: KES 20/kWh, Peak Sun Hours: 5.0 (Nairobi) / 5.5 (Upcountry)
   ========================================================================== */

export function calculateSolarSystem({
  monthlyBillKes,
  appliances = [],
  goal = 'reduce', // 'backup', 'reduce', 'offgrid'
  location = 'nairobi' // 'nairobi', 'upcountry'
}) {
  const KPLC_TARIFF = 20.0; // KES per kWh average in Kenya
  const bill = Math.max(1000, Number(monthlyBillKes) || 6000);
  
  // 1. Energy Usage Calculation
  const monthlyKwh = bill / KPLC_TARIFF;
  const dailyKwh = monthlyKwh / 30.0;
  
  // 2. Solar PV Sizing
  // Nairobi peak sun hours: 5.0, Upcountry peak sun hours: 5.5
  const peakSunHours = location === 'upcountry' ? 5.5 : 5.0;
  const solarEfficiencyBuffer = 0.80; // 20% system loss buffer
  
  let requiredSolarKw = (dailyKwh / peakSunHours) / solarEfficiencyBuffer;
  
  // 3. Battery Storage Sizing
  // 1 day backup for hybrid/reduce bills, 2 days for complete offgrid
  const backupDays = goal === 'offgrid' ? 2.0 : (goal === 'backup' ? 1.0 : 1.2);
  const depthOfDischarge = 0.80; // 80% DoD for LiFePO4 Lithium
  
  let batteryKwh = (dailyKwh * backupDays) / depthOfDischarge;
  
  // If user only wants backup power for a few essential appliances
  if (goal === 'backup') {
    requiredSolarKw = Math.min(requiredSolarKw, 3.0); // smaller panel array needed
  }
  
  // Convert battery kWh to Ah at 48V standard nominal
  const batteryAh48V = Math.round((batteryKwh * 1000) / 48);
  
  // 4. Inverter Sizing (kW) based on appliances
  let baseInverterKw = 3.5;
  if (appliances.includes('water-pump') || appliances.includes('ac') || appliances.includes('kettle')) {
    baseInverterKw = 5.0;
  }
  if (appliances.length > 5 || bill > 15000 || goal === 'offgrid') {
    baseInverterKw = 8.0;
  }
  
  // Round solar panels to sensible commercial increments (e.g. 550W panels)
  const panels550wCount = Math.max(4, Math.ceil((requiredSolarKw * 1000) / 550));
  const actualSolarKw = Number(((panels550wCount * 550) / 1000).toFixed(1));
  
  // 5. System Cost Range (KES)
  // Panel cost ~25 KES/W, Lithium battery ~20,000 KES/kWh, Inverter ~16,000 KES/kW + accessories & installation
  const panelsCost = actualSolarKw * 1000 * 25;
  const batteryCost = batteryKwh * 21000;
  const inverterCost = baseInverterKw * 17000;
  const installationAndBos = 35000 + (actualSolarKw * 4000);
  
  const estimatedCostMin = Math.round((panelsCost + batteryCost + inverterCost + installationAndBos) * 0.92);
  const estimatedCostMax = Math.round((panelsCost + batteryCost + inverterCost + installationAndBos) * 1.15);
  
  // 6. Monthly Savings & Payback Period
  let monthlySavingsFactor = 0.85; // 85% bill reduction for 'reduce'
  if (goal === 'offgrid') monthlySavingsFactor = 1.0;
  if (goal === 'backup') monthlySavingsFactor = 0.40;
  
  const monthlySavings = Math.round(bill * monthlySavingsFactor);
  const annualSavings = monthlySavings * 12;
  const averageCost = (estimatedCostMin + estimatedCostMax) / 2;
  const paybackYears = Number((averageCost / annualSavings).toFixed(1));
  
  return {
    bill,
    dailyKwh: dailyKwh.toFixed(1),
    solarKw: actualSolarKw,
    panelsCount: panels550wCount,
    batteryKwh: batteryKwh.toFixed(1),
    batteryAh48V,
    inverterKw: baseInverterKw,
    costRangeMin: estimatedCostMin,
    costRangeMax: estimatedCostMax,
    monthlySavings,
    paybackYears: Math.max(2.5, Math.min(paybackYears, 5.8)),
    sunHours: peakSunHours
  };
}
