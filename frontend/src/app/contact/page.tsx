'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ContactPage() {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const topics = [
    { id: 'order', name: 'Order Inquiry', desc: 'Track order, returns, exchanges' },
    { id: 'product', name: 'Product Information', desc: 'Details, availability, care' },
    { id: 'feedback', name: 'Feedback', desc: 'Share your experience' },
    { id: 'other', name: 'Other', desc: 'General questions' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !message || !name || !email) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: `[Topic: ${topic}] ${message}` }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Failed to submit');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
        <section className="py-16 bg-[#8F4B43]/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[#F5EDE6]/60 text-xs font-medium tracking-[0.4em] uppercase">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl text-[#F5EDE6] font-light mt-4">Contact Us</h1>
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-[#5C2E28] rounded-xl p-8">
            <h2 className="text-2xl text-[#F5EDE6] font-light mb-4">Thank You!</h2>
            <p className="text-[#F5EDE6]/70">Your message has been submitted successfully. We'll get back to you soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      {/* Hero */}
      <section className="py-16 bg-[#8F4B43]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F5EDE6]/60 text-xs font-medium tracking-[0.4em] uppercase">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl text-[#F5EDE6] font-light mt-4">Contact Us</h1>
          <p className="text-[#F5EDE6]/60 text-lg mt-6 font-light">
            We're here to help you with any questions
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit}>
          {/* Topic Dropdown */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#F5EDE6] text-[#8F4B43] flex items-center justify-center text-sm font-medium">1</span>
              <h2 className="text-2xl text-[#F5EDE6] font-light">Topic</h2>
            </div>
            <p className="text-[#F5EDE6]/60 mb-2">In order to better assist you, please select a topic</p>
            <p className="text-[#F5EDE6]/60 text-sm mb-4">Please select your topic *</p>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#8F4B43]/30 border border-[#F5EDE6]/20 text-[#F5EDE6] p-4 rounded-lg focus:outline-none focus:border-[#F5EDE6]/50 appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F5EDE6' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'right 1rem center', 
                backgroundSize: '1.5em 1.5em' 
              }}
              required
            >
              <option value="" className="bg-[#8F4B43]">Select a topic...</option>
              {topics.map((t) => (
                <option key={t.id} value={t.name} className="bg-[#8F4B43]">
                  {t.name} - {t.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Form */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-[#F5EDE6] text-[#8F4B43] flex items-center justify-center text-sm font-medium">2</span>
              <h2 className="text-2xl text-[#F5EDE6] font-light">Your Message</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#F5EDE6]/60 text-sm mb-2">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#8F4B43]/30 border border-[#F5EDE6]/20 text-[#F5EDE6] p-4 rounded-lg focus:outline-none focus:border-[#F5EDE6]/50"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-[#F5EDE6]/60 text-sm mb-2">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#8F4B43]/30 border border-[#F5EDE6]/20 text-[#F5EDE6] p-4 rounded-lg focus:outline-none focus:border-[#F5EDE6]/50"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[#F5EDE6]/60 text-sm mb-2">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#8F4B43]/30 border border-[#F5EDE6]/20 text-[#F5EDE6] p-4 rounded-lg focus:outline-none focus:border-[#F5EDE6]/50 min-h-[150px]"
                  placeholder="Type your message here..."
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-300 mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5EDE6] text-[#8F4B43] py-4 font-medium uppercase tracking-wider hover:bg-[#F5EDE6]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* Contact Options */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-[#F5EDE6] text-[#8F4B43] flex items-center justify-center text-sm font-medium">3</span>
            <h2 className="text-2xl text-[#F5EDE6] font-light">Contact Options</h2>
          </div>
          
          <div className="flex gap-4 mb-6">
            {/* Email Icon */}
            <Link
              href="mailto:khurai.jewels@gmail.com"
              className="inline-flex items-center justify-center w-12 h-12 bg-[#8F4B43]/30 border border-[#F5EDE6]/20 rounded-full hover:bg-[#5C2E28] transition-colors"
              title="Send an email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#F5EDE6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>

            {/* Phone Icon */}
            <a
              href="tel:+916282822799"
              className="inline-flex items-center justify-center w-12 h-12 bg-[#8F4B43]/30 border border-[#F5EDE6]/20 rounded-full hover:bg-[#5C2E28] transition-colors"
              title="Call us"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#F5EDE6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>

          <div>
            <p className="text-[#F5EDE6] font-medium">Customer Service India</p>
            <p className="text-[#F5EDE6]/70 text-sm mt-1">
              Mon - Sun: 09:00 - 21:00 IST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
