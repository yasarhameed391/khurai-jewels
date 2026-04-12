'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const defaultImage = 'https://images.unsplash.com/photo-1617038224538-2764d5d36d43?auto=format&fit=crop&w=400&q=80';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setLoading(false);

    const handleCartUpdate = () => {
      const updated = localStorage.getItem('cart');
      if (updated) {
        setItems(JSON.parse(updated));
      }
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item._id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    const updated = items.filter(item => item._id !== id);
    setItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-zinc-800 rounded w-48" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-6 p-6 bg-zinc-900 rounded-xl">
                <div className="w-32 h-32 bg-zinc-800 rounded-lg" />
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-zinc-800 rounded w-1/3" />
                  <div className="h-4 bg-zinc-800 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl text-white font-light mb-10">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-20 h-20 text-zinc-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl text-white mb-4 font-light">Your cart is empty</h2>
            <p className="text-white-50 mb-8">Looks like you haven't added any items yet.</p>
            <Link 
              href="/products" 
              className="inline-block bg-[#9b5a4a] text-white px-8 py-3 font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs text-white-50 uppercase tracking-wider border-b border-zinc-800">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map((item) => (
                <div 
                  key={item._id} 
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800"
                >
                  <div className="sm:col-span-5 flex gap-4">
                    <Link href={`/products/${item.productId}`} className="flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden bg-zinc-900">
                      {item.image ? (
                        <Image 
                          src={`${API_BASE_URL}${item.image}`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image 
                          src={defaultImage}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="text-white font-light text-lg hover:text-white transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-white-50 text-sm mt-1">{item.category}</p>
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="text-white-50 text-sm hover:text-red-400 mt-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:text-center flex items-center justify-between sm:justify-center py-2">
                    <span className="sm:hidden text-white-50">Price:</span>
                    <span className="text-white">₹{item.price.toLocaleString()}</span>
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-between sm:justify-center py-2">
                    <span className="sm:hidden text-white-50">Qty:</span>
                    <div className="flex items-center border border-zinc-700 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item._id, -1)}
                        className="px-3 py-1 text-white hover:bg-zinc-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, 1)}
                        className="px-3 py-1 text-white hover:bg-zinc-800 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end py-2">
                    <span className="sm:hidden text-white-50">Total:</span>
                    <span className="text-white font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}

              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 text-white-60 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 sticky top-28">
                <h2 className="text-white text-lg font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 pb-6 border-b border-zinc-800">
                  <div className="flex justify-between text-white-60">
                    <span>Subtotal</span>
                    <span className="text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white-60">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-6">
                  <span className="text-white text-lg">Total</span>
                  <span className="text-white text-2xl font-light">₹{total.toLocaleString()}</span>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full bg-[#9b5a4a] text-white py-4 text-center font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-all"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-white-50 text-xs text-center">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}