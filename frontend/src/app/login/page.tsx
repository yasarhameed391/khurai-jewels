'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, adminLogin, getStoredUser } from '@/lib/api';
import { showSnackbar } from '@/components/Snackbar';

export default function LoginPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isAdmin) {
        await adminLogin(formData.email, formData.password);
        showSnackbar('Admin logged in successfully!', 'success');
        router.push('/admin');
      } else {
        await login(formData.email, formData.password);
        showSnackbar('Logged in successfully!', 'success');
        router.push('/');
      }
    } catch (err: any) {
      showSnackbar(err.message || 'Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#8F4B43] pt-28 pb-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-[#8F4B43]/50/50 rounded-xl border border-[#F5EDE6]/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#F5EDE6] font-light">Welcome Back</h1>
            <p className="text-[#F5EDE6]/60 mt-2">Sign in to your account</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                !isAdmin ? 'bg-[#5C2E28] text-[#F5EDE6] hover:bg-[#5C2E28]' : 'bg-[#F5EDE6]/20 text-[#F5EDE6]/60 hover:text-[#F5EDE6] hover:bg-[#F5EDE6]/10'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                isAdmin ? 'bg-[#5C2E28] text-[#F5EDE6] hover:bg-[#5C2E28]' : 'bg-[#F5EDE6]/20 text-[#F5EDE6]/60 hover:text-[#F5EDE6] hover:bg-[#F5EDE6]/10'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#F5EDE6]/60 text-sm mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#8F4B43]/50 border border-[#F5EDE6]/20 text-[#F5EDE6] px-4 py-3 focus:outline-none focus:border-[#F5EDE6] transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[#F5EDE6]/60 text-sm mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#8F4B43]/50 border border-[#F5EDE6]/20 text-[#F5EDE6] px-4 py-3 focus:outline-none focus:border-[#F5EDE6] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5C2E28] text-[#F5EDE6] py-4 font-medium uppercase tracking-wider hover:bg-[#5C2E28] transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {!isAdmin && (
            <div className="mt-6 text-center">
              <p className="text-[#F5EDE6]/60">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#F5EDE6] hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-[#F5EDE6]/60 hover:text-[#F5EDE6] text-sm">
              Continue as Guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}