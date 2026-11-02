import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© RentBox 24/7. Автоматизований прокат інструментів.</p>
        <p className="flex items-center gap-1.5 text-slate-400">
          <Cpu className="w-4 h-4 text-amber-500" />
        </p>
      </div>
    </footer>
  );
}