import React from 'react';
import { WifiOff, ShieldCheck, Camera } from 'lucide-react';

export default function Features() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
          <WifiOff className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white"> SoftAP</h4>
          <p className="text-[11px] text-slate-400">Відкриття без зовнішнього інтернету</p>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">Холдування застави</h4>
          <p className="text-[11px] text-slate-400">Розблокування після огляду за 1–2 дні</p>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">Фотофіксація</h4>
          <p className="text-[11px] text-slate-400">Контроль комплектації при поверненні</p>
        </div>
      </div>
    </section>
  );
}