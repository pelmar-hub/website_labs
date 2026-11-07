import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function FormError({ children }) {
  if (!children) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-rose-400 font-medium">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}