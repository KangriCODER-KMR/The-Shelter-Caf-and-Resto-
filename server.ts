import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESTAURANT_KNOWLEDGE_SYSTEM_PROMPT = `
You are the official AI Dining Concierge for "The Shelter Cafe & Resto", located in Kralgund Qaziabad, Handwara, along the Kupwara Highway, Jammu & Kashmir.

IDENTITY & HOSPITALITY:
- Persona: Warm, polite, courteous Kashmiri hospitality ("Khushamdeed", respectful, welcoming, clear).
- You are answering queries on behalf of The Shelter Cafe & Resto. Always answer based on real restaurant information provided below.
- Keep responses concise, organized, polite, and helpful. Use clean bullet points when listing items.

CORE RESTAURANT DETAILS:
- Name: The Shelter Cafe & Resto
- Location: Main Road, Kralgund Qaziabad, Handwara, Kupwara District, Jammu & Kashmir 193302
- Exact GPS Coordinates: Latitude: 34.3559051° N, Longitude: 74.3483628° E (34.3559, 74.3484)
- Google Maps link: https://www.google.com/maps/place/The+Shelter+Cafe+%26+Resto/@34.3559051,74.3483628,17z
- Contact Phone / WhatsApp: +91 95961 23022 (Call & WhatsApp orders)
- Email: theshelterresto@gmail.com
- Timings: Open everyday (Monday to Sunday) from 09:30 AM to 10:30 PM.
  - Lunch Service: 12:00 PM – 04:00 PM
  - Dinner Service: 06:00 PM – 10:30 PM

SERVICABLE DELIVERY AREAS & RATES:
- 1. Kralgund Market & Nearby (Main Chowk, Bridge & Hospital Belt): ₹20 delivery fee (FREE for orders above ₹399). Est: ~25 mins.
- 2. Supernaghama (Super Naghama Village & link road): ₹40 delivery fee (FREE for orders above ₹699). Est: ~35 mins.
- 3. Outside Market / Qaziabad Belt (Wadipora, Ashpora, Rawalpora): ₹60 delivery fee (FREE for orders above ₹899). Est: ~40 mins.
- 4. Handwara & Langate Highway Corridor: ₹90 delivery fee. Est: ~50 mins.
- 5. Takeaway / Self-Pickup (at Cafe Counter): ₹0 (Free). Ready in ~15 mins.

ORDERING VIA WHATSAPP:
- Guests can add items to their bag on this website and tap "Order via WhatsApp" to instantly send their itemized order to the owner (+91 95961 23022).
- The order format includes a closing note: "Please confirm same from your side and pre-inform if any changes are in the order."

TABLE RESERVATION:
- Guests can reserve tables, family private cabins, birthday setups, and business lunches using the "Reserve" button on the website or by calling/messaging +91 95961 23022.

POPULAR MENU HIGHLIGHTS & PRICES (in INR ₹):
- Signature Combos:
  - Chicken Lover Combo (₹750): Half Butter Chicken, 3 Rumali Rotis, Chicken Nuggets, Peri-Peri Fries & Cold Drink.
  - Desi Delight Combo (₹590): Charcoal Tandoori Half, Half Biryani, Crispy Fries, Cold Drink, Dessert.
  - Chinese Combo (₹599): Wok Fried Rice, Chilli Chicken Half, Roll & Cold Drink.
  - Classic Combo (₹519): Small Pizza, Chicken Roll, Fries, Cold Drink, Dessert.
  - Pizza Lovers Combo (₹350): Small Pizza, Fries, Cold Drink.
- Authentic Wazwan & Kanties:
  - Wazwan Biryani (Half ₹350 / Full ₹650)
  - Chicken Kanti (Half ₹350 / Full ₹650)
  - Rista Kanti (Half ₹260 / Full ₹520)
  - Kabab Kanti (Half ₹260 / Full ₹520)
  - Spicy Rista + Kabab Kanti (₹400)
- Pizzas (Veg & Non-Veg):
  - Chef Special Pizza (S: ₹260, M: ₹400, L: ₹700)
  - Butter Chicken Pizza (S: ₹230, M: ₹380, L: ₹600)
  - Chicken Blast Pizza (S: ₹220, M: ₹370, L: ₹650)
  - Margherita Pizza (S: ₹150, M: ₹280, L: ₹450)
  - Farm House Pizza (S: ₹200, M: ₹330, L: ₹580)
  - Cheese Burst Pizza (S: ₹230, M: ₹400, L: ₹550)
- Rolls & Wraps:
  - Peri-Peri Chicken Roll (₹160), Cheese & Chicken Roll (₹180), Chicken Roll (₹149), Veg Roll (₹110), Loaded Egg Roll (₹120), Egg Roll (₹80).
- Burgers:
  - Cheese Burger Classic (₹130), BBQ Burger (₹130), Peri-Peri Chicken Burger (₹140), Aloo Tikki Burger (₹100), Veg Burger (₹110).
- Momos:
  - Steam Momos (₹119), Fried Momos (₹129), Afghani Momos (₹149), Malai Momos (₹180), Tandoori Momos (₹149).
- Fries:
  - Masala Fries (₹99), French Fries (₹99), Peri-Peri Fries (₹119), Honey-Chilli Potato (₹149).
- Main Course Curries:
  - Butter Chicken Boneless (Half ₹400 / Full ₹700), Butter Chicken With Bone (Half ₹350 / Full ₹650), Chicken Curry (Half ₹350 / Full ₹650), Lemon Chicken (Half ₹300 / Full ₹600), Chicken Korma (Half ₹350 / Full ₹650), Methi Malai Chicken (Half ₹350 / Full ₹600), Muttar Paneer (₹400), Kadai Paneer (₹410).
- Shakes & Mojitos:
  - Almond & Dates Shake (₹200), Oreo Shake (₹130), Kitkat Shake (₹120), Strawberry Shake (₹110), Classic Mint Mojito (₹70), Virgin Mojito (₹90), Watermelon Mojito (₹100), Blue Lagoon (₹120).
- Breads:
  - Rumali Roti (₹30), Butter Rumali Roti (₹45).

FACILITIES:
- Free high-speed WiFi, dedicated prayer/namaz area, separate family cabins, highway parking, live grill, air-conditioned seating.

INSTRUCTIONS:
1. Always be polite and courteous.
2. Provide exact numbers, coordinates, and prices when asked.
3. If asked about ordering, explain the WhatsApp dispatch process and prompt them to use the Bag or contact +91 95961 23022.
4. If asked about directions, mention Kralgund Qaziabad on Kupwara Highway and the GPS coordinates: 34.3559051° N, 74.3483628° E.
`;

function generateLocalKnowledgeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('coordinate') || query.includes('gps') || query.includes('lat') || query.includes('map') || query.includes('where is') || query.includes('location') || query.includes('address')) {
    return `Khushamdeed! The Shelter Cafe & Resto is located at **Main Road, Kralgund Qaziabad, Handwara, Kupwara District, Jammu & Kashmir 193302** (along the Kupwara Highway).\n\n📍 **GPS Coordinates:** \`34.3559051° N, 74.3483628° E\` (Decimal: 34.3559051, 74.3483628)\n\nWe are right near the Kralgund Market & Bridge. You can easily find us on Google Maps or call **+91 95961 23022** for quick guidance!`;
  }

  if (query.includes('number') || query.includes('phone') || query.includes('call') || query.includes('contact') || query.includes('whatsapp') || query.includes('mobile')) {
    return `You can reach The Shelter Cafe & Resto directly at:\n\n📞 **Phone & WhatsApp:** **+91 95961 23022** (095961 23022)\n✉️ **Email:** theshelterresto@gmail.com\n\nOur team is available daily from **09:30 AM to 10:30 PM** for instant takeaways, home deliveries, and table reservations!`;
  }

  if (query.includes('delivery') || query.includes('kralgund') || query.includes('supernaghama') || query.includes('charge') || query.includes('fee') || query.includes('serviceable')) {
    return `We deliver fresh & piping hot across the Qaziabad and Handwara belt! Here are our serviced areas & delivery charges:\n\n• **Kralgund Market & Nearby:** ₹20 (Free on orders above ₹399, ~25 mins)\n• **Supernaghama (Super Naghama):** ₹40 (Free on orders above ₹699, ~35 mins)\n• **Outside Market / Qaziabad Belt (Wadipora, Ashpora):** ₹60 (Free on orders above ₹899, ~40 mins)\n• **Handwara & Langate Highway Corridor:** ₹90 (~50 mins)\n• **Self-Pickup / Takeaway:** ₹0 (Ready in ~15 mins at our counter)\n\nYou can select your delivery area directly in your Bag before sending your order to WhatsApp!`;
  }

  if (query.includes('reserve') || query.includes('table') || query.includes('cabin') || query.includes('booking') || query.includes('seat')) {
    return `Booking a table or private cabin at The Shelter is effortless:\n\n1. Tap the **"Reserve"** button on this page to choose your date, time slot, guest count, and seating preference (e.g., Family Cabin, Romantic Booth, Garden/Terrace).\n2. Or message us on **WhatsApp / Call at +91 95961 23022**.\n\nWe provide dedicated family cabins and prayer spaces for maximum privacy and comfort.`;
  }

  if (query.includes('order') || query.includes('how to order') || query.includes('buy') || query.includes('bag') || query.includes('cart')) {
    return `Here is how you can place your order from our live menu:\n\n1. Browse our menu and tap **"+"** to add your favorite dishes to your **Bag**.\n2. Open the Bag at the top, select your **Delivery Area** (Kralgund, Supernaghama, Outside Market, or Takeaway), and enter your delivery address.\n3. Tap **"Order via WhatsApp"** — your itemized bill with delivery fee will open in WhatsApp and dispatch directly to the owner (+91 95961 23022).\n4. We include a note asking the owner to confirm and pre-inform if any changes are needed!`;
  }

  if (query.includes('timing') || query.includes('hour') || query.includes('open') || query.includes('close') || query.includes('lunch') || query.includes('dinner')) {
    return `The Shelter Cafe & Resto is open **7 days a week**:\n\n🕒 **Daily Hours:** 09:30 AM – 10:30 PM\n🍱 **Lunch Service:** 12:00 PM – 04:00 PM\n🌙 **Dinner Service:** 06:00 PM – 10:30 PM\n\nTakeaway and delivery dispatches run continuously throughout the day!`;
  }

  if (query.includes('combo') || query.includes('special')) {
    return `Our signature value combos are customer favorites:\n\n• **Chicken Lover Combo (₹750):** Half Butter Chicken, 3 Rumali Rotis, Chicken Nuggets, Peri-Peri Fries & Chilled Beverage.\n• **Desi Delight Combo (₹590):** Charcoal Tandoori Half, Half Biryani, Crispy Fries, Cold Drink & Dessert.\n• **Chinese Combo (₹599):** Wok Fried Rice, Chilli Chicken Half, Kathi Roll & Cold Drink.\n• **Classic Combo (₹519):** Small Pizza, Chicken Roll, Fries, Drink & Dessert.\n• **Pizza Lovers Combo (₹350):** Small Stone-Baked Pizza, Fries & Cold Drink.`;
  }

  if (query.includes('wazwan') || query.includes('kanti') || query.includes('biryani') || query.includes('rista') || query.includes('kabab')) {
    return `Our authentic Kashmiri specialties are prepared fresh with genuine valley spices:\n\n• **Wazwan Biryani:** Half ₹350 | Full ₹650 (Rich aromatic mutton dum biryani)\n• **Chicken Kanti:** Half ₹350 | Full ₹650 (Boneless chicken sautéed with onions & mountain tomatoes)\n• **Rista Kanti:** Half ₹260 | Full ₹520 (Tender pounded meatballs flash-fried with spices)\n• **Kabab Kanti:** Half ₹260 | Full ₹520 (Charcoal seekh kebabs in rich gravy)\n• **Spicy Rista + Kabab Kanti:** ₹400 (The ultimate duo platter)\n• **Shelter Special Biryani:** Half ₹199 | Full ₹399`;
  }

  if (query.includes('pizza') || query.includes('burger') || query.includes('roll') || query.includes('momo') || query.includes('shake')) {
    return `We offer hand-stretched stone-baked pizzas, wraps, rolls and cafe delights:\n\n• **Chef Special Pizza:** Small ₹260 | Medium ₹400 | Large ₹700\n• **Butter Chicken Pizza:** Small ₹230 | Medium ₹380 | Large ₹600\n• **Margherita Pizza:** Small ₹150 | Medium ₹280 | Large ₹450\n• **Peri-Peri Chicken Roll:** ₹160 | **Cheese & Chicken Roll:** ₹180 | **Veg Roll:** ₹110\n• **Afghani Momos:** ₹149 | **Tandoori Momos:** ₹149 | **Steam Momos:** ₹119\n• **Almond & Dates Shake:** ₹200 | **Kitkat / Oreo Shake:** ₹120 - ₹130\n• **Classic Mint Mojito:** ₹70 | **Virgin Mojito:** ₹90`;
  }

  return `Khushamdeed! I am delighted to welcome you to **The Shelter Cafe & Resto** in Kralgund Qaziabad.\n\nI can assist you with:\n• **Menu & Food Prices:** Stone-baked pizzas, Wazwan Biryani, Kanties, Combos, Rolls & Shakes\n• **Location & Coordinates:** Main Road Kralgund (GPS: \`34.3559051° N, 74.3483628° E\`)\n• **Delivery Charges:** Kralgund Market (₹20), Supernaghama (₹40), Outside Market (₹60)\n• **Contact & WhatsApp:** +91 95961 23022\n• **Table Reservations & Timings:** 09:30 AM to 10:30 PM\n\nPlease let me know what you would like to know, or tap any of the quick suggestions!`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API endpoint for AI Concierge
  app.post('/api/concierge', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      // Check if GEMINI_API_KEY is configured
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          // Build contents array with context
          const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

          if (Array.isArray(history)) {
            for (const h of history.slice(-6)) {
              if (h.role === 'user' || h.role === 'assistant' || h.role === 'model') {
                contents.push({
                  role: h.role === 'assistant' ? 'model' : (h.role as 'user' | 'model'),
                  parts: [{ text: String(h.text || h.content || '') }],
                });
              }
            }
          }

          contents.push({
            role: 'user',
            parts: [{ text: message }],
          });

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: contents,
            config: {
              systemInstruction: RESTAURANT_KNOWLEDGE_SYSTEM_PROMPT,
              temperature: 0.6,
            },
          });

          const replyText = response.text || generateLocalKnowledgeResponse(message);
          res.json({ reply: replyText, source: 'gemini' });
          return;
        } catch (geminiError) {
          console.warn('Gemini API call failed, falling back to local knowledge:', geminiError);
          const fallbackReply = generateLocalKnowledgeResponse(message);
          res.json({ reply: fallbackReply, source: 'local_knowledge' });
          return;
        }
      }

      // If no valid GEMINI_API_KEY, use reliable local knowledge engine
      const reply = generateLocalKnowledgeResponse(message);
      res.json({ reply, source: 'local_knowledge' });
    } catch (err: unknown) {
      console.error('Error handling /api/concierge:', err);
      const fallback = generateLocalKnowledgeResponse(req.body?.message || '');
      res.json({ reply: fallback, source: 'fallback' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', restaurant: 'The Shelter Cafe & Resto' });
  });

  // In production, serve built static assets from dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In development, mount Vite dev server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[The Shelter Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
