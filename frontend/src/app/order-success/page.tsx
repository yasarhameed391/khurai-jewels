'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl text-white font-light mb-4">Order Placed Successfully!</h1>
        <p className="text-white-60 mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/products"
            className="block w-full bg-[#9b5a4a] text-white py-4 font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-opacity"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/"
            className="block w-full bg-zinc-800 text-white py-4 font-medium uppercase tracking-wider hover:bg-zinc-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}