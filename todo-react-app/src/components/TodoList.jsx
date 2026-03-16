import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, onDelete }) {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-blue-100 dark:border-slate-700 shadow-sm">
        <div className="text-center">
          <div className="text-3xl font-black text-blue-600">{totalCount}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Toplam</div>
        </div>
        <div className="text-center border-x border-blue-200 dark:border-slate-700">
          <div className="text-3xl font-black text-emerald-500">{completedCount}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Biten</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-orange-500">{totalCount - completedCount}</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kalan</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-700 dark:text-gray-200 text-lg">İlerleme</span>
          <span className="text-blue-600 font-black">%{Math.round(progress)}</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-slate-700 h-4 rounded-full overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Todo List Items */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-300 dark:border-slate-700">
            <h3 className="text-xl font-bold text-gray-400">Henüz yapılacak bir şey yok! ☕</h3>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
}