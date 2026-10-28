export interface MenuItem {
  id: string;
  name: string;
  category: 
    | 'kashmiri-specials' 
    | 'cafe-brews' 
    | 'pizzas' 
    | 'burgers' 
    | 'rolls'
    | 'momos'
    | 'fries'
    | 'kanties'
    | 'combos'
    | 'shakes'
    | 'mojitos'
    | 'chinese' 
    | 'tandoor' 
    | 'curries' 
    | 'biryani' 
    | 'vegetarian'
    | 'breads'
    | 'pasta'
    | 'sizzlers' 
    | 'desserts' 
    | 'drinks' 
    | 'starters' 
    | 'sides';
  categoryLabel: string;
  price: number;
  description: string;
  regionalOrigin?: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0 mild, 1 medium, 2 hot, 3 fiery
  isSignature?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  containsNuts?: boolean;
  imageUrl: string;
  portionOrSize?: string;
  sizes?: { name: string; price: number }[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google Review' | 'TripAdvisor';
  verified: boolean;
  tag: 'food' | 'service' | 'atmosphere';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'dishes' | 'drinks' | 'exterior';
  imageUrl: string;
  description: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationData {
  guests: number;
  date: string;
  time: string;
  area: 'Blossom Canopy' | 'Main Dining Room' | 'Window Booth' | 'Any Available';
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  dietaryNotes?: string;
}

export interface OrderData {
  orderNumber: string;
  orderType: 'collection' | 'delivery';
  deliveryArea?: string;
  customerName: string;
  phone: string;
  address?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  estimatedMinutes: number;
  customerConfirmed?: boolean;
  confirmedAt?: string;
}
