import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, ShoppingBag, LogOut } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const rawUser = localStorage.getItem('mb_user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('mb_user');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Box className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">
            Rent<span className="text-amber-500">Box</span>
          </span>
        </Link>

        {user && (
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-xs font-semibold text-slate-300 hover:text-white transition">
              Головна
            </Link>
            <Link to="/catalog" className="text-xs font-semibold text-slate-300 hover:text-white transition">
              Каталог
            </Link>
            <Link to="/cart" className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 transition">
              <ShoppingBag className="w-4 h-4" />
              <span>Кошик</span>
            </Link>
            <button
              onClick={handleLogout}
              title="Вийти з акаунта"
              className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-xl border border-slate-700 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}