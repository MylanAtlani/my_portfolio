'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToasterProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function Toaster({ toasts, onRemove }: ToasterProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 mb-10">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10 text-green-400';
      case 'error':
        return 'border-red-500/20 bg-red-500/10 text-red-400';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-400';
      default:
        return 'border-gray-500/20 bg-gray-500/10 text-gray-400';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`nothing-glass rounded-xl p-4 border backdrop-blur-sm transition-all duration-300 min-w-[300px] max-w-[500px] ${getToastStyles()}`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <span className="nothing-text text-sm flex-1">{toast.message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className="hover:opacity-70 transition-opacity flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}