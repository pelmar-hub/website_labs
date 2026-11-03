import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { Cpu, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function ToolCard({ tool, onAddToCart, isInCart }) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition duration-300">
      <div>
        <div className="relative h-44 rounded-2xl overflow-hidden mb-3 bg-slate-950">
          <img
            src={tool.imageUrl}
            alt={tool.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2.5 right-2.5 bg-slate-900/90 text-emerald-400 font-mono text-[11px] font-bold px-2.5 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1 shadow-lg">
            <Cpu className="w-3 h-3 text-emerald-400" />
            Комірка #{tool.boxId}
          </span>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
          {tool.category}
        </span>

        <h3 className="font-bold text-sm text-white mt-2 leading-snug">{tool.title}</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">{tool.specs}</p>

        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">Оренда за добу:</span>
            <p className="font-bold font-mono text-white text-sm">{tool.dayPrice} грн</p>
          </div>
          <div className="text-right">
            <span className="text-amber-400 text-[10px] flex items-center gap-1 justify-end">
              <ShieldCheck className="w-3 h-3" /> Застава:
            </span>
            <p className="font-bold font-mono text-amber-400 text-sm">{tool.depositPrice} грн</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 flex flex-col gap-2">
        <button
          onClick={() => onAddToCart && onAddToCart(tool)}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            isInCart
              ? "bg-slate-700 text-amber-400 border border-amber-500/30"
              : "bg-amber-500 hover:bg-amber-400 text-slate-950"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isInCart ? "У кошику (Видалити)" : "Додати в кошик"}</span>
        </button>

        {/* Перехід на сторінку товару за ID */}
        <PrimaryButton 
          onClick={() => navigate(`/item/${tool.id}`)}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shadow-none"
        >
          Переглянути деталі
        </PrimaryButton>
      </div>
    </div>
  );
}