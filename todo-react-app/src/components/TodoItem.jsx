import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await onUpdate({ ...todo, completed: !todo.completed });
    setLoading(false);
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (editTitle.trim()) {
        setLoading(true);
        await onUpdate({ ...todo, title: editTitle.trim() });
        setLoading(false);
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditTitle(todo.title);
    }
  };

  const handleDelete = async () => {
    if (confirm('Bu görevi silmek istiyor musunuz?')) {
      setLoading(true);
      await onDelete(todo.id);
      setLoading(false);
    }
  };

  return (
    <div className={`group p-6 rounded-3xl shadow-md hover:shadow-xl transition-all border-l-8 ${
      todo.completed ? 'border-emerald-500 bg-emerald-50/30' : 'border-blue-500 bg-white'
    } dark:bg-slate-800 ${loading ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
            todo.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-200'
          }`}
        >
          {todo.completed && '✓'}
        </button>
        
        <div className="flex-1">
          {isEditing ? (
            <input
              autoFocus
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              className="w-full bg-blue-50 dark:bg-slate-700 p-2 rounded-lg outline-none font-bold"
            />
          ) : (
            <span className={`text-lg font-bold ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'}`}>
              {todo.title}
            </span>
          )}
          <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
            {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleEdit} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">✏️</button>
          <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">🗑️</button>
        </div>
      </div>
    </div>
  );
}