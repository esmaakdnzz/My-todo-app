// src/services/todoApi.js
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const todoApi = {
  async fetchTodos() {
    try {
      const response = await fetch(API_URL);
      const todos = await response.json();
      return todos.slice(0, 10).map(todo => ({
        id: todo.id.toString(),
        title: todo.title,
        completed: todo.completed,
        createdAt: new Date().toISOString()
      }));
    } catch {
      return [];
    }
  },

  async createTodo(todo) {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
    } catch {}
    return { ...todo, id: crypto.randomUUID() };
  },

  async updateTodo(todo) {
    try {
      await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
    } catch {}
  },

  async deleteTodo(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch {}
  }
};