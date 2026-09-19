import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'success', duration = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, message, type };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let iconColor = 'text-[#D61C7C]';
          let borderClass = 'border-[#F8BBD0]';

          if (toast.type === 'wishlist') {
            Icon = Heart;
            iconColor = 'text-rose-500 fill-rose-500';
          } else if (toast.type === 'cart') {
            Icon = ShoppingBag;
            iconColor = 'text-[#D61C7C]';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-sky-500';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto bg-white/95 backdrop-blur-md border ${borderClass} shadow-xl rounded-2xl p-4 flex items-start gap-3 transform transition-all duration-300 animate-slide-up`}
            >
              <div className="p-2 rounded-full bg-[#FFF0F5] shrink-0">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1 pt-0.5">
                {toast.title && (
                  <h4 className="text-sm font-semibold text-stone-900 tracking-tight">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-stone-600 transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
