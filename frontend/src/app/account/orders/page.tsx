'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredUser, getStoredToken, logout } from '@/lib/api';

interface Order {
  _id: string;
  orderNumber: string;
  products: Array<{ productId: { name: string }; quantity: number }>;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://khurai-jewels.onrender.com';

export default function AccountOrdersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<{ _id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    const storedUser = getStoredUser();
    
    if (!token || !storedUser) {
      router.push('/login');
      return;
    }
    
    setUser(storedUser as any);
    loadOrders((storedUser as any)._id);
  }, []);

  const loadOrders = async (userId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/user/${userId}`);
      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16 flex items-center justify-center">
        <div className="text-[#F5EDE6]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl text-[#F5EDE6] font-light">My Orders</h1>
            <p className="text-[#F5EDE6]/50 mt-1">Welcome, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="text-[#F5EDE6]/60 hover:text-[#F5EDE6]"
            >
              Logout
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#F5EDE6]/50">You haven&apos;t placed any orders yet.</p>
            <button
              onClick={() => router.push('/products')}
              className="mt-4 bg-[#8F4B43] text-[#F5EDE6] px-6 py-3 hover:bg-[#8F4B43]"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-[#8F4B43]/50/50 rounded-xl border border-[#F5EDE6]/20 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-[#F5EDE6]/50">Order Number</p>
                    <p className="text-[#F5EDE6] font-mono">{order.orderNumber || order._id.slice(-8)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#F5EDE6]/50">Date</p>
                    <p className="text-[#F5EDE6]">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-[#F5EDE6]/50 mb-2">Products</p>
                    <div className="space-y-1">
                      {(order.products || []).map((item: any, idx) => (
                        <p key={idx} className="text-[#F5EDE6]">
                          {item.productId?.name || item.name || 'Product'} x{item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#F5EDE6]/50">Total</p>
                    <p className="text-xl text-[#F5EDE6]">₹{order.totalAmount?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#F5EDE6]/20">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      order.paymentStatus === 'paid' ? 'bg-green-500' : 
                      order.paymentStatus === 'failed' ? 'bg-red-500' : 
                      'bg-yellow-500'
                    }`}></span>
                    <span className="text-sm text-[#F5EDE6]/60">Payment: {order.paymentStatus}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      order.orderStatus === 'delivered' ? 'bg-green-500' : 
                      order.orderStatus === 'cancelled' ? 'bg-red-500' : 
                      order.orderStatus === 'shipped' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    }`}></span>
                    <span className="text-sm text-[#F5EDE6]/60">Status: {order.orderStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}