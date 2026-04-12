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
    <div className="min-h-screen bg-[#7a4538] pt-28 pb-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-white font-light">Welcome Back</h1>
            <p className="text-white-60 mt-2">Sign in to your account</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                !isAdmin ? 'bg-[#9b5a4a] text-white hover:bg-[#7a4538]' : 'bg-white/20 text-white-60 hover:text-white hover:bg-white/10'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                isAdmin ? 'bg-[#9b5a4a] text-white hover:bg-[#7a4538]' : 'bg-white/20 text-white-60 hover:text-white hover:bg-white/10'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white-60 text-sm mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white-60 text-sm mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9b5a4a] text-white py-4 font-medium uppercase tracking-wider hover:bg-[#7a4538] transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {!isAdmin && (
            <div className="mt-6 text-center">
              <p className="text-white-60">
                Don't have an account?{' '}
                <Link href="/register" className="text-white hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-zinc-500 hover:text-white text-sm">
              Continue as Guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}