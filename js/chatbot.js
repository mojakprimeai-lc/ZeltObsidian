/* ==========================================================================
   ZELT AI ADVISOR — POWERED BY MOJAK PRIME AI
   Intelligent Solar & Electrical Product Advisor, System Sizing Assistant,
   Nairobi Delivery & Showroom FAQ, WhatsApp Handoff
   ========================================================================== */

export class ZeltChatbot {
  constructor() {
    this.messages = [
      {
        sender: 'bot',
        text: "Habari! I am your **Zelt AI Advisor**, powered by MOJAK PRIME AI. Looking for the right solar system size, battery specs, or floodlight for your property? Ask me anything!"
      }
    ];
  }

  getResponse(userInput) {
    const text = (userInput || '').toLowerCase();

    // 1. Sizing / Calculator inquiry
    if (text.includes('size') || text.includes('calculator') || text.includes('bill') || text.includes('kplc') || text.includes('how many panel')) {
      return "To size your solar system accurately: Take your monthly KPLC bill in KSh (e.g. KSh 6,000 = ~300 kWh/mo). Typically, a 3.5kW to 5kW hybrid solar inverter paired with a 48V 100Ah–200Ah LiFePO4 lithium battery and 6x 550W panels eliminates 85%+ of your electricity bill! You can also use our interactive **Solar Calculator** tool in the top navigation.";
    }

    // 2. Battery / Lithium vs Gel
    if (text.includes('battery') || text.includes('lithium') || text.includes('gel') || text.includes('lifepo4')) {
      return "We strongly recommend **LiFePO4 Lithium batteries** (such as our Felicity 48V 200Ah 9.6kWh unit). Unlike old gel batteries that last only 2–3 years, lithium provides **6,000+ deep cycles (10–15 years)**, charges in under 3 hours, and requires zero acid maintenance.";
    }

    // 3. Floodlights / Streetlights
    if (text.includes('floodlight') || text.includes('street') || text.includes('light') || text.includes('outdoor')) {
      return "Our **MODI 200W Commercial Solar Floodlight** (KSh 6,500) and **300W Integrated Streetlight** (KSh 11,500) are our top sellers. Both feature IP65/IP67 weatherproof seals, monocrystalline panels, dusk-to-dawn sensors, and wireless remotes. Perfect for homes, estates, and perimeter security.";
    }

    // 4. Delivery / Wells Fargo / Locations
    if (text.includes('delivery') || text.includes('deliver') || text.includes('wells fargo') || text.includes('county') || text.includes('mombasa') || text.includes('nakuru') || text.includes('kisumu')) {
      return "We offer **Nationwide Delivery across all 47 counties in Kenya**! Within Nairobi, delivery is same-day or next-day via bodaboda (KSh 300). Outside Nairobi (Mombasa, Nakuru, Eldoret, Kisumu, etc.), we ship securely via Wells Fargo Couriers Kenya within 2–3 business days with live waybill tracking.";
    }

    // 5. Shop locations / Counter
    if (text.includes('shop') || text.includes('location') || text.includes('where') || text.includes('arcade') || text.includes('office') || text.includes('address')) {
      return "You are warmly welcome to visit our physical showrooms in Nairobi CBD:\n• **Shop G7, Mwangaza Arcade**, Charles Rubia Road (near Sheikh Karume Rd)\n• **Shop 35, JBC Mall**, Sheikh Karume Road\nWe are open Monday to Saturday, 8:00 AM – 6:00 PM.";
    }

    // 6. Payment / Pesapal / M-Pesa
    if (text.includes('pay') || text.includes('mpesa') || text.includes('m-pesa') || text.includes('card') || text.includes('pesapal')) {
      return "We accept secure payments via **Pesapal**: M-Pesa STK Push directly to our Equity Bank Paybill, Visa/Mastercard, and PesaLink bank transfers. You can also pay upon collection at our Nairobi shop!";
    }

    // Default fallback with WhatsApp invitation
    return "I can help you select the ideal solar components for your specific requirements. Would you like to connect directly with our technical team on WhatsApp (+254 701 884 358) for a custom installation quotation?";
  }
}

export const chatbot = new ZeltChatbot();
