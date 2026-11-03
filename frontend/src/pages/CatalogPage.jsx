import React, { useState, useEffect } from 'react';
import { toolsApi } from '../api/toolsApi';
import ToolCard from '../components/ToolCard';
import Select from '../components/Select';
import Loader from '../components/Loader';
import { Layers, Search } from 'lucide-react';

export default function CatalogPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartIds, setCartIds] = useState([]);

  const categoryOptions = [
    { value: 'all', label: 'Усі категорії' },
    { value: 'Перфоратори', label: 'Перфоратори' },
    { value: 'Вимірювальні', label: 'Вимірювальні' },
    { value: 'Клінінг', label: 'Клінінг' },
    { value: 'Шліфувальні', label: 'Шліфувальні' },
    { value: 'Шуруповерти', label: 'Шуруповерти' },
  ];

  // Завантаження товарів з бекенду через axios (Вимога Лаб 9)
  useEffect(() => {
    setLoading(true);
    toolsApi.getTools(selectedCategory)
      .then((data) => setTools(data))
      .catch((err) => console.error("Помилка завантаження:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleToggleCart = (tool) => {
    setCartIds((prev) =>
      prev.includes(tool.id)
        ? prev.filter((id) => id !== tool.id)
        : [...prev, tool.id]
    );
  };

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.specs.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-3xl">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Каталог постамату (REST API)</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">Доступне обладнання</h2>
        <p className="text-xs text-slate-400">
          Дані надходять з REST API сервера через Axios із фільтрацією в URL-параметрах
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-800/20 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-2 relative">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Швидкий пошук:
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Введіть назву інструмента..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div>
          <Select
            label="Категорія:"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Відображення Loader під час виконання GET-запиту (Вимога Лаб 9) */}
      {loading ? (
        <Loader />
      ) : filteredTools.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/30 rounded-3xl border border-slate-800 text-slate-400 text-sm">
          Інструментів у даній категорії за вашим запитом не знайдено.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onAddToCart={handleToggleCart}
              isInCart={cartIds.includes(tool.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}