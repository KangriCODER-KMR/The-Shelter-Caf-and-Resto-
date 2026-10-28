import { OrderData, CartItem } from '../types';

export const ORDER_HISTORY_STORAGE_KEY = 'shelter_cafe_order_history';

/**
 * Retrieve all past orders from the phone/device's local storage.
 * Orders are returned in reverse chronological order (newest first).
 */
export function getOrderHistory(): OrderData[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDER_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.error('Failed to read order history from localStorage:', err);
    return [];
  }
}

/**
 * Persistently save a newly placed order to the user's phone storage.
 * Stores up to 50 recent orders and triggers a sync event.
 */
export function saveOrderToHistory(order: OrderData): OrderData[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getOrderHistory();
    // Remove if already exists to update it at top
    const filtered = current.filter((o) => o.orderNumber !== order.orderNumber);
    const updated = [order, ...filtered].slice(0, 50);
    localStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    
    // Broadcast change for live UI synchronization
    window.dispatchEvent(new CustomEvent('shelter_order_history_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to persist order to localStorage:', err);
    return [];
  }
}

/**
 * Remove a specific order from history
 */
export function removeOrderFromHistory(orderNumber: string): OrderData[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getOrderHistory();
    const updated = current.filter((o) => o.orderNumber !== orderNumber);
    localStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('shelter_order_history_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to remove order from localStorage:', err);
    return [];
  }
}

/**
 * Clear the entire order history from device storage
 */
export function clearOrderHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ORDER_HISTORY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('shelter_order_history_updated', { detail: [] }));
  } catch (err) {
    console.error('Failed to clear order history:', err);
  }
}
