import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateDays } from '../redux/actions';
import PrimaryButton from '../components/PrimaryButton';
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag, Cpu } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Підрахунок сум
  const totalRent = cartItems.reduce((acc, item) => acc + item.dayPrice * item.days, 0);
  const totalDeposit = cartItems.reduce((acc, item) => acc + item.depositPrice, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-800 space-y-4 max-w-xl mx-auto p-8">
        <div className="w-14 h-14 bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-white">Кошик замовлень порожній</h2>
        <p className="text-xs text-slate-400">
          Ви ще не обрали інструменти для бронювання комірок постамату.
        </p>
        <div className="pt-2">
          <PrimaryButton onClick={() => navigate('/catalog')}>
            Перейти до каталогу
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-800/40 border border-slate-700/50 p-5 rounded-3xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Кошик бронювання</h2>
          <p className="text-xs text-slate-400">
            Кількість обраних комірок: {cartItems.length} шт.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список обраних товарів */}
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-950 border border-slate-800"
                />
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Комірка #{item.boxId}
                  </span>
                  <h4 className="font-bold text-sm text-white mt-1">{item.title}</h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    {item.dayPrice} грн/доба | Застава: {item.depositPrice} грн
                  </p>
                </div>
              </div>

              {/* Зміна кількості діб оренди */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
                  <button
                    onClick={() => dispatch(updateDays(item.id, item.days - 1))}
                    disabled={item.days <= 1}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white">
                    {item.days} дн.
                  </span>
                  <button
                    onClick={() => dispatch(updateDays(item.id, item.days + 1))}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="font-mono font-bold text-sm text-white block">
                    {item.dayPrice * item.days} грн
                  </span>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-2 text-slate-500 hover:text-rose-400 transition"
                  title="Видалити"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Фінансовий підсумок */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 h-fit space-y-4">
          <h3 className="font-bold text-base text-white border-b border-slate-700/60 pb-3">
            Розрахунок вартості
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Вартість оренди:</span>
              <span className="font-mono font-bold text-white">{totalRent} грн</span>
            </div>
            <div className="flex justify-between text-amber-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Застава (холдується):
              </span>
              <span className="font-mono font-bold">{totalDeposit} грн</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-700/60 flex justify-between items-baseline">
            <span className="text-xs text-slate-400 font-bold uppercase">Разом до авторизації:</span>
            <span className="text-xl font-mono font-black text-white">
              {totalRent + totalDeposit} грн
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            * Сума застави тимчасово заморожується на картці та повертається протягом 1–2 днів після перевірки повернення.
          </p>

          <PrimaryButton
            onClick={() => navigate('/checkout')}
            className="w-full py-3 flex items-center justify-center gap-2 mt-2"
          >
            <span>Перейти до оформлення</span>
            <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}