import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-slate-800/90 via-slate-800/50 to-slate-900/90 border border-slate-700/70 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Постамат онлайн 24/7: м. Львів, вул С. Бандери 12, вул. Городоцька 123, вул. В. Великого 45
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Автономний прокат <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            професійного інструменту
          </span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Бронюйте обладнання онлайн, сплачуйте оренду з холдуванням застави та відчиняйте смарт-комірки через Wi-Fi точку доступу.
        </p>
        <div className="pt-2">
          <PrimaryButton onClick={() => navigate('/catalog')}>
            Перейти до каталогу
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}