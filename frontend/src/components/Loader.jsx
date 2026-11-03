import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ text = "Завантаження даних із сервера постамату..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      <p className="text-xs font-mono text-slate-400 animate-pulse">{text}</p>
    </div>
  );
}