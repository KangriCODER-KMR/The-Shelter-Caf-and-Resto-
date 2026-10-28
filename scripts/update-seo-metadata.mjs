import fs from 'fs';

const dishesForSchema = [
  // Combos
  { name: 'Chicken Lover Combo', price: 750, category: 'Combos', desc: 'Half Butter Chicken, 3 Rumali Rotis, 1 Chicken Nuggets, 1 Peri-Peri Fries & Cold Drink' },
  { name: 'Classic Combo', price: 519, category: 'Combos', desc: 'Small Pizza, Chicken Roll, French Fries, Cold Drink and Dessert' },
  { name: 'Chinese Combo', price: 599, category: 'Combos', desc: 'Fried Rice, Half Chilli Chicken, 1 Kathi Roll and Cold Drink' },
  { name: 'Desi Delight Combo', price: 590, category: 'Combos', desc: 'Half Tandoori Chicken, Half Biryani, Fries, Cold Drink and Dessert' },
  { name: 'Pizza Lovers Combo', price: 350, category: 'Combos', desc: 'Small Pizza, French Fries and Cold Drink' },

  // Kanties & Wazwan
  { name: 'Rista Kanti', price: 260, category: 'Kanties', desc: 'Pounded Kashmiri mutton meatballs stir-fried with onions, tomatoes and mountain spices' },
  { name: 'Kabab Kanti', price: 260, category: 'Kanties', desc: 'Charcoal seekh kebabs sliced and sautéed with rich Kashmiri gravy' },
  { name: 'Spicy Rista + Kabab Kanti', price: 400, category: 'Kanties', desc: 'Signature duo of Rista and Seekh Kababs tossed in fiery sauce' },
  { name: 'Wazwan Biryani', price: 350, category: 'Biryani', desc: 'Royal Kashmiri mutton cooked with saffron kehwa essence and long grain basmati rice' },
  { name: 'Shelter Special Biryani', price: 199, category: 'Biryani', desc: 'House special aromatic basmati layered with marinated chicken and boiled egg' },

  // Pizzas
  { name: 'Chef Special Pizza', price: 260, category: 'Pizzas', desc: 'Hand-tossed crust with barbecue chicken, paprika, onions, bell peppers and mozzarella' },
  { name: 'Chicken Blast Pizza', price: 220, category: 'Pizzas', desc: 'Spicy seasoned chicken chunks with jalapenos, red chillies and molten cheese' },
  { name: 'Butter Chicken Pizza', price: 230, category: 'Pizzas', desc: 'Makhani gravy base topped with shredded tandoori chicken and cheese' },
  { name: 'Pepper BBQ Pizza', price: 220, category: 'Pizzas', desc: 'Hickory barbecue chicken strips with cracked black pepper and onions' },
  { name: 'Farm House Pizza', price: 200, category: 'Pizzas', desc: 'Fresh capsicum, red onion, button mushrooms, sweet corn and cheese' },
  { name: 'Cheese Burst Pizza', price: 230, category: 'Pizzas', desc: 'Molten liquid cheese stuffed crust topped with double mozzarella' },
  { name: 'Margherita Pizza', price: 150, category: 'Pizzas', desc: 'Classic Italian marinara sauce and pure molten mozzarella' },

  // Rolls & Burgers
  { name: 'Peri-Peri Chicken Roll', price: 160, category: 'Rolls', desc: 'Zesty peri-peri chicken cubes rolled in flaky paratha with mint relish' },
  { name: 'Cheese & Chicken Roll', price: 180, category: 'Rolls', desc: 'Melted cheddar and mozzarella over spiced chicken in a crisp wrap' },
  { name: 'Chicken Roll', price: 149, category: 'Rolls', desc: 'Tender chicken pieces with onions and house sauce in a warm wrap' },
  { name: 'Classic Cheese Burger', price: 130, category: 'Burgers', desc: 'Brioche bun with juicy patty, melted cheese, tomato slice and shelter spread' },
  { name: 'BBQ Burger', price: 130, category: 'Burgers', desc: 'Smoked barbecue sauce patty with caramelized onions and crisp greens' },
  { name: 'Peri-Peri Burger', price: 140, category: 'Burgers', desc: 'Crispy fried chicken breast fillet in hot peri-peri glaze' },

  // Momos & Fries
  { name: 'Afghani Momos', price: 149, category: 'Momos', desc: 'Dumplings tossed in rich cashew cream, butter and char-grilled herbs' },
  { name: 'Tandoori Momos', price: 149, category: 'Momos', desc: 'Charcoal roasted dumplings in spicy tikka marinade' },
  { name: 'Fried Momos', price: 129, category: 'Momos', desc: 'Golden crispy chicken dumplings served with garlic chilli chutney' },
  { name: 'Masala Fries', price: 99, category: 'Fries', desc: 'Crispy potato fingers tossed in tangy house spice blend' },
  { name: 'Honey-Chilli Potato', price: 149, category: 'Fries', desc: 'Wok glazed crisp potatoes with natural honey, sesame and dry red chilli' },

  // Curries & Tandoori
  { name: 'Butter Chicken Boneless', price: 400, category: 'Curries', desc: 'Boneless tandoori chicken chunks in rich buttery tomato makhani sauce' },
  { name: 'Chicken Curry', price: 350, category: 'Curries', desc: 'North Indian home-style spiced onion tomato chicken gravy' },
  { name: 'Tandoori Chicken', price: 350, category: 'Tandoori', desc: 'Clay oven charcoal roasted whole chicken in Kashmiri red chilli yoghurt marinade' },
  { name: 'Chicken Tikka', price: 250, category: 'Tandoori', desc: 'Boneless char-grilled chicken bites with roasted spices' },

  // Shakes & Mojitos
  { name: 'Almond & Dates Shake', price: 200, category: 'Shakes', desc: 'Royal Kashmiri almond paste and soft dates blended in chilled mountain milk' },
  { name: 'Kitkat Shake', price: 120, category: 'Shakes', desc: 'Thick chocolate milkshake with crushed crispy Kitkat wafer bars' },
  { name: 'Oreo Shake', price: 130, category: 'Shakes', desc: 'Chocolate cookie thickshake with vanilla cream and chocolate sauce' },
  { name: 'Classic Mint Mojito', price: 70, category: 'Mojitos', desc: 'Crushed garden mint, fresh lime juice and chilled sparkling soda' },
  { name: 'Blue Lagoon', price: 120, category: 'Mojitos', desc: 'Citrus curacao cooler with lemon fizz and maraschino cherries' }
];

