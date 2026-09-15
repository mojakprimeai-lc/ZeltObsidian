/* ==========================================================================
   ZELT SOLAR & ELECTRICALS — PRODUCT CATALOG DATA
   All 8 Structured Categories, Real Kenyan KSh Pricing, Authentic Specs
   ========================================================================== */

export const CATEGORIES = [
  {
    id: "solar-energy",
    name: "Solar Energy Systems",
    shortName: "Solar Systems",
    description: "High-efficiency panels, hybrid inverters, LiFePO4 lithium batteries & complete solar kits.",
    image: "assets/images/hybrid_system.jpg",
    itemCount: 28,
    subCategories: ["Solar Panels", "Solar Inverters", "Solar Batteries", "Solar Charge Controllers", "Solar Pumps", "Home Solar Kits"]
  },
  {
    id: "solar-outdoor",
    name: "Solar Outdoor Lighting",
    shortName: "Solar Lighting",
    description: "Commercial floodlights, dusk-to-dawn streetlights, garden beacons & solar wall lights.",
    image: "assets/images/solar_floodlight.jpg",
    itemCount: 42,
    subCategories: ["Solar Floodlights", "Solar Street Lights", "Solar Garden Lights", "Solar Gate Lights", "Solar Wall Lights"]
  },
  {
    id: "solar-specialty",
    name: "Solar Specialty Products",
    shortName: "Solar Specialty",
    description: "4G solar security cameras, pressurized solar water heaters & submersible solar pumps.",
    image: "assets/images/solar_camera.jpg",
    itemCount: 19,
    subCategories: ["Solar Cameras 4G/WiFi", "Solar Water Heaters", "Solar Water Pumps", "Solar Emergency Lights"]
  },
  {
    id: "indoor-decorative",
    name: "Indoor & Decorative Lighting",
    shortName: "Indoor & Decor",
    description: "Modern architectural chandeliers, pendant lights, magnetic track rails & sunset lamps.",
    image: "assets/images/chandelier.jpg",
    itemCount: 34,
    subCategories: ["Chandeliers", "Pendant Lights", "Track Lights & Rails", "Downlighters", "Mirror & Step Lights"]
  },
  {
    id: "outdoor-ac",
    name: "Outdoor Lighting (AC)",
    shortName: "AC Outdoor",
    description: "Heavy-duty AC floodlights, industrial streetlights, gate pillars & IP65 bulkheads.",
    image: "assets/images/solar_floodlight.jpg",
    itemCount: 22,
    subCategories: ["AC Floodlights", "AC Street Lights", "AC Gate Lights", "Bulkheads", "Wall Brackets"]
  },
  {
    id: "bulbs-tubes",
    name: "Bulbs & Tubes",
    shortName: "Bulbs & Tubes",
    description: "Commercial LED energy-saving bulbs, T8 diffusers, smart RGB bulbs & batten fittings.",
    image: "assets/images/showroom.jpg",
    itemCount: 26,
    subCategories: ["LED Bulbs", "Fluorescent Tubes", "Diffusers", "Showers & Bulb Holders"]
  },
  {
    id: "security-safety",
    name: "Security & Safety",
    shortName: "Security & Safety",
    description: "PIR motion sensors, photocells, strobe warning sirens & currency detectors.",
    image: "assets/images/solar_camera.jpg",
    itemCount: 15,
    subCategories: ["AC Cameras", "Motion Sensors", "Photocells", "Sirens & Strobe Warning"]
  },
  {
    id: "electrical-infrastructure",
    name: "Electrical Infrastructure",
    shortName: "Electrical",
    description: "Schneider & Chint MCBs, consumer units, changeover switches, surge arrestors & trunking.",
    image: "assets/images/hero.jpg",
    itemCount: 45,
    subCategories: ["MCBs & Consumer Units", "Switches & Sockets", "Changeover & Isolators", "Cables & Conduits"]
  }
];

