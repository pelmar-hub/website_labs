import React from 'react';

export default function PrimaryButton({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/10 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}