const schemaJson = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "CafeOrCoffeeShop"],
  "@id": "https://thesheltercafe.com/#restaurant",
  "name": "The Shelter Cafe & Resto",
  "alternateName": [
    "The Shelter",
    "The Shelter Resto",
    "The Shelter Cafe Kralgund",
    "The Shelter Cafe & Resto Kralgund Qaziabad"
  ],
  "image": [
    "https://thesheltercafe.com/assets/aistudio/image_962fbe1a.png",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
  ],
  "logo": "https://thesheltercafe.com/assets/aistudio/image_962fbe1a.png",
  "url": "https://thesheltercafe.com",
  "telephone": "+91 95961 23022",
  "email": "theshelterresto@gmail.com",
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Google Pay, PhonePe, Paytm, Credit Card, Debit Card",
  "servesCuisine": [
    "Kashmiri Wazwan",
    "Kashmiri Kanties",
    "Stone-Baked Pizza",
    "Charcoal Tandoori & Kebabs",
    "Burgers & Kathi Rolls",
    "Biryani & Rice",
    "Momos & Dumplings",
    "Thickshakes & Mojitos",
    "Barista Coffee & Masala Chai"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Main Road, Kralgund Qaziabad, Handwara",
    "addressLocality": "Kralgund",
    "addressRegion": "Jammu & Kashmir",
    "postalCode": "193302",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.3559051,
    "longitude": 74.3483628
  },
  "hasMap": "https://www.google.com/maps/place/The+Shelter+Cafe+%26+Resto/@34.3559051,74.3483628,17z/data=!3m1!4b1!4m6!3m5!1s0x38e105001f2f397f:0xaafb64196e28b5d0!8m2!3d34.3559051!4d74.3483628!16s%2Fg%2F11z51w0v8x",
  "sameAs": [
    "https://www.google.com/maps/place/The+Shelter+Cafe+%26+Resto/@34.3559051,74.3483628,17z/data=!3m1!4b1!4m6!3m5!1s0x38e105001f2f397f:0xaafb64196e28b5d0!8m2!3d34.3559051!4d74.3483628!16s%2Fg%2F11z51w0v8x",
    "https://www.facebook.com/TheShelterCafeResto",
    "https://www.instagram.com/thesheltercaferesto"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:30",
      "closes": "22:30"
    }
  ],
  "acceptsReservations": "True",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasMenu": {
    "@type": "Menu",
    "name": "The Shelter Cafe & Resto Official Menu",
    "url": "https://thesheltercafe.com/#menu",
    "hasMenuItem": dishesForSchema.map((item, index) => ({
      "@type": "MenuItem",
      "@id": `https://thesheltercafe.com/#item-${index + 1}`,
      "name": item.name,
      "description": item.desc,
      "menuAddOn": item.category,
      "offers": {
        "@type": "Offer",
        "price": item.price.toString(),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    }))
  }
};

