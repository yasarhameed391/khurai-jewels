'use client';

import { useEffect, useState, createContext, useContext } from 'react';

interface SnackbarType {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

function SnackbarComponent() {
  const [snackbar, setSnackbar] = useState<SnackbarType | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setSnackbar({ message: e.detail.message, type: e.detail.type || 'info' });
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setSnackbar(null), 300);
      }, 3000);
    };
    window.addEventListener('snackbar', handler as any);
    return () => window.removeEventListener('snackbar', handler as any);
  }, []);

  if (!snackbar) return null;

  const bgColors = {
    success: 'bg-green-800',
    error: 'bg-red-800',
    info: 'bg-[#8F4B43]',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`${bgColors[snackbar.type]} text-[#F5EDE6] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3`}>
        <span className="font-medium">{snackbar.message}</span>
      </div>
    </div>
  );
}

export function showSnackbar(message: string, type: 'success' | 'error' | 'info' = 'info') {
  window.dispatchEvent(new CustomEvent('snackbar', { detail: { message, type } }));
}

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarComponent />
    </SnackbarContext.Provider>
  );
}