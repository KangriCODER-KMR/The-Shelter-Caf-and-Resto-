# The Shelter Restaurant & Café — Kralgund Qaziabad, Handwara

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Backend-Express-lightgrey.svg)](https://expressjs.com/)
[![Google Gen AI](https://img.shields.io/badge/AI-Google_Gemini_3.8_Flash-8e24aa.svg)](https://ai.google.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-green.svg)](https://web.dev/progressive-web-apps/)

> **A Sanctuary of Taste and Authentic Kashmiri Hospitality.**  
> Located along the scenic Kupwara Highway at Main Road, Kralgund Qaziabad, Handwara, Jammu & Kashmir 193302.

---

## 📌 Executive Summary

**The Shelter Restaurant & Café** is a premier dining destination, cafe, and culinary hub in North Kashmir. The application provides a seamless, mobile-first, and progressive web application (PWA) experience where guests can browse our complete Kashmiri Wazwan and contemporary cafe menu, place itemized WhatsApp delivery orders with automated locality fee calculation, reserve family dining cabins, review their past order history with 1-tap re-ordering, flip through an immersive 3D hardcover menu, and consult our real-time **AI Dining Concierge** powered by Google Gemini.

---

## 📍 Location & Official Contact Dossier

| Property | Details |
| :--- | :--- |
| **Establishment** | The Shelter Restaurant & Café (Cafe & Resto) |
| **Address** | Main Road, Kralgund Qaziabad, Handwara, Kupwara District, Jammu & Kashmir 193302 |
| **Landmark** | Kralgund Market & Bridge along the Kupwara Highway Corridor |
| **GPS Coordinates** | `**4.3559051° N, 74.348***8° E` *(Decimal: *4***59051, 74.3**3628)* |
| **Phone & Call Helpline** | **+91 95961 ***2** *(095961 *****)* |
| **WhatsApp Business** | **+91 95961 ***** |
| **Official Email** | `theshelterresto@gmail.com` |
| **Daily Operating Hours**| **09:30 AM – 10:30 PM** (Monday through Sunday) |
| **Lunch Service** | 12:00 PM – 04:00 PM |
| **Dinner Service** | 06:00 PM – 10:30 PM |
| **Facilities** | High-speed Wi-Fi, Dedicated Namaz/Prayer Area, Private Family Cabins, Highway Parking |

---

## 🚀 Key Feature Modules

### 1. 🛍️ Digital Dining Bag & Automated Delivery Tier Matrix
- **Persistent Local Cart:** Cart items, quantities, and customizations are persisted in `localStorage` under `theshelter_cart`, surviving page reloads and app switches.
- **Dynamic Delivery Charges Matrix:** When placing an order, customers choose their exact locality from our real-time service tier matrix:
  - **Kralgund Market & Central Belt:** ₹20 delivery fee *(FREE for orders above ₹399 | ~25 mins)*
  - **Supernaghama (Super Naghama Village):** ₹40 delivery fee *(FREE for orders above ₹699 | ~35 mins)*
  - **Outside Market / Qaziabad Belt (Wadipora, Ashpora, Rawalpora):** ₹60 delivery fee *(FREE for orders above ₹899 | ~40 mins)*
  - **Highway Corridor / Langate Area:** ₹90 delivery fee *(~50 mins)*
  - **In-Store Counter Pickup (Takeaway):** ₹0 (FREE | Ready in ~15 mins)

### 2. 💬 Direct WhatsApp Business Dispatch Engine
- Generates a beautifully structured, itemized receipt sent straight to the restaurant owner's WhatsApp (`+91 95961*****`).
- Automatically calculates and lists:
  - Unique Order Ticket ID (e.g., `#SH-7294`)
  - Order Fulfillment Type (Doorstep Delivery vs. Counter Takeaway)
  - Selected Delivery Locality & Delivery Fee
  - Customer Full Name, Mobile Contact, and Street Delivery Address
  - Detailed list of dishes with quantity and prices
  - Subtotal, Delivery Fee, and Final Payable Amount
  - Special Cooking / Kitchen Instructions
  - **Owner Pre-Confirmation Note:**
    > *"Please confirm same from your side and pre-inform if any changes are in the order."*

### 3. 🤖 AI Dining Concierge (Gemini 3.8 Flash + Offline Grounded Fallback)
- **Hybrid Real-Time Architecture:**
  - Connects to an Express server endpoint (`POST /api/concierge`) leveraging `@google/genai` with `gemini-3.8-flash`.
  - Injected with a comprehensive knowledge base of the restaurant's authentic menu, exact prices, GPS coordinates, delivery matrix, and Kashmiri hospitality persona.
  - Backed by an instant client-side deterministic fallback engine (`src/utils/aiConciergeKnowledge.ts`) ensuring flawless, instantaneous replies even in low-connectivity or offline scenarios.
- **Interactive Action Buttons:** AI answers include context-aware action triggers (e.g., "View Menu", "Reserve Table", "Google Maps", "Call Resto") that immediately launch the requested flow and auto-dismiss the assistant.
- **Scroll & Viewport Protections:** Built with mobile `dvh` dynamic height, `touch-pan-y`, `overscroll-contain`, and automatic body-scroll locking so typing and scrolling inside the concierge never bleeds into the background webpage.

### 4. 📜 Order History & 1-Tap Re-Order System
- **Client-Side Persistence:** Every placed order is automatically stored in `localStorage` (`theshelter_order_history`).
- **Data Privacy & Retention:** Orders remain stored on the customer's phone across browser sessions without requiring an external account login.
- **1-Tap Re-Order:** Guests can review previous receipts, re-populate their cart with all dishes from an earlier feast in one tap, and view live delivery stage tracking.

### 5. 🪑 Table & Private Cabin Reservation Engine
- **Multi-Step Booking Flow:**
  - Step 1: Select guest party size, reservation date, dining slot, and seating area (Family Cabins, Couple Booth, Garden Lawn, Banquet).
  - Step 2: Guest details (Name, Contact, Dietary Notes, Occasion).
  - Step 3: Instant WhatsApp reservation dispatch with QR code confirmation ticket.

### 6. 📖 Interactive 3D Hardcover Menu Book
- Immersive virtual leather-bound physical menu book with realistic page flipping transitions.
- Interactive Table of Contents, chapter navigation across all 10 culinary courses, and integrated "Add to Order" buttons on every page.

### 7. ⏱️ Live Order Delivery Tracker Console
- Animated order tracking dashboard simulating the 4 stages of culinary fulfillment:
  1. **Order Received & Confirmed**
  2. **Chef Preparing in Kitchen (Charcoal & Tandoor)**
  3. **Packaging & Temperature Control**
  4. **Rider Dispatched for Delivery**
- Includes direct call and WhatsApp re-check buttons to the delivery helpline.

### 8. 📱 Mobile-First Liquid Glass Dock & Unified Jewel Navigation
- **iOS 27 Liquid Glass Aesthetic:** Translucent frosted acrylic backdrops, specular light reflections, border luminosity, and subtle ambient motion.
- **5-Jewel Bottom Floating Dock:**
  - 🔵 **Menu** (Sky Blue Jewel): Smooth scroll to categorized live menu explorer.
  - 🟡 **Reserve** (Warm Gold Jewel): Direct table and private cabin booking.
  - 🟣 **Ask AI** (Luminous Violet Jewel with Live Breathing Beacon): Instant AI Dining Concierge.
  - 🟢 **WhatsApp** (Emerald Jewel): Direct live WhatsApp chat with restaurant management.
  - 🔷 **Call** (Teal Jewel): One-tap phone dialer to `+91 95961 ****`.
- **Top Navigation Bar:** Houses the official round restaurant seal, quick brand navigation, live bag counter badge with item count, and a comprehensive three-bar Menu drawer.
- **All-Items Scrollable Menu Drawer:** Houses Order History, AI Concierge, Quick Actions, all section links, delivery rate table, PWA install prompts, and emergency phone contacts inside one smooth scroll container.

---

## 🍽️ Culinary Menu Architecture

| Course / Category | Highlights & Specialties | Starting Price |
| :--- | :--- | :--- |
| **Kashmiri Wazwan** | Wazwan Biryani, Mutton Rogan Josh, Goshtaba, Tabak Maaz, Rista Kanti, Kabab Kanti, Special Duo Platter | ₹199 |
| **Handcrafted Pizzas** | Chef Special Pizza, Butter Chicken Pizza, Chicken Blast, Farm House, Margherita, Cheese Burst | ₹150 (Small) |
| **Value Feast Combos**| Chicken Lover Combo (₹750), Desi Delight (₹590), Chinese Combo (₹599), Classic Combo (₹519), Pizza Lovers (₹350) | ₹350 |
| **Wraps, Rolls & Burgers** | Peri-Peri Chicken Roll, Cheese & Chicken Roll, Loaded Egg Roll, BBQ Burger, Veg Burger | ₹80 |
| **Momos & Appetizers** | Afghani Momos, Tandoori Momos, Fried Momos, Steam Momos, Peri-Peri Fries, Masala Fries | ₹99 |
| **Curries & Gravies** | Butter Chicken Boneless, Chicken Korma, Lemon Chicken, Muttar Paneer, Kadai Paneer | ₹300 |
| **Shakes & Mocktails** | Almond & Dates Royal Shake, Kitkat Shake, Oreo Shake, Classic Mint Mojito, Blue Lagoon | ₹70 |

---

## 🛠️ Technical Architecture

```
├── server.ts                       # Express backend server with Vite dev middleware & @google/genai proxy
├── package.json                    # Project metadata, dependencies, scripts
├── tsconfig.json                   # Strict TypeScript compiler configuration
├── vite.config.ts                  # Vite build tool and plugin configuration
├── index.html                      # Entry HTML with Local Business SEO, OpenGraph & PWA metadata
└── src/
    ├── main.tsx                    # React DOM entry point
    ├── App.tsx                     # Master state controller (Cart, Modals, Drawers, Navigation)
    ├── index.css                   # Global Tailwind CSS imports & liquid glass utility classes
    ├── types.ts                    # TypeScript data definitions (MenuItem, CartItem, OrderData, etc.)
    ├── components/
    │   ├── Navbar.tsx              # Sticky liquid-glass top navigation bar
    │   ├── MobileBottomBar.tsx     # Mobile floating dock with 5 jewel action buttons
    │   ├── MobileNavDrawer.tsx     # Full slide-over drawer with 100% scrollable items
    │   ├── AiAssistantModal.tsx    # Intelligent Gemini AI Concierge with local fallback
    │   ├── OrderDrawer.tsx         # Slide-over Bag with dynamic delivery charge calculator
    │   ├── OrderHistoryModal.tsx   # LocalStorage past order receipts & 1-tap re-order modal
    │   ├── MenuModal.tsx           # Full-screen complete menu modal with live search & dietary filter
    │   ├── ExploreMenuSection.tsx  # Direct on-page menu explorer with category carousel
    │   ├── ThreeDMenu.tsx          # Realistic 3D hardcover flip book menu
    │   ├── ReservationModal.tsx    # Table & private cabin booking modal with WhatsApp integration
    │   ├── LiveOrderTrackerModal.ts# Real-time animated delivery stage tracking console
    │   ├── Hero.tsx                # Cinematic visual hero section with video loop
    │   ├── Story.tsx               # Narrative heritage of The Shelter in Kralgund
    │   ├── CuisineSection.tsx      # Course overview grid
    │   ├── Signatures.tsx          # Crown signature dishes showcase
    │   ├── TheRoom.tsx             # Dining ambience and cabin gallery
    │   ├── Reviews.tsx             # Customer reviews & ratings
    │   ├── Footer.tsx              # Comprehensive footer with operating hours & location
    │   └── PWAInstallButton.tsx    # PWA install prompt button
    ├── data/
    │   └── restaurantData.ts       # Full restaurant metadata, menu dishes, delivery rates, contact info
    ├── hooks/
    │   ├── useBodyScrollLock.ts    # Reusable ref-counted body scroll lock hook
    │   ├── useOnlineStatus.ts      # Live network status detection
    │   └── usePWAInstall.ts        # PWA beforeinstallprompt handler
    └── utils/
        ├── aiConciergeKnowledge.ts # Grounded Kashmiri concierge deterministic response engine
        ├── orderStorage.ts         # LocalStorage persistence manager for order receipts
        └── whatsapp.ts             # WhatsApp URL builders for orders and table bookings
```

---

## ⚙️ Environment Configuration

Define optional environment variables in your environment or `.env`:

```env
# Port for the Express server (defaults to 3000)
PORT=3000

# Optional: Google Gemini API Key for server-side concierge responses
# If omitted or unconfigured, the system automatically runs the local grounded knowledge engine seamlessly
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
Starts the combined Express server and Vite development middleware on port 3000:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Verify Code Quality & Type Integrity
```bash
npm run lint
```

### 4. Build for Production
Creates the optimized production bundle in the `dist/` directory:
```bash
npm run build
```

### 5. Start Production Server
```bash
npm start
```

---

## 🛡️ Reliability & Offline Support
- **Zero-Flicker Background Scroll Locking:** All modal views (`AiAssistantModal`, `MobileNavDrawer`, `OrderDrawer`, `MenuModal`, `OrderHistoryModal`, `ReservationModal`) utilize a reference-counted `useBodyScrollLock` hook that stops background body scrolling on iOS and Android devices.
- **Containment:** Every modal contains `overscroll-contain` and `touch-pan-y` to keep gestures bounded.
- **PWA Ready:** Registered with offline indicators and web app manifest tags.

---

## 📄 License & Attribution
- **Brand & Copyright:** © All rights reserved. **The Shelter Restaurant & Café**, Kralgund Qaziabad, Handwara, Jammu & Kashmir 193302.
- **Hotline:** +91 95961 ******.
