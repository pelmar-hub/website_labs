import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toolsApi } from '../api/toolsApi';
import Loader from '../components/Loader';
import PrimaryButton from '../components/PrimaryButton';
import { Cpu, ShieldCheck, ArrowLeft, CheckCircle2, Wifi, Wrench } from 'lucide-react';

export default function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  // Отримання даних товару з REST API через Axios (Вимога Лаб 9)
  useEffect(() => {
    setLoading(true);
    toolsApi.getToolById(id)
      .then((data) => setTool(data))
      .catch((err) => console.error("Помилка завантаження інструмента:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loader text="Отримання статусу комірки з сервера..." />;
  }

  if (!tool) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-white">Інструмент не знайдено</h2>
        <p className="text-xs text-slate-400">Можливо, комірку постамату було змінено.</p>
        <PrimaryButton onClick={() => navigate('/catalog')}>
          Повернутися до каталогу
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/catalog')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад до каталогу</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-800/40 border border-slate-700/60 p-6 sm:p-8 rounded-3xl">
        <div className="space-y-4">
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={tool.imageUrl}
              alt={tool.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-slate-900/90 text-emerald-400 font-mono text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Комірка постамату #{tool.boxId}
            </span>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-amber-500" /> Спосіб видачі:
            </span>
            <span className="font-mono text-slate-200">ESP32 SoftAP (Автономно 24/7)</span>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              {tool.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {tool.title}
            </h1>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" /> Технічні характеристики
              </h4>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                {tool.specs}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Пройшов регламентне сервісне обслуговування</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Фотофіксація стану перед видачею</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Холдування застави на картці клієнта на період оренди</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-700/80 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 block">Оренда (за 1 добу):</span>
                <span className="text-xl font-mono font-extrabold text-white">{tool.dayPrice} грн</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-amber-400 flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3.5 h-3.5" /> Сума застави:
                </span>
                <span className="text-xl font-mono font-extrabold text-amber-400">{tool.depositPrice} грн</span>
              </div>
            </div>

            <PrimaryButton 
              onClick={() => navigate('/catalog')}
              className="w-full py-3 text-center"
            >
              Перейти до каталогу
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}