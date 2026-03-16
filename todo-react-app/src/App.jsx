import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { todoApi } from './services/todoApi.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMode, setApiMode] = useState(false); // API/Local toggle

  // API'den todos yükle
  const loadTodos = async () => {
    setLoading(true);
    const apiTodos = await todoApi.fetchTodos();
    setTodos(apiTodos);
    setLoading(false);
  };

  // LocalStorage yükle
  const loadLocalTodos = () => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  };

  useEffect(() => {
    if (apiMode) {
      loadTodos();
    } else {
      loadLocalTodos();
    }
  }, [apiMode]);

  // LocalStorage sync (sadece local modda)
  useEffect(() => {
    if (!apiMode) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, apiMode]);

  const addTodo = async (newTodo) => {
    if (apiMode) {
      const createdTodo = await todoApi.createTodo(newTodo);
      setTodos(prev => [createdTodo, ...prev]);
    } else {
      const todoWithId = { ...newTodo, id: crypto.randomUUID() };
      setTodos(prev => [todoWithId, ...prev]);
    }
  };

  const updateTodo = async (updatedTodo) => {
    if (apiMode) {
      await todoApi.updateTodo(updatedTodo);
    }
    setTodos(prev => prev.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const deleteTodo = async (id) => {
    if (apiMode) {
      await todoApi.deleteTodo(id);
    }
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleApiMode = () => {
    setApiMode(!apiMode);
  };

  if (loading && apiMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">API'den todos yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border mb-8 text-4xl font-bold bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent">
            <div className={`w-3 h-3 rounded-full animate-pulse ${apiMode ? 'bg-green-400' : 'bg-blue-400'}`}></div>
            Todo App {apiMode ? '(API)' : '(Local)'}
          </h1>
          
          {/* API/Local Toggle */}
          <button
            onClick={toggleApiMode}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              apiMode
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {apiMode ? '🔌 API Modu' : '💾 Local Mod'}
          </button>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
            {apiMode ? 'JSONPlaceholder API ile gerçek CRUD' : 'LocalStorage ile offline çalışma'}
          </p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
          <TodoForm onAddTodo={addTodo} />
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        </div>

        {/* API Status */}
        {apiMode && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
            <strong>API Status:</strong> ✅ JSONPlaceholder ile bağlı (Fake data)
            <br />
            <small>POST/PUT/DELETE işlemleri simüle ediliyor</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;