import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import Features from '../components/Features';
import PrimaryButton from '../components/PrimaryButton';

export default function HomePage() {
  // Требование Лаб 8: кнопка «View more» добавляет элементы на страницу
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-8">
      <HeroBanner />
      <Features />

      <section className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-center space-y-4">
        <h3 className="text-base font-bold text-white">Як працює автономний постамат?</h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Після вибору інструментів та оплати через сайт ви отримуєте персональний PIN-код. Підійдіть до комірки, підключіться до її Wi-Fi та натисніть кнопку відкриття.
        </p>

        {showMore && (
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <b className="text-amber-400">1. Застава:</b> Банк заморожує кошти на вашій картці без списання.
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <b className="text-emerald-400">2. Повернення:</b> Ви кладете інструмент назад, робите фото, майстер перевіряє стан і кошти розморожуються.
            </div>
          </div>
        )}

        <div>
          <PrimaryButton onClick={() => setShowMore(!showMore)}>
            {showMore ? "Приховати деталі" : "Переглянути більше"}
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}