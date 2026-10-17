'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-emerald-500/40 bg-zinc-900/95 text-emerald-400';
        let Icon = CheckCircle2;

        if (toast.type === 'error') {
          borderClass = 'border-rose-500/40 bg-zinc-900/95 text-rose-400';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/40 bg-zinc-900/95 text-amber-400';
          Icon = AlertTriangle;
        } else if (toast.type === 'info') {
          borderClass = 'border-blue-500/40 bg-zinc-900/95 text-blue-400';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${borderClass}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              {toast.title && <div className="font-bold text-white mb-0.5">{toast.title}</div>}
              <div className="text-zinc-300 leading-snug">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
