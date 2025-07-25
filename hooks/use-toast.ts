import { useState, useCallback } from 'react';
import { Toast, ToastType } from '@/components/ui/toaster';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      type,
      message,
      duration
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message: string) => {
    addToast('success', message);
  }, [addToast]);

  const showError = useCallback((message: string) => {
    addToast('error', message);
  }, [addToast]);

  const showInfo = useCallback((message: string) => {
    addToast('info', message);
  }, [addToast]);

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    showInfo
  };
}