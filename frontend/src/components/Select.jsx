import React from 'react';

export default function Select({ options, value, onChange, label, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-amber-500 transition cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}