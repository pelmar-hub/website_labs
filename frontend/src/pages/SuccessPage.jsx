import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import { CheckCircle, Key, Wifi, ArrowRight, ShieldAlert } from 'lucide-react';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Замовлення не знайдено</h2>
        <PrimaryButton onClick={() => navigate('/catalog')}>
          Повернутися до каталогу
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-800/40 border border-emerald-500/30 p-8 rounded-3xl text-center space-y-3">
        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
          Оренда успішно оформлена
        </span>
        <h2 className="text-2xl font-extrabold text-white">
          Замовлення #{order.orderId}
        </h2>
        <p className="text-xs text-slate-400">
          Заставу {order.totalDeposit} грн заблоковано. Кошти оренди ({order.totalRent} грн) успішно сплачено.
        </p>
      </div>

      {/* Выдача PIN-кодов к ячейкам */}
      <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
          <Key className="w-4 h-4" />
          <span>Ваші PIN-коди до комірок постамату:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {order.pinCodes.map((pinItem, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] text-slate-400 block truncate font-medium">
                {pinItem.toolTitle}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  Комірка #{pinItem.boxId}
                </span>
                <span className="text-xl font-mono font-black text-amber-400 tracking-widest bg-slate-950 px-3 py-1 rounded-xl border border-amber-500/30">
                  {pinItem.pin}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-white">
            <Wifi className="w-4 h-4 text-amber-400" />
            <span>Інструкція отримання на місці:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
            <li>Підійдіть до постамату «МайстерБокс 24/7».</li>
            <li>Підключіться до локальної Wi-Fi мережі постамату: <b className="text-white font-mono">MasterBox-AP</b>.</li>
            <li>Наберіть свій 4-значний PIN на цифровій клавіатурі потрібної комірки.</li>
            <li>Заберіть інструмент і зачиніть дверцята до характерного клацання замка.</li>
          </ol>
        </div>

        <PrimaryButton
          onClick={() => navigate('/catalog')}
          className="w-full py-3 flex items-center justify-center gap-2"
        >
          <span>Завершити та перейти до каталогу</span>
          <ArrowRight className="w-4 h-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}