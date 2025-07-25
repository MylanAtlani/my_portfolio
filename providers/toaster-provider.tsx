'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toaster toasts={toast.toasts} onRemove={toast.removeToast} />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToasterProvider');
  }
  return context;
}
