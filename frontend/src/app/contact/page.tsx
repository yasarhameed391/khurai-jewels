'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      {/* Hero */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white text-xs font-medium tracking-[0.4em] uppercase">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl text-white font-light mt-4">Contact Us</h1>
          <p className="text-white-60 text-lg mt-6 font-light">
            Have questions about our collection? We're here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section className="py-10">
            <h2 className="text-2xl text-white font-light mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">💛</div>
                <h3 className="text-white text-xl mb-2">Thank you for reaching out!</h3>
                <p className="text-white-60">We'll get back to you within 24-48 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-white hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white-60 text-sm mb-2">Name *</label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white-60 text-sm mb-2">Email *</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white-60 text-sm mb-2">Phone</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                      placeholder="+1 (XXX) XXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-white-60 text-sm mb-2">Subject *</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white-60 text-sm mb-2">Message *</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#9b5a4a] text-white px-8 py-4 font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </section>

          {/* Contact Info */}
          <section className="py-10 space-y-8">
            {/* Contact Details */}
            <div className="bg-zinc-900/50 rounded-xl p-8 border border-zinc-800">
              <h2 className="text-2xl text-white font-light mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">Email</h3>
                    <p className="text-white-60">support@khuraijewels.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">Phone</h3>
                    <p className="text-white-60">+91 XXX XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">Location</h3>
                    <p className="text-white-60">Kochi, Kerala, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support Hours */}
            <div className="bg-zinc-900/50 rounded-xl p-8 border border-zinc-800">
              <h2 className="text-xl text-white font-light mb-6">Customer Support Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white-60">Monday – Friday</span>
                  <span className="text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white-60">Saturday</span>
                  <span className="text-white">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white-60">Sunday</span>
                  <span className="text-zinc-600">Closed</span>
                </div>
              </div>
              <p className="text-white-50 text-sm mt-4">We aim to respond within 24–48 hours</p>
            </div>

            {/* Social Media */}
            <div className="bg-zinc-900/50 rounded-xl p-8 border border-zinc-800">
              <h2 className="text-xl text-white font-light mb-6">Stay Connected</h2>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-white hover:text-[#9b5a4a] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-white hover:text-[#9b5a4a] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-white hover:text-[#9b5a4a] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.39-3.53-4.42-3.53-8.09 0-4.19 2.39-7.97 6.44-9.01.87-.23 1.84-.38 2.78-.38 1.01 0 1.99.12 2.93.36.64.16 1.22.4 1.73.67.12.06.23.13.34.19.08.05.16.1.23.15.4.25.8.48 1.18.7.2.11.39.22.58.32.09.05.17.1.25.14.15.08.29.16.43.23.14.07.27.13.4.19.13.06.25.11.37.16.12.05.23.1.34.14.11.04.21.08.32.11.11.03.21.06.32.09.11.03.21.05.32.07.11.02.21.04.32.05.11.01.21.02.32.02.58 0 1.13-.1 1.65-.29.52-.19.98-.47 1.37-.83.39-.36.7-.79.91-1.27.21-.48.33-1 .33-1.55v-1.15c-.73-.51-1.53-.94-2.38-1.27-.85-.33-1.77-.53-2.72-.52-.95.01-1.86.21-2.67.59-.81.38-1.5.9-2.03 1.55-.53.65-.9 1.41-1.07 2.26-.17.85-.17 1.72-.01 2.58.16.86.48 1.67.95 2.4.47.73 1.06 1.36 1.76 1.85.7.49 1.48.87 2.3 1.11.82.24 1.69.37 2.58.39.9.02 1.78-.1 2.63-.35.85-.25 1.63-.61 2.32-1.06.69-.45 1.27-1.02 1.71-1.67.44-.65.73-1.4.85-2.21v-.47c-.08-.59-.25-1.15-.51-1.66-.26-.51-.6-.98-1-1.4-.4-.42-.86-.8-1.37-1.12-.51-.32-1.07-.58-1.66-.77-.59-.19-1.21-.31-1.85-.36-.64-.05-1.28-.02-1.92.08-.64.1-1.27.28-1.85.53-.58.25-1.12.56-1.6.92-.48.36-.91.78-1.28 1.24-.37.46-.68.96-.93 1.49-.25.53-.41 1.1-.47 1.68-.06.58-.02 1.17.13 1.74.15.57.4 1.1.74 1.59.34.49.76.91 1.23 1.25.47.34.99.61 1.55.8.56.19 1.16.31 1.77.36.61.05 1.23.01 1.83-.12.6-.13 1.18-.34 1.71-.62.53-.28 1.01-.63 1.43-1.03.42-.4.77-.86 1.04-1.35.27-.49.47-1.01.59-1.55.12-.54.16-1.1.11-1.65-.05-.55-.19-1.09-.42-1.58-.23-.49-.54-.94-.91-1.33-.37-.39-.79-.72-1.25-1-.46-.28-.96-.5-1.48-.65-.52-.15-1.07-.23-1.62-.24z"/></svg>
                </a>
              </div>
              <p className="text-white-50 text-sm mt-4">
                @khuraijewels • Khurai Jewels • @khuraijewels
              </p>
            </div>
          </section>
        </div>

        {/* Return & Refund Policy */}
        <section className="py-16 mt-16 border-t border-zinc-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-white font-light text-center mb-12">Return & Refund Policy</h2>
            
            <div className="space-y-8">
              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-3">
                  <span className="text-white">↩️</span>
                  Returns
                </h3>
                <div className="text-white-60 space-y-3 font-light">
                  <p>• We accept returns within 7 days of delivery for eligible items.</p>
                  <p>• Items must be unworn, in original packaging, and with all tags attached.</p>
                  <p>• Custom or personalized items are not eligible for return unless there is a manufacturing defect.</p>
                  <p>• To initiate a return, please contact us at support@khuraijewels.com with your order details.</p>
                </div>
              </div>

              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-3">
                  <span className="text-white">💰</span>
                  Refunds
                </h3>
                <div className="text-white-60 space-y-3 font-light">
                  <p>• Once we receive and inspect your return, we will process your refund within 5-7 business days.</p>
                  <p>• Refunds will be credited to the original payment method.</p>
                  <p>• Shipping charges are non-refundable unless the return is due to our error.</p>
                  <p>• If the item is damaged or defective, we will cover the return shipping costs.</p>
                </div>
              </div>

              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-3">
                  <span className="text-white">❌</span>
                  Non-Returnable Items
                </h3>
                <div className="text-white-60 space-y-3 font-light">
                  <p>• Earrings (for hygiene reasons)</p>
                  <p>• Items damaged due to customer misuse</p>
                  <p>• Items without original packaging or tags</p>
                  <p>• Gift cards and digital downloads</p>
                </div>
              </div>

              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-3">
                  <span className="text-white">📦</span>
                  Exchanges
                </h3>
                <div className="text-white-60 space-y-3 font-light">
                  <p>• We offer exchanges for size or color adjustments.</p>
                  <p>• Contact us within 7 days of delivery to request an exchange.</p>
                  <p>• Exchange shipping will be at the customer's expense unless the issue is due to our error.</p>
                </div>
              </div>

              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-3">
                  <span className="text-white">📞</span>
                  Contact Us
                </h3>
                <div className="text-white-60 space-y-3 font-light">
                  <p>• If you have any questions about our return policy, please reach out.</p>
                  <p>• Email: support@khuraijewels.com</p>
                  <p>• We are here to help and ensure your satisfaction.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}