export const PRODUCTS = [
  // 1. Solar Floodlight 200W
  {
    id: "zlt-fl-200",
    name: "200W Commercial Solar Floodlight IP65 with Motion Sensor",
    subtitle: "High-Lumen Dusk-to-Dawn with Monocrystalline Panel & Wireless Remote",
    category: "solar-outdoor",
    subCategory: "Solar Floodlights",
    brand: "MODI",
    wattage: 200,
    price: 6500,
    comparePrice: 8000,
    inStock: true,
    stockQty: 8,
    isTopSeller: true,
    isNewArrival: false,
    isDeal: true,
    rating: 4.8,
    reviewsCount: 32,
    image: "assets/images/solar_floodlight.jpg",
    variants: ["100W", "200W", "300W"],
    features: ["IP65 Waterproof", "With Motion Sensor", "With Remote Control", "Dusk to Dawn"],
    description: "Engineered for harsh Kenyan weather, this MODI 200W Commercial Solar Floodlight provides 20,000 lumens of crisp cool white light. Featuring high-grade monocrystalline panels and Grade-A LiFePO4 cells, it ensures continuous 14-hour illumination even during cloudy Nairobi rainy seasons.",
    specs: {
      "Brand": "MODI Solar",
      "Power Wattage": "200W",
      "Luminous Output": "20,000 Lumens",
      "Solar Panel": "6V 25W Monocrystalline",
      "Battery Type": "3.2V 30,000mAh LiFePO4",
      "Ingress Protection": "IP65 Weatherproof",
      "Charging Time": "4–6 Hours Full Sun",
      "Lighting Time": "12–16 Hours (Dusk-to-Dawn)",
      "Warranty": "2 Years Official Warranty"
    },
    frequentlyBoughtWith: ["zlt-acc-cable", "zlt-sw-timer"]
  },

  // 2. Hybrid Solar Inverter 5kW
  {
    id: "zlt-inv-5kw",
    name: "5kW 48V Pure Sine Wave Hybrid Solar Inverter (MPPT 100A)",
    subtitle: "Built-in 100A MPPT Charge Controller, KPLC Grid-Tie & Generator Auto-Start",
    category: "solar-energy",
    subCategory: "Solar Inverters",
    brand: "Growatt",
    wattage: 5000,
    price: 85000,
    comparePrice: 98000,
    inStock: true,
    stockQty: 4,
    isTopSeller: true,
    isNewArrival: false,
    isDeal: false,
    rating: 4.9,
    reviewsCount: 19,
    image: "assets/images/hybrid_system.jpg",
    variants: ["3.5kW", "5kW", "8kW"],
    features: ["Pure Sine Wave", "Dual MPPT", "WiFi Monitoring", "KPLC Bypass"],
    description: "The gold standard for residential and commercial solar backup in Kenya. Automatically balances KPLC grid power, solar panel generation, and battery storage. Zero switchover delay keeps TVs, computers, and medical equipment running uninterrupted.",
    specs: {
      "Brand": "Growatt / Felicity",
      "Rated Power": "5000W / 5kVA",
      "Battery Voltage": "48V DC",
      "MPPT Voltage Range": "120V – 450V DC",
      "Max Solar Input": "6000W PV",
      "Surge Power": "10,000VA (Instantaneous)",
      "Communication": "RS485 / CAN / WiFi Dongle",
      "Efficiency": "97.5% Peak",
      "Warranty": "3 Years Comprehensive"
    },
    frequentlyBoughtWith: ["zlt-bat-48v", "zlt-sp-550w"]
  },

  // 3. Lithium Battery 48V 200Ah
  {
    id: "zlt-bat-48v",
    name: "48V 200Ah (9.6kWh) LiFePO4 Lithium Battery Wall-Mount Storage",
    subtitle: "6,000+ Deep Cycles at 80% DoD with Smart Built-In BMS & LCD Telemetry",
    category: "solar-energy",
    subCategory: "Solar Batteries",
    brand: "Felicity",
    wattage: 9600,
    price: 195000,
    comparePrice: 220000,
    inStock: true,
    stockQty: 3,
    isTopSeller: true,
    isNewArrival: true,
    isDeal: true,
    rating: 5.0,
    reviewsCount: 14,
    image: "assets/images/hybrid_system.jpg",
    variants: ["48V 100Ah", "48V 200Ah"],
    features: ["Smart BMS Protection", "6000+ Cycles", "LCD Display", "Wall Mount"],
    description: "Grade-A prismatic lithium iron phosphate cells with 10–15 years operational life. Built-in smart BMS protects against overcharging, high temperature, and cell imbalance. Eliminates the maintenance and acid fumes of old gel batteries.",
    specs: {
      "Brand": "Felicity Solar / Pylontech",
      "Nominal Voltage": "48V / 51.2V",
      "Usable Capacity": "9.6 kWh (200Ah)",
      "Cycle Life": "6,000+ Cycles @ 80% DoD",
      "Max Discharge Current": "100A Continuous",
      "Weight": "78 kg",
      "Dimensions": "650 × 440 × 220 mm",
      "Warranty": "5 Years Manufacturer Guarantee"
    },
    frequentlyBoughtWith: ["zlt-inv-5kw", "zlt-sp-550w"]
  },

  // 4. Solar 4G PTZ Security Camera
  {
    id: "zlt-cam-4g",
    name: "4G Solar PTZ 360° Security Camera with Dual Night Vision & PIR",
    subtitle: "Standalone Wireless Surveillance for Farms, Construction Sites & Homes",
    category: "solar-specialty",
    subCategory: "Solar Cameras 4G/WiFi",
    brand: "Optonica",
    wattage: 15,
    price: 14500,
    comparePrice: 17500,
    inStock: true,
    stockQty: 12,
    isTopSeller: true,
    isNewArrival: true,
    isDeal: true,
    rating: 4.7,
    reviewsCount: 27,
    image: "assets/images/solar_camera.jpg",
    variants: ["WiFi Version", "4G SIM Card Version"],
    features: ["4G SIM Enabled", "Full 360 Pan/Tilt", "Color Night Vision", "Two-Way Audio"],
    description: "No electricity? No WiFi? No problem. Simply insert a Safaricom or Airtel SIM card. Powered by an integrated monocrystalline solar panel and lithium backup battery. Sends instant intruder video push notifications to your mobile phone anywhere in Kenya.",
    specs: {
      "Resolution": "3MP 2K Ultra HD",
      "Connectivity": "4G LTE (Safaricom / Airtel / Telkom)",
      "Pan / Tilt": "355° Horizontal, 90° Vertical",
      "Night Vision": "Full Color Spotlight & Dual IR (30m)",
      "Audio": "2-Way Realtime Intercom",
      "Storage": "MicroSD up to 128GB + Cloud Support",
      "Weatherproof": "IP66 Certified Outdoor Housing",
      "Warranty": "1 Year Replacement Warranty"
    },
    frequentlyBoughtWith: ["zlt-fl-200"]
  },

  // 5. Contemporary Architectural Chandelier
  {
    id: "zlt-chan-gold",
    name: "Nordic Smoked Glass & Champagne Gold LED Chandelier",
    subtitle: "Multi-Tier Contemporary Statement Luminaire for High-Ceiling Living Spaces",
    category: "indoor-decorative",
    subCategory: "Chandeliers",
    brand: "Optonica",
    wattage: 120,
    price: 38000,
    comparePrice: 45000,
    inStock: true,
    stockQty: 5,
    isTopSeller: false,
    isNewArrival: true,
    isDeal: false,
    rating: 4.9,
    reviewsCount: 11,
    image: "assets/images/chandelier.jpg",
    variants: ["60cm Diameter", "80cm Diameter", "100cm Diameter"],
    features: ["Smoked Crystal Glass", "Dimmable 3-Tone LED", "Adjustable Suspension"],
    description: "An architectural centerpiece crafted with champagne-gold electroplated steel and precision fluted smoked glass tubes. Includes 3-color tone switching (Warm 3000K, Neutral 4000K, Cool 6000K) via standard wall switch.",
    specs: {
      "Material": "Forged Stainless Steel & Fluted Glass",
      "Finish": "Brushed Champagne Gold & Smoked Grey",
      "Light Source": "Integrated High-CRI LED (>90 CRI)",
      "Color Temp": "3000K / 4000K / 6000K Adjustable",
      "Hanging Cord": "1.5m Adjustable Steel Cable",
      "Voltage": "220V–240V AC 50Hz",
      "Warranty": "2 Years"
    },
    frequentlyBoughtWith: ["zlt-sw-dimmer"]
  },

  // 6. Monocrystalline Solar Panel 550W
  {
    id: "zlt-sp-550w",
    name: "550W Tier-1 Mono PERC Half-Cell Solar Panel",
    subtitle: "High-Efficiency Photovoltaic Module with Anti-Reflective Toughened Glass",
    category: "solar-energy",
    subCategory: "Solar Panels",
    brand: "JA Solar",
    wattage: 550,
    price: 13500,
    comparePrice: 15500,
    inStock: true,
    stockQty: 35,
    isTopSeller: true,
    isNewArrival: false,
    isDeal: false,
    rating: 4.9,
    reviewsCount: 43,
    image: "assets/images/hero.jpg",
    variants: ["400W", "550W"],
    features: ["Tier-1 Brand", "Half-Cut Cell Tech", "21.5% Efficiency", "Hail-Resistant"],
    description: "Industry-leading 550W mono PERC panel providing superior yield in high-heat and low-light environments. Reinforced anodized aluminium frame rated for 5400Pa snow load and 2400Pa wind load.",
    specs: {
      "Brand": "JA Solar / Jinko",
      "Rated Max Power (Pmax)": "550W",
      "Open Circuit Voltage (Voc)": "49.8V",
      "Short Circuit Current (Isc)": "14.0A",
      "Cell Type": "Monocrystalline Half-Cell",
      "Dimensions": "2278 × 1134 × 35 mm",
      "Weight": "28.6 kg",
      "Warranty": "12 Years Product, 25 Years Performance"
    },
    frequentlyBoughtWith: ["zlt-inv-5kw", "zlt-bat-48v"]
  },

  // 7. Solar Street Light 300W All-in-One
  {
    id: "zlt-sl-300",
    name: "300W Integrated All-In-One Solar Streetlight with Pole Bracket",
    subtitle: "Heavy-Duty Die-Cast Aluminum Housing with Optical Lens for Roads & Estates",
    category: "solar-outdoor",
    subCategory: "Solar Street Lights",
    brand: "MODI",
    wattage: 300,
    price: 11500,
    comparePrice: 14000,
    inStock: true,
    stockQty: 16,
    isTopSeller: true,
    isNewArrival: false,
    isDeal: true,
    rating: 4.8,
    reviewsCount: 38,
    image: "assets/images/solar_floodlight.jpg",
    variants: ["150W", "300W", "500W"],
    features: ["All-in-One Design", "Radar Sensor", "Optical Lens Distribution", "IP67"],
    description: "Designed for estate perimeter lighting, access roads, and rural centers. Combines high-efficiency solar panel, high-capacity lithium battery, and intelligent MPPT controller into a single aerodynamic die-cast body.",
    specs: {
      "Wattage": "300W",
      "Luminous Flux": "27,000 Lumens",
      "Battery": "LiFePO4 36,000mAh",
      "Solar Panel": "Mono 35W Integrated",
      "Installation Height": "5–8 meters",
      "Mounting Pole": "Fits 60mm diameter pole",
      "Lighting Modes": "Constant dusk-to-dawn + Radar sensor boost",
      "Warranty": "2 Years"
    },
    frequentlyBoughtWith: ["zlt-fl-200"]
  },

  // 8. Solar Water Heater 200 Litres Pressurized
  {
    id: "zlt-swh-200",
    name: "200L Pressurized Evacuated Tube Solar Water Heater System",
    subtitle: "Complete Compact System with Copper Heat Pipes & 1.5kW Electric Backup Element",
    category: "solar-specialty",
    subCategory: "Solar Water Heaters",
    brand: "Sunpower",
    wattage: 1500,
    price: 88000,
    comparePrice: 105000,
    inStock: true,
    stockQty: 6,
    isTopSeller: false,
    isNewArrival: true,
    isDeal: false,
    rating: 4.9,
    reviewsCount: 16,
    image: "assets/images/showroom.jpg",
    variants: ["150 Litres", "200 Litres", "300 Litres"],
    features: ["Pressurized System", "Copper Heat Pipes", "Food-Grade SS316 Inner Tank", "Electrical Element Backup"],
    description: "Slashes water heating bills by up to 90%. High-efficiency borosilicate vacuum tubes with copper heat pipes work even during cold cloudy Nairobi mornings. Delivers boiling water up to 85°C directly to kitchen and showers.",
    specs: {
      "Capacity": "200 Litres (Ideal for 4-6 people)",
      "Tank Material": "SUS304-2B Food Grade Stainless Steel",
      "Insulation": "55mm High-Density Polyurethane Foam",
      "Max Working Pressure": "6 Bar (Supports booster pumps)",
      "Backup Element": "1.5kW Italian Thermostat Element",
      "Warranty": "5 Years System Guarantee"
    },
    frequentlyBoughtWith: ["zlt-mcb-cu"]
  },

  // 9. MCB Consumer Unit 12-Way Populated
  {
    id: "zlt-mcb-cu",
    name: "12-Way Metal Clad Consumer Unit with Main Isolator & RCD",
    subtitle: "Fire-Resistant Distribution Board Compliant with Kenya National Electrical Code",
    category: "electrical-infrastructure",
    subCategory: "MCBs & Consumer Units",
    brand: "Schneider Electric",
    wattage: 0,
    price: 9500,
    comparePrice: 11000,
    inStock: true,
    stockQty: 22,
    isTopSeller: false,
    isNewArrival: false,
    isDeal: false,
    rating: 4.8,
    reviewsCount: 20,
    image: "assets/images/showroom.jpg",
    variants: ["8-Way", "12-Way", "18-Way"],
    features: ["Heavy Metal Enclosure", "Built-In 63A RCD", "IP40 Rating", "Complete Busbars"],
    description: "High-grade electroplated steel consumer unit with drop-down visor. Engineered for domestic and light commercial electrical distribution. Features terminal earth and neutral bars with DIN rail mounting.",
    specs: {
      "Brand": "Schneider Electric / Chint",
      "Ways": "12 Module DIN Rail Capacity",
      "Main Incomer": "100A Double Pole Isolator",
      "RCD Protection": "63A 30mA Type A RCD",
      "Material": "Powder Coated Sheet Steel",
      "Compliance": "BS EN 61439-3 / KEBS Certified",
      "Warranty": "2 Years"
    },
    frequentlyBoughtWith: ["zlt-sw-isolator", "zlt-acc-cable"]
  },

  // 10. Automatic Changeover Switch 63A
  {
    id: "zlt-sw-isolator",
    name: "63A 2-Pole Automatic Transfer Switch (ATS) for Solar & KPLC",
    subtitle: "Instant Under-10ms Auto-Switching Between Solar Inverter and Utility Grid",
    category: "electrical-infrastructure",
    subCategory: "Changeover & Isolators",
    brand: "Chint",
    wattage: 0,
    price: 4500,
    comparePrice: 5500,
    inStock: true,
    stockQty: 18,
    isTopSeller: true,
    isNewArrival: false,
    isDeal: false,
    rating: 4.9,
    reviewsCount: 31,
    image: "assets/images/showroom.jpg",
    variants: ["40A", "63A", "100A"],
    features: ["Automatic Transfer", "Manual Override Lever", "LED Status Indicators", "DIN Rail Mount"],
    description: "Automatically switches household or office loads from solar/inverter to KPLC grid or generator when battery runs low, then automatically returns to solar power once recharged.",
    specs: {
      "Rated Current": "63A 230V AC",
      "Switching Time": "<10 milliseconds (No computer restart)",
      "Poles": "2 Pole (Live & Neutral)",
      "Operating Mode": "Auto / Manual selectable",
      "Mounting": "Standard 35mm DIN Rail",
      "Warranty": "1 Year"
    },
    frequentlyBoughtWith: ["zlt-inv-5kw", "zlt-mcb-cu"]
  },

  // 11. Architectural Recessed Downlighters (Pack of 6)
  {
    id: "zlt-dl-pack",
    name: "12W Anti-Glare Deep Recessed Architectural COB Downlighters (Pack of 6)",
    subtitle: "High CRI 95 Warm White Spotlights with Honeycomb Louver for Modern Ceilings",
    category: "indoor-decorative",
    subCategory: "Downlighters",
    brand: "Optonica",
    wattage: 72,
    price: 7200,
    comparePrice: 9000,
    inStock: true,
    stockQty: 25,
    isTopSeller: false,
    isNewArrival: true,
    isDeal: true,
    rating: 4.7,
    reviewsCount: 15,
    image: "assets/images/showroom.jpg",
    variants: ["Warm White 3000K", "Neutral 4000K"],
    features: ["Deep Recessed Anti-Glare", "CRI > 95", "Die-Cast Aluminum Heat Sink"],
    description: "Designed for high-end residential interiors. Deep-set optics ensure zero glare while highlighting architectural features, artwork, and textured walls.",
    specs: {
      "Wattage": "12W each (72W total pack)",
      "Cutout Diameter": "75mm",
      "Beam Angle": "38° Focused Beam",
      "Driver": "Flicker-Free Constant Current Isolated Driver",
      "Lifespan": "50,000 Hours",
      "Warranty": "2 Years"
    },
    frequentlyBoughtWith: ["zlt-chan-gold"]
  },

  // 12. Solar Submersible Borehole Pump 750W
  {
    id: "zlt-pump-750",
    name: "750W (1HP) DC Brushless Solar Submersible Deep Borehole Water Pump",
    subtitle: "Stainless Steel Impeller with MPPT Controller for Farms & Upcountry Homes",
    category: "solar-specialty",
    subCategory: "Solar Water Pumps",
    brand: "SunMaster",
    wattage: 750,
    price: 48000,
    comparePrice: 56000,
    inStock: true,
    stockQty: 5,
    isTopSeller: false,
    isNewArrival: false,
    isDeal: false,
    rating: 4.8,
    reviewsCount: 18,
    image: "assets/images/showroom.jpg",
    variants: ["500W (40m Head)", "750W (80m Head)", "1100W (120m Head)"],
    features: ["Brushless DC Motor", "Smart MPPT Driver", "Dry Run Protection", "Stainless Steel 304"],
    description: "Runs directly from solar panels without needing expensive inverters. Features intelligent water level sensors for both borehole and storage tank to prevent dry running.",
    specs: {
      "Motor Power": "750W DC Brushless",
      "Max Head": "80 Meters",
      "Max Flow Rate": "3,200 Litres / Hour",
      "Outlet Size": "1.25 Inch",
      "Recommended Panels": "3× 400W Solar Panels",
      "Warranty": "2 Years"
    },
    frequentlyBoughtWith: ["zlt-sp-550w"]
  }
];

// Accessories & cross-sells
export const ACCESSORIES = [
  {
    id: "zlt-acc-cable",
    name: "4mm² Double-Insulated UV-Resistant Solar DC Cable (10m Roll)",
    price: 1850,
    image: "assets/images/showroom.jpg"
  },
  {
    id: "zlt-sw-timer",
    name: "Digital Astronomical Din-Rail Timer Switch",
    price: 2200,
    image: "assets/images/showroom.jpg"
  },
  {
    id: "zlt-sw-dimmer",
    name: "Smart Rotary LED Wall Dimmer Switch (Plate Included)",
    price: 1650,
    image: "assets/images/showroom.jpg"
  }
];
