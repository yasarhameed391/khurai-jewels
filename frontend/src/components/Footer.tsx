'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#5C2E28] text-[#F5EDE6]/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* SHOP Column */}
          <div>
            <h3 className="text-[#F5EDE6] text-sm font-medium uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products?category=charms" className="hover:text-[#F5EDE6] transition-colors">Charms</Link></li>
              <li><Link href="/products?category=bracelets" className="hover:text-[#F5EDE6] transition-colors">Bracelets</Link></li>
              <li><Link href="/products?category=necklaces" className="hover:text-[#F5EDE6] transition-colors">Necklaces</Link></li>
              <li><Link href="/products?category=rings" className="hover:text-[#F5EDE6] transition-colors">Rings</Link></li>
              <li><Link href="/products?category=earrings" className="hover:text-[#F5EDE6] transition-colors">Earrings</Link></li>
              <li><Link href="/products?collection=pandora" className="hover:text-[#F5EDE6] transition-colors">Khurai Collections</Link></li>
              <li><Link href="/products?category=gifts" className="hover:text-[#F5EDE6] transition-colors">Gifts</Link></li>
            </ul>
          </div>

          {/* RESOURCES Column */}
          <div>
            <h3 className="text-[#F5EDE6] text-sm font-medium uppercase tracking-wider mb-6">Resources</h3>
             <ul className="space-y-3">
               <li><Link href="/account/orders" className="hover:text-[#F5EDE6] transition-colors">Check Order Status</Link></li>
               <li><Link href="/shipping" className="hover:text-[#F5EDE6] transition-colors">Shipping</Link></li>
               <li><Link href="/refund" className="hover:text-[#F5EDE6] transition-colors">Returns & Exchanges</Link></li>
               <li><Link href="/contact" className="hover:text-[#F5EDE6] transition-colors">Contact Us</Link></li>
             </ul>
          </div>

          {/* ABOUT US Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Khurai Jewels"
                className="h-10 w-auto object-contain"
              />
              <span className="text-[#F5EDE6] text-sm font-medium uppercase tracking-widest">KHURAI JEWELS</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Discover premium handcrafted jewelry from Khurai Jewels. Adorn Your Everyday with our exclusive collection.
            </p>
            <Link href="/about" className="text-[#F5EDE6] hover:text-[#F5EDE6]/80 text-sm transition-colors mb-6 inline-block">
              About Khurai Jewels
            </Link>
            <div className="flex items-center gap-4 mt-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61588981135919" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5EDE6]/70 hover:text-[#F5EDE6] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/khuraijewels" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5EDE6]/70 hover:text-[#F5EDE6] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 3.838a8.162 8.162 0 100 16.324 8.162 8.162 0 000-16.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#F5EDE6]/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Khurai Jewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