const fullHtml = `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
    <meta name="theme-color" content="#072614" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="The Shelter" />
    <meta name="application-name" content="The Shelter Cafe & Resto" />
    <meta name="format-detection" content="telephone=yes" />

    <title>The Shelter Cafe &amp; Resto — Kralgund Qaziabad, Handwara | Best Cafe, Pizzas &amp; Wazwan</title>
    
    <!-- Primary Local SEO & Nearby Discovery Metadata -->
    <meta name="description" content="The Shelter Cafe &amp; Resto in Kralgund Qaziabad, Handwara on Kupwara Highway. Top-rated restaurant serving Stone-Baked Pizzas (Chef Special, Chicken Blast), authentic Kashmiri Kanties (Rista Kanti, Kabab Kanti), Wazwan Biryani, Burgers, Rolls, Momos, Shakes &amp; Combos. Call/WhatsApp 9596123022 for dine-in, takeaway &amp; fast delivery." />
    <meta name="keywords" content="The Shelter Cafe, The Shelter Resto Kralgund, restaurants near me Kralgund, best cafe Handwara, Qaziabad cafe, 9596123022, Kashmiri Wazwan Kralgund, Rista Kanti, Kabab Kanti, Wazwan Biryani, Chef Special Pizza, Chicken Blast Pizza, Butter Chicken Pizza, Farm House Pizza, Cheese Burst Pizza, Veggie Paradise, Margherita, Chicken Roll, Peri-Peri Chicken Roll, Loaded Egg Roll, Afghani Momos, Tandoori Momos, Malai Momos, Masala Fries, French Fries, Chicken Lover Combo, Desi Delight Combo, Classic Combo, Chinese Combo, Pizza Lovers Combo, Butter Chicken Boneless, Chicken Korma, Lemon Chicken, Tandoori Chicken, Chicken Tikka, Almond Dates Shake, Kitkat Shake, Oreo Shake, Classic Mint Mojito, Blue Lagoon, Watermelon Mojito, Creamy Pasta, Espresso, Kupwara highway restaurants, best pizza in Handwara, online food delivery Kralgund, cafes in Kupwara district" />
    <meta name="author" content="The Shelter Cafe &amp; Resto" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="https://thesheltercafe.com/" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

    <!-- Official Favicon & App Icons -->
    <link rel="icon" type="image/png" href="/assets/aistudio/image_962fbe1a.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/aistudio/image_962fbe1a.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/aistudio/image_962fbe1a.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/assets/aistudio/image_962fbe1a.png" />
    <meta name="msapplication-TileColor" content="#072614" />
    <meta name="msapplication-TileImage" content="/assets/aistudio/image_962fbe1a.png" />

    <!-- OpenGraph Social Share Metadata (Facebook, WhatsApp, Google Maps) -->
    <meta property="og:site_name" content="The Shelter Cafe &amp; Resto" />
    <meta property="og:type" content="restaurant" />
    <meta property="og:title" content="The Shelter Cafe &amp; Resto — Kralgund Qaziabad, Handwara" />
    <meta property="og:description" content="A sanctuary of taste, comfort &amp; authentic Kashmiri hospitality along the Kupwara Highway at Kralgund. Fresh Pizzas, Kanties, Biryani, Momos, Shakes &amp; Combos. Call/WhatsApp: 9596123022." />
    <meta property="og:url" content="https://thesheltercafe.com/" />
    <meta property="og:image" content="https://thesheltercafe.com/assets/aistudio/image_962fbe1a.png" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="600" />
    <meta property="og:image:alt" content="The Shelter Cafe &amp; Resto Official Seal" />
    <meta property="og:locale" content="en_IN" />

    <!-- Twitter / X Card Metadata -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="The Shelter Cafe &amp; Resto — Kralgund, Handwara" />
    <meta name="twitter:description" content="Top-rated dining haven in Kralgund Qaziabad on Kupwara Highway. Authentic Wazwan, Stone-Baked Pizzas, Shakes &amp; Combos." />
    <meta name="twitter:image" content="https://thesheltercafe.com/assets/aistudio/image_962fbe1a.png" />

    <!-- Geo & Local Business Positioning (Kralgund Qaziabad, Handwara) -->
    <meta name="geo.region" content="IN-JK" />
    <meta name="geo.placename" content="Kralgund, Qaziabad, Handwara, Kupwara District, Jammu &amp; Kashmir" />
    <meta name="geo.position" content="34.3559051;74.3483628" />
    <meta name="ICBM" content="34.3559051, 74.3483628" />

    <!-- Typography Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

    <!-- Comprehensive Rich Schema.org JSON-LD Structured Data with Full Menu Entities -->
    <script type="application/ld+json">
${JSON.stringify(schemaJson, null, 2)}
    </script>
  </head>
  <body class="bg-[#fdfbf6] text-emerald-950 font-sans selection:bg-emerald-900 selection:text-white antialiased overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

fs.writeFileSync('index.html', fullHtml, 'utf8');
console.log('Successfully updated index.html with complete SEO metadata and dishes schema');
