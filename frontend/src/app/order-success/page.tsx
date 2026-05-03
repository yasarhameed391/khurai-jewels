'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl text-[#F5EDE6] font-light mb-4">Order Placed Successfully!</h1>
        <p className="text-[#F5EDE6]/60 mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/products"
            className="block w-full bg-[#8F4B43] text-[#F5EDE6] py-4 font-medium uppercase tracking-wider hover:bg-[#8F4B43] transition-opacity"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/"
            className="block w-full bg-[#8F4B43]/50 text-[#F5EDE6] py-4 font-medium uppercase tracking-wider hover:bg-[#8F4B43]/50 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}