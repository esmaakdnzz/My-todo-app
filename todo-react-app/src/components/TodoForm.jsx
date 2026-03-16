import { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || title.length > 100) return;

    setLoading(true);
    const newTodo = {
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    await onAddTodo(newTodo);
    setTitle('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 backdrop-blur-sm">
      <div className="flex gap-4 items-stretch">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yeni bir hedef ekleyin..."
          className="flex-1 px-6 py-4 text-lg border-2 border-gray-100 dark:border-slate-600 rounded-2xl focus:border-blue-500 outline-none dark:bg-slate-900 dark:text-white transition-all"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? '...' : '➕ Ekle'}
        </button>
      </div>
    </form>
  );
}