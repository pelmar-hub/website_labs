import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Lock, User, Phone } from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone) return alert('Введіть номер телефону');

    // Зберігаємо сесію користувача у LocalStorage (вимога Лаб 12)
    const userData = {
      phone,
      name: name || 'Клієнт МайстерБокс',
      token: 'jwt_mock_' + Math.random().toString(36).substring(2)
    };
    localStorage.setItem('mb_user', JSON.stringify(userData));

    // Після входу перенаправляємо на головну сторінку
    navigate('/');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto font-black">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Реєстрація та Вхід</h2>
          <p className="text-xs text-slate-400">
            Для доступу до каталогу постамату необхідно вказати свій номер телефону
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Ваше ім'я
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Олександр Коваль"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Номер телефону *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                placeholder="+380 67 677 67 69"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition font-mono"
              />
            </div>
          </div>

          <PrimaryButton type="submit" className="w-full py-3 mt-2">
            Увійти та перейти до комірок
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}