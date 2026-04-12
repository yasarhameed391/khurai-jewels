'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, getCartTotal, createOrder, isLoggedIn, getStoredUser, clearCart, getRazorpayKey, createRazorpayOrder, verifyRazorpayPayment } from '@/lib/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
  const [razorpayKey, setRazorpayKey] = useState('');

  useEffect(() => {
    loadRazorpayScript();
    loadRazorpayKey();
  }, []);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const loadRazorpayKey = async () => {
    try {
      const key = await getRazorpayKey();
      setRazorpayKey(key);
    } catch (err) {
      console.error('Failed to load Razorpay key:', err);
    }
  };

  useEffect(() => {
    const cartItems = getCart();
    if (cartItems.length === 0) {
      router.push('/cart');
      return;
    }
    setItems(cartItems);
    
    const user = getStoredUser();
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pincode: user.address?.pincode || '',
      });
    }
    setLoading(false);
  }, [router]);

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const isGuest = !isLoggedIn();
      const user = getStoredUser();
      
      if (paymentMethod === 'razorpay') {
        const orderData = {
          name: formData.name,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        };
        
        const rzOrder = await createRazorpayOrder(total);
        
        const rzOptions = {
          key: razorpayKey,
          amount: rzOrder.amount,
          currency: 'INR',
          name: 'Khurai Jewels',
          description: 'Jewelry Purchase',
          order_id: rzOrder.orderId,
          handler: async (response: any) => {
            try {
              const result = await verifyRazorpayPayment(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature,
                {
                  items,
                  total,
                  shippingAddress: orderData,
                  isGuest,
                  guestEmail: isGuest ? formData.email : undefined,
                  userId: (user as any)?._id,
                }
              );
              clearCart();
              router.push('/order-success');
            } catch (err: any) {
              setError(err.message || 'Payment verification failed');
              setSubmitting(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#9b5a4a',
          },
        };
        
        const rzp = new window.Razorpay(rzOptions);
        rzp.open();
        setSubmitting(false);
      } else {
        await createOrder({
          items,
          total,
          shippingAddress: {
            name: formData.name,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          isGuest,
          guestEmail: isGuest ? formData.email : undefined,
        });

        clearCart();
        router.push('/order-success');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#7a4538] pt-28 pb-16 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-white font-light mb-10">Checkout</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <h2 className="text-xl text-white font-light mb-6">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white-60 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white-60 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required={!isLoggedIn()}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white-60 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white-60 text-sm mb-2">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white-60 text-sm mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white-60 text-sm mb-2">State *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white-60 text-sm mb-2">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <h2 className="text-xl text-white font-light mb-6">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg cursor-pointer hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-[#9b5a4a]"
                    />
                    <div>
                      <p className="text-white">Cash on Delivery</p>
                      <p className="text-white-50 text-sm">Pay when you receive your order</p>
                    </div>
                  </div>
                </label>

                {razorpayKey && (
                  <label className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg cursor-pointer hover:border-white/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="w-4 h-4 text-[#9b5a4a]"
                      />
                      <div>
                        <p className="text-white">Pay Online (Razorpay)</p>
                        <p className="text-white-50 text-sm">Secure payment with card/UPI/netbanking</p>
                      </div>
                    </div>
                    <svg className="w-8 h-8 text-white-50" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 sticky top-28">
              <h2 className="text-xl text-white font-light mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-white-60">{item.name} x {item.quantity}</span>
                    <span className="text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-2">
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

              <div className="flex justify-between py-4 border-t border-zinc-800 mt-4">
                <span className="text-white text-lg">Total</span>
                <span className="text-white text-2xl font-light">₹{total.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#9b5a4a] text-white py-4 font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-all disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'Place Order'}
              </button>

              <p className="mt-4 text-zinc-500 text-xs text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}