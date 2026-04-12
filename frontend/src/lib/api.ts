const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://khurai-jewels.onrender.com';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.data;
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  const data = await res.json();
  return data.data;
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  const data = await res.json();
  return data.data;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  const data = await res.json();
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
  }
  return data.data;
}

export async function adminLogin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Admin login failed');
  }
  const data = await res.json();
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
  }
  return data.data;
}

export async function register(name: string, email: string, password: string, phone?: string, address?: object): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone, address }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  const data = await res.json();
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
  }
  return data.data;
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export function isAdmin(): boolean {
  const user = getStoredUser();
  return user?.role === 'admin';
}

export function isLoggedIn(): boolean {
  return !!getStoredToken();
}

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(items));
}

export function addToCart(product: {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
}, quantity = 1): CartItem[] {
  const items = getCart();
  const existingIndex = items.findIndex(item => item.productId === product._id);
  
  if (existingIndex >= 0) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({
      _id: `${product._id}-${Date.now()}`,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image || '',
      quantity,
      category: product.category,
    });
  }
  
  saveCart(items);
  window.dispatchEvent(new Event('cartUpdated'));
  return items;
}

export function updateCartQuantity(productId: string, quantity: number): CartItem[] {
  const items = getCart();
  const index = items.findIndex(item => item.productId === productId);
  
  if (index >= 0) {
    if (quantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = quantity;
    }
  }
  
  saveCart(items);
  window.dispatchEvent(new Event('cartUpdated'));
  return items;
}

export function removeFromCart(productId: string): CartItem[] {
  const items = getCart().filter(item => item.productId !== productId);
  saveCart(items);
  window.dispatchEvent(new Event('cartUpdated'));
  return items;
}

export function clearCart(): void {
  saveCart([]);
  window.dispatchEvent(new Event('cartUpdated'));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('wishlist');
  return stored ? JSON.parse(stored) : [];
}

export function saveWishlist(items: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('wishlist', JSON.stringify(items));
}

export function addToWishlist(productId: string): string[] {
  const items = getWishlist();
  if (!items.includes(productId)) {
    items.push(productId);
    saveWishlist(items);
    window.dispatchEvent(new Event('wishlistUpdated'));
  }
  return items;
}

export function removeFromWishlist(productId: string): string[] {
  const items = getWishlist().filter(id => id !== productId);
  saveWishlist(items);
  window.dispatchEvent(new Event('wishlistUpdated'));
  return items;
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().includes(productId);
}

export function getWishlistCount(): number {
  return getWishlist().length;
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export async function createOrder(orderData: {
  items: CartItem[];
  total: number;
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  isGuest?: boolean;
  guestEmail?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to create order');
  const data = await res.json();
  return data.data;
}

export async function getRazorpayKey() {
  const res = await fetch(`${API_BASE_URL}/api/orders/razorpay/key`);
  if (!res.ok) throw new Error('Failed to get Razorpay key');
  const data = await res.json();
  return data.data.key;
}

export async function createRazorpayOrder(amount: number) {
  const res = await fetch(`${API_BASE_URL}/api/orders/razorpay/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error('Failed to create Razorpay order');
  const data = await res.json();
  return data.data;
}

export async function verifyRazorpayPayment(razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string, orderData: any) {
  const res = await fetch(`${API_BASE_URL}/api/orders/razorpay/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData }),
  });
  if (!res.ok) throw new Error('Failed to verify payment');
  const data = await res.json();
  return data.data;
}