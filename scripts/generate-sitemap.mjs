/**
 * Dynamic Sitemap Generator for The Shelter Cafe & Resto
 * 
 * Generates an SEO-optimized sitemap.xml with Google Image Sitemap tags
 * for all core sections: Menu, Dining, Gallery, Story, Reservation, and Contact.
 * Can be run standalone or as part of the build pipeline (`node scripts/generate-sitemap.mjs`).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_SITE_URL || 'https://thesheltercafe.com';
const TODAY = new Date().toISOString().split('T')[0];

const routes = [
  {
    path: '/',
    changefreq: 'daily',
    priority: 1.0,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        title: 'The Shelter Cafe & Resto — Kralgund, Handwara',
        caption: 'Warm, cozy mountain cafe interior with artisan woodwork and ambient light along Kupwara Highway'
      }
    ]
  },
  {
    path: '/#menu',
    changefreq: 'daily',
    priority: 0.95,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        title: 'Authentic Kashmiri Wazwan & Charcoal Tujje',
        caption: 'Traditional Kashmiri Wazwan Rogan Josh, Rista, and Charcoal-grilled Mutton Tujje'
      },
      {
        loc: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        title: 'Stone-Baked Artisanal Pizzas',
        caption: 'Hand-tossed sourdough pizza with mozzarella and mountain herbs'
      },
      {
        loc: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        title: 'Artisanal Barista Brews & Saffron Kehwa',
        caption: 'Traditional Kashmiri Zafrani Kehwa brewed with pure saffron, green cardamom, and slivered almonds'
      }
    ]
  },
  {
    path: '/#dining',
    changefreq: 'weekly',
    priority: 0.85,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
        title: 'Private Dining & Family Lounge at The Shelter',
        caption: 'Intimate private dining spaces and family halls designed for celebrations, meetings, and relaxing meals'
      },
      {
        loc: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
        title: 'The Room — Acoustic Comfort & Warm Aesthetic',
        caption: 'Warm amber lighting, botanical accents, and bespoke walnut furniture'
      }
    ]
  },
  {
    path: '/#gallery',
    changefreq: 'weekly',
    priority: 0.85,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        title: 'Restaurant Gallery — Ambience and Culinary Craft',
        caption: 'A visual journey through dining spaces, handcrafted mocktails, and sizzler presentations'
      },
      {
        loc: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1200&q=80',
        title: 'Evening Twilight at The Shelter Cafe Kralgund',
        caption: 'Cozy evenings by the fireplace-inspired decor and warm terrace feel'
      }
    ]
  },
  {
    path: '/#reservation',
    changefreq: 'daily',
    priority: 0.80
  },
  {
    path: '/#story',
    changefreq: 'monthly',
    priority: 0.70
  },
  {
    path: '/#contact',
    changefreq: 'monthly',
    priority: 0.75,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        title: 'The Shelter Cafe Location Map in Kralgund Handwara',
        caption: 'Situated right along Kupwara Highway at Kralgund, Handwara, Jammu and Kashmir'
      }
    ]
  }
];

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateXml() {
  const urlsXml = routes.map((route) => {
    const loc = route.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${route.path}`;
    let xml = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(2)}</priority>`;

    if (route.images && route.images.length > 0) {
      for (const img of route.images) {
        xml += `\n    <image:image>\n      <image:loc>${escapeXml(img.loc)}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>\n      <image:caption>${escapeXml(img.caption)}</image:caption>\n    </image:image>`;
      }
    }

    xml += `\n  </url>`;
    return xml;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>
`;
}

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, generateXml(), 'utf8');
console.log(`[sitemap] Successfully dynamically generated sitemap.xml at: ${outputPath}`);
