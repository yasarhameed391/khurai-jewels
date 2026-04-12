'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white text-xs font-medium tracking-[0.4em] uppercase">About Us</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-light mt-4">Khurai Jewels</h1>
          <p className="text-white-60 text-lg mt-6 font-light max-w-2xl mx-auto">
            Your destination for brand new luxury jewelry sourced directly from wholesale dealers
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-20 bg-[#7a4538]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl text-white font-light">What We Do</h2>
            <div className="w-16 h-px bg-white/10 mx-auto mt-4" />
          </div>
          <p className="text-white-60 text-lg font-light leading-relaxed text-center max-w-3xl mx-auto">
            Khurai Jewels specializes in sourcing brand new luxury jewelry directly from trusted wholesale dealers. We purchase in bulk from verified suppliers to bring you stunning pieces at competitive prices.
          </p>
          <p className="text-white-60 text-lg font-light leading-relaxed text-center max-w-3xl mx-auto mt-6">
            All our jewelry is brand new and sourced directly from wholesale markets, ensuring authentic quality pieces at exceptional value.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-white text-xs font-medium tracking-[0.3em] uppercase">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl text-white font-light mt-3">The Khurai Advantage</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <span className="text-3xl mb-4 block">💎</span>
              <h3 className="text-white text-lg font-medium mb-2">Brand New Quality</h3>
              <p className="text-white-60 font-light text-sm">
                All jewelry is brand new, directly sourced from wholesale dealers.
              </p>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <span className="text-3xl mb-4 block">💰</span>
              <h3 className="text-white text-lg font-medium mb-2">Wholesale Prices</h3>
              <p className="text-white-60 font-light text-sm">
                Bulk sourcing from dealers means competitive pricing for you.
              </p>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <span className="text-3xl mb-4 block">🔍</span>
              <h3 className="text-white text-lg font-medium mb-2">Verified Suppliers</h3>
              <p className="text-white-60 font-light text-sm">
                We work only with trusted wholesale dealers for authentic pieces.
              </p>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <span className="text-3xl mb-4 block">📦</span>
              <h3 className="text-white text-lg font-medium mb-2">Secure Shopping</h3>
              <p className="text-white-60 font-light text-sm">
                Every purchase includes secure shipping and insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-20 bg-[#7a4538]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-white text-xs font-medium tracking-[0.3em] uppercase">Leadership</span>
            <h2 className="text-2xl sm:text-3xl text-white font-light mt-3">Meet the Visionary</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image with decorative elements */}
            <div className="relative">
              <img 
                src="/founder.jpg" 
                alt="Thasni Hameed" 
                className="relative w-48 h-48 mx-auto rounded-full object-cover shadow-2xl border-4 border-white/20"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-2xl font-medium">Thasni Hameed</h3>
                <p className="text-white-50 mt-1">Founder & Visionary</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-white-70 font-light text-lg leading-relaxed">
                  "I believed that everyone deserves to shine without breaking the bank."
                </p>
                <p className="text-white-60 font-light leading-relaxed">
                  Starting with a simple idea in 2026 from Kochi, I set out to change how people experience luxury jewelry. By building direct relationships with wholesale dealers, we cut out the middlemen to bring you stunning pieces at fair prices.
                </p>
                <p className="text-white-60 font-light leading-relaxed">
                  Every piece in our collection is handpicked with love, ensuring it meets our promise of quality, authenticity, and timeless elegance.
                </p>
              </div>
              
              {/* Decorative quote */}
              <div className="pt-4 border-t border-white/20">
                <p className="text-white-50 italic text-sm">
                  "Elegance is not about being noticed, it's about being remembered."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 sm:py-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white text-xs font-medium tracking-[0.3em] uppercase">Our Promise</span>
          <h2 className="text-2xl sm:text-3xl text-white font-light mt-3 mb-8">What We Promise</h2>
          <p className="text-white-60 text-lg font-light leading-relaxed">
            We are committed to offering authentic brand new jewelry sourced directly from wholesale dealers. Every piece is quality-checked to ensure you receive beautiful, genuine jewelry.
          </p>
          <p className="text-white-60 text-lg font-light leading-relaxed mt-6">
            At Khurai Jewels, luxury meets affordability.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#7a4538]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl text-white font-light mb-6">Explore Our Collection</h2>
          <a 
            href="/products"
            className="inline-flex items-center gap-3 bg-[#9b5a4a] text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-opacity"
          >
            Shop Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}