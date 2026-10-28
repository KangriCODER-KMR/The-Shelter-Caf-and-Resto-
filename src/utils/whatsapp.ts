import { ReservationData, CartItem, OrderData } from '../types';
import { WHATSAPP_CONFIG, RESTAURANT_INFO } from '../data/restaurantData';

/**
 * Clean phone number to ensure it only contains digits for WhatsApp wa.me links
 * Default owner number: 919596123022
 */
export function getSanitizedWhatsAppNumber(rawNumber: string = WHATSAPP_CONFIG.phoneNumber): string {
  const digits = rawNumber.replace(/[^0-9]/g, '');
  // Default to official registered owner number: 919596123022
  return digits.length >= 10 ? (digits.startsWith('91') ? digits : `91${digits}`) : '919596123022';
}

/**
 * Generate formatted WhatsApp URL for Table Reservations
 */
export function createReservationWhatsAppUrl(data: ReservationData): string {
  const number = getSanitizedWhatsAppNumber();
  const formattedDate = new Date(data.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const message = [
    `╔══════════════════════════════════════════╗`,
    `  ☕ THE SHELTER CAFE & RESTO — KRALGUND ☕`,
    `       TABLE RESERVATION INQUIRY`,
    `╚══════════════════════════════════════════╝`,
    ``,
    `📅 *DATE:* ${formattedDate}`,
    `⏰ *TIME:* ${data.time}`,
    `👥 *GUESTS:* ${data.guests} ${data.guests === 1 ? 'Guest' : 'Guests'}`,
    `🌸 *PREFERRED SEATING:* ${data.area}`,
    ``,
    `👤 *GUEST INFORMATION:*`,
    `• *Name:* ${data.fullName || 'Valued Guest'}`,
    `• *Phone:* ${data.phone || 'Not provided'}`,
    `• *Email:* ${data.email || 'Not provided'}`,
    ...(data.dietaryNotes ? [`🥗 *Dietary Notes:* ${data.dietaryNotes}`] : []),
    ...(data.specialRequests ? [`📝 *Special Requests:* ${data.specialRequests}`] : []),
    ``,
    `──────────────────────────────────────────`,
    `📍 *Location:* Main Road, Kralgund Qaziabad, Handwara`,
    `📞 *Direct Line:* +91 95961 23022`,
    `──────────────────────────────────────────`,
    `_Sent via The Shelter Cafe Online Reservation Portal_`,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a printable, fantastic kitchen order ticket message for WhatsApp
 * Formatted cleanly with Unicode borders and itemized breakdown for restaurant owner
 * Includes owner confirmation instruction and substitution pre-notification note.
 */
export function createOrderWhatsAppUrl(
  cart: CartItem[],
  details: {
    orderType: 'collection' | 'delivery';
    deliveryArea?: string;
    customerName: string;
    phone: string;
    address?: string;
    notes?: string;
    deliveryFee?: number;
    orderNumber?: string;
    estimatedMinutes?: number;
  }
): string {
  const number = getSanitizedWhatsAppNumber();
  const curr = RESTAURANT_INFO.currency || '₹';
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = details.orderType === 'delivery' ? (details.deliveryFee ?? 20) : 0;
  const total = subtotal + deliveryFee;
  const eta = details.estimatedMinutes || (details.orderType === 'delivery' ? 35 : 20);
  const orderRef = details.orderNumber || `TS-${Math.floor(1000 + Math.random() * 9000)}`;

  const orderLines = cart.map((c, index) => {
    const itemTotal = (c.item.price * c.quantity).toFixed(2);
    const sizeNote = c.item.portionOrSize ? ` (${c.item.portionOrSize})` : '';
    let line = `${index + 1}. *${c.item.name}${sizeNote}*\n   Qty: ${c.quantity} × ${curr}${c.item.price}  ➜  *${curr}${itemTotal}*`;
    if (c.specialInstructions) {
      line += `\n   ↳ _Note: ${c.specialInstructions}_`;
    }
    return line;
  });

  const message = [
    `╔══════════════════════════════════════════════╗`,
    `  ☕ THE SHELTER CAFE & RESTO — KRALGUND ☕`,
    `     Main Road, Kralgund Qaziabad, Handwara`,
    `             Hotline: +91 95961 23022`,
    `     OFFICIAL KITCHEN ORDER TICKET (KOT)`,
    `╚══════════════════════════════════════════════╝`,
    ``,
    `📋 *ORDER INVOICE REF:* #${orderRef}`,
    `📅 *DATE & TIME:* ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    `📦 *FULFILLMENT:* ${details.orderType === 'delivery' ? '🚗 Express Home Delivery' : '🛍️ Self-Pickup at Counter'}`,
    ...(details.orderType === 'delivery' && details.deliveryArea ? [`📍 *SERVICEABLE AREA:* *${details.deliveryArea}*`] : []),
    `⏱️ *ESTIMATED KITCHEN TIMING:* ~${eta} mins`,
    ``,
    `👤 *CUSTOMER INFORMATION:*`,
    `• *Customer Name:* ${details.customerName || 'Valued Guest'}`,
    `• *Contact Phone:* ${details.phone || 'Not provided'}`,
    ...(details.orderType === 'delivery' && details.address ? [`• *Delivery Address:* ${details.address}`] : []),
    ...(details.notes ? [`• *Kitchen Notes / Spice:* ${details.notes}`] : []),
    ``,
    `🍽️ *ITEMIZED DISH BREAKDOWN:*`,
    `──────────────────────────────────────────────`,
    ...orderLines,
    `──────────────────────────────────────────────`,
    `*Subtotal:*                         ${curr}${subtotal.toFixed(2)}`,
    ...(details.orderType === 'delivery'
      ? [`*Delivery Fee (${details.deliveryArea || 'Standard'}):*   ${deliveryFee === 0 ? 'FREE (Threshold)' : `${curr}${deliveryFee.toFixed(2)}`}`]
      : [`*Delivery Fee:*                  ₹0.00 (In-Store Pickup)`]),
    `*Packaging & Handling:*             ₹0.00 (FREE)`,
    `══════════════════════════════════════════════`,
    `💰 *GRAND TOTAL PAYABLE:*          *${curr}${total.toFixed(2)}*`,
    `══════════════════════════════════════════════`,
    ``,
    `✅ *CUSTOMER ACKNOWLEDGEMENT:*`,
    `Order confirmed and sent to kitchen for immediate dispatch.`,
    ``,
    `⚠️ *NOTE FOR RESTAURANT OWNER:*`,
    `Please confirm this order from your side and pre-inform the customer immediately if any changes or substitutions are in the order.`,
    ``,
    `🌐 *DIGITAL TICKET LINK:* https://thesheltercafe.com/order/${orderRef}`,
    `_Sent via The Shelter Cafe & Resto Kralgund Online Portal_`,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Forward confirmed order ticket directly to Restaurant Owner WhatsApp (+91 95961 23022)
 * in fantastic printable digital format with verification and owner confirmation notice.
 */
export function createForwardOrderToOwnerWhatsAppUrl(order: OrderData): string {
  const number = getSanitizedWhatsAppNumber();
  const curr = RESTAURANT_INFO.currency || '₹';
  const timeStr = order.orderType === 'delivery' 
    ? `${order.estimatedMinutes}–${order.estimatedMinutes + 10} mins` 
    : `${order.estimatedMinutes} mins`;
  
  const orderLines = order.items.map((c, index) => {
    const itemTotal = (c.item.price * c.quantity).toFixed(2);
    const sizeNote = c.item.portionOrSize ? ` (${c.item.portionOrSize})` : '';
    let line = `${index + 1}. *${c.item.name}${sizeNote}*\n   Qty: ${c.quantity} × ${curr}${c.item.price}  ➜  *${curr}${itemTotal}*`;
    if (c.specialInstructions) {
      line += `\n   ↳ _Note: ${c.specialInstructions}_`;
    }
    return line;
  });

  const message = [
    `╔══════════════════════════════════════════════╗`,
    `  ☕ THE SHELTER CAFE & RESTO — KRALGUND ☕`,
    `     Main Road, Kralgund Qaziabad, Handwara`,
    `             Hotline: +91 95961 23022`,
    `      CONFIRMED KITCHEN ORDER TICKET`,
    `╚══════════════════════════════════════════════╝`,
    ``,
    `📋 *ORDER TICKET ID:* #${order.orderNumber}`,
    `📅 *ORDER PLACED:* ${order.createdAt}`,
    `⏱️ *DISPATCH WINDOW:* ~${timeStr}`,
    `📦 *ORDER TYPE:* ${order.orderType === 'delivery' ? '🚗 Express Home Delivery' : '🛍️ In-Store Collection'}`,
    ...(order.deliveryArea ? [`📍 *DELIVERY AREA:* *${order.deliveryArea}*`] : []),
    ...(order.orderType === 'delivery' && order.address ? [`📍 *DELIVERY ADDRESS:* ${order.address}`] : []),
    ``,
    `👤 *CUSTOMER DETAILS:*`,
    `• *Customer Name:* ${order.customerName || 'Valued Guest'}`,
    `• *Contact Phone:* ${order.phone}`,
    ...(order.notes ? [`• *Kitchen Notes / Instructions:* ${order.notes}`] : []),
    ``,
    `🍽️ *ORDERED DISHES:*`,
    `──────────────────────────────────────────────`,
    ...orderLines,
    `──────────────────────────────────────────────`,
    `• *Subtotal:*                         ${curr}${order.subtotal.toFixed(2)}`,
    ...(order.orderType === 'delivery'
      ? [`• *Delivery Fee (${order.deliveryArea || 'Standard'}):*   ${order.deliveryFee === 0 ? 'FREE (Threshold)' : `${curr}${order.deliveryFee.toFixed(2)}`}`]
      : [`• *Delivery Fee:*                  ₹0.00 (Self-Pickup)`]),
    `• *Packaging:*                       ₹0.00 (Complimentary)`,
    `══════════════════════════════════════════════`,
    `💰 *TOTAL AMOUNT:*                    *${curr}${order.total.toFixed(2)}*`,
    `══════════════════════════════════════════════`,
    ``,
    `✅ *CUSTOMER CONFIRMATION STATUS:*`,
    `${order.customerConfirmed 
      ? `VERIFIED & LOCKED FROM CUSTOMER SIDE (${order.confirmedAt || 'Just now'})` 
      : 'CUSTOMER CONFIRMED & DISPATCH REQUESTED'}`,
    ``,
    `⚠️ *NOTE FOR RESTAURANT OWNER:*`,
    `Please confirm this order from your side and pre-inform the customer immediately if any changes or substitutions are in the order.`,
    ``,
    `🖨️ *PRINT DIGITAL TICKET / VERIFY:*`,
    `https://thesheltercafe.com/verify-order/${order.orderNumber}`,
    `──────────────────────────────────────────────`,
    `_Forwarded directly to Restaurant Owner WhatsApp (+91 95961 23022)_`,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate formatted direct chat link
 */
export function createDirectChatWhatsAppUrl(customMessage?: string): string {
  const number = getSanitizedWhatsAppNumber();
  const defaultMsg = customMessage || `Hello The Shelter Cafe & Resto Kralgund, I would like to inquire about dining at your restaurant!`;
  return `https://wa.me/${number}?text=${encodeURIComponent(defaultMsg)}`;
}
