'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCartCount, getStoredUser, logout, isAdmin, getWishlistCount } from '@/lib/api';
import Tooltip from './Tooltip';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<any>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setUser(getStoredUser());
  }, [pathname]);

  useEffect(() => {
    setCartCount(getCartCount());
    setWishlistCount(getWishlistCount());
    const handleStorage = () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlistCount());
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('cartUpdated', handleStorage);
    window.addEventListener('wishlistUpdated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cartUpdated', handleStorage);
      window.removeEventListener('wishlistUpdated', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;
  const isHomePage = pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage 
          ? 'bg-[#9b5a4a]/95 backdrop-blur-xl shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="Khurai Jewels" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="relative py-2 group"
                >
                  <span 
                    className={`text-sm tracking-wide uppercase transition-colors duration-300 ${
                      isActive(link.path) 
                        ? 'text-white' 
                        : 'text-white-70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                      isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Tooltip content="Search">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 text-white-60`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </Tooltip>

            <Tooltip content={`Wishlist (${wishlistCount} items)`}>
              <Link 
                href="/wishlist" 
                className={`relative p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 text-white-60`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-medium rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
            </Tooltip>

            <Tooltip content={`Cart (${cartCount} items)`}>
              <Link 
                href="/cart" 
                className={`relative p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 text-white-60`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </Tooltip>

            {user ? (
              <div className="relative group">
                <button className="p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 text-white-60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#7a4538] border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-white/20">
                    <p className="text-white text-sm">{user.name}</p>
                    <p className="text-white-50 text-xs">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-3 py-2 text-white-70 hover:text-white hover:bg-white/10 text-sm">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/account/orders" className="block px-3 py-2 text-white-70 hover:text-white hover:bg-white/10 text-sm">
                    My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-white-70 hover:text-white hover:bg-white/10 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Tooltip content="Login">
                <Link 
                  href="/login" 
                  className="p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 text-white-60"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </Tooltip>
            )}

            <Tooltip content="Menu">
              <button 
                className="lg:hidden p-2.5 rounded-full transition-all duration-300 hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${
          isSearchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for jewelry..."
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-5 text-white placeholder-white-50 focus:outline-none focus:border-white"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white-60 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-white/10 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block py-3 px-2 text-sm tracking-wide uppercase rounded-lg transition-colors ${
                  isActive(link.path) 
                    ? 'text-white bg-white/10' 
                    : 'text-white-70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}