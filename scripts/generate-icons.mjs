import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal pure Node.js PNG encoder without external native dependencies
function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);

  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodeRGBAtoPNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Scanlines with filter byte 0
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    scanlines[offset++] = 0; // No filter
    const rowStart = y * width * 4;
    for (let x = 0; x < width * 4; x++) {
      scanlines[offset++] = rgbaBuffer[rowStart + x];
    }
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate branded icons
function renderIcon(size, isMaskable = false) {
  const buf = Buffer.alloc(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.44;
  const innerRadius = isMaskable ? size * 0.32 : size * 0.38;

  // Background colors: Forest green #072614 -> #0f3d23 gradient
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deep emerald green gradient
      const factor = Math.min(1, dist * 0.85);
      const r = Math.round(7 + 10 * (1 - factor));
      const g = Math.round(38 + 24 * (1 - factor));
      const b = Math.round(20 + 15 * (1 - factor));
      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = 255;

      // Draw subtle gold concentric rings
      const distPx = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const ringDist = Math.abs(distPx - innerRadius);
      if (ringDist < size * 0.015) {
        // Gold #c5a059
        const alpha = Math.max(0, 1 - ringDist / (size * 0.015));
        buf[idx] = Math.round(buf[idx] * (1 - alpha) + 197 * alpha);
        buf[idx + 1] = Math.round(buf[idx + 1] * (1 - alpha) + 160 * alpha);
        buf[idx + 2] = Math.round(buf[idx + 2] * (1 - alpha) + 89 * alpha);
      }

      // Draw Center Gold "S" (Shelter Sanctuary) emblem
      const ny = (y - cy) / (innerRadius * 0.65);
      const nx = (x - cx) / (innerRadius * 0.55);
      const insideUpperArc = Math.abs(Math.sqrt((nx - 0.05)**2 + (ny + 0.35)**2) - 0.45) < 0.16 && nx > -0.5 && ny < 0.1;
      const insideLowerArc = Math.abs(Math.sqrt((nx + 0.05)**2 + (ny - 0.35)**2) - 0.45) < 0.16 && nx < 0.5 && ny > -0.1;
      const insideDiagonal = Math.abs(ny + nx * 0.7) < 0.18 && Math.abs(ny) < 0.35;

      if (insideUpperArc || insideLowerArc || insideDiagonal) {
        // Shimmering warm gold #e4be74
        buf[idx] = 228;
        buf[idx + 1] = 190;
        buf[idx + 2] = 116;
        buf[idx + 3] = 255;
      }

      // Add cup crown / steam dots on top
      const dot1 = Math.hypot(x - cx, y - (cy - innerRadius * 0.75));
      const dot2 = Math.hypot(x - (cx - innerRadius * 0.25), y - (cy - innerRadius * 0.65));
      const dot3 = Math.hypot(x - (cx + innerRadius * 0.25), y - (cy - innerRadius * 0.65));
      if (dot1 < size * 0.025 || dot2 < size * 0.022 || dot3 < size * 0.022) {
        buf[idx] = 243;
        buf[idx + 1] = 214;
        buf[idx + 2] = 148;
        buf[idx + 3] = 255;
      }
    }
  }

  return encodeRGBAtoPNG(size, size, buf);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), renderIcon(192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), renderIcon(512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), renderIcon(512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), renderIcon(180, false));

// Also generate high-res SVG
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0e3d23"/>
      <stop offset="100%" stop-color="#072614"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f3d694"/>
      <stop offset="50%" stop-color="#c5a059"/>
      <stop offset="100%" stop-color="#8f6e2b"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="104" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="190" fill="none" stroke="url(#gold)" stroke-width="4" opacity="0.4"/>
  <circle cx="256" cy="256" r="176" fill="none" stroke="url(#gold)" stroke-width="2" stroke-dasharray="8 6" opacity="0.6"/>
  
  <!-- Crown / Aroma Steam -->
  <path d="M 230 140 Q 240 115 235 90" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M 256 135 Q 266 110 260 80" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M 282 140 Q 292 115 287 90" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" fill="none"/>

  <!-- Iconic S Emblem for The Shelter -->
  <g filter="url(#glow)">
    <path d="M 320 200 C 320 160, 290 150, 256 150 C 210 150, 195 180, 195 210 C 195 260, 315 250, 315 305 C 315 340, 285 365, 256 365 C 215 365, 190 340, 190 295" 
          fill="none" 
          stroke="url(#gold)" 
          stroke-width="26" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
  </g>

  <!-- Shelter Roof / Sanctuary Peak -->
  <path d="M 180 180 L 256 125 L 332 180" fill="none" stroke="url(#gold)" stroke-width="6" stroke-linecap="round" opacity="0.7"/>

  <!-- Tagline text below -->
  <text x="256" y="420" font-family="'Playfair Display', serif" font-size="28" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="6">THE SHELTER</text>
  <text x="256" y="450" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#a0b3a6" text-anchor="middle" letter-spacing="4">KRALGUND • CAFE &amp; RESTO</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
console.log('Successfully generated PWA icon assets: 192x192, 512x512, maskable, apple-touch-icon, and icon.svg');
