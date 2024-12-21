import React, { useState } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { CheckSquare } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center gap-3">
            <CheckSquare size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
          </div>
          
          <TodoInput onAdd={addTodo} />
          
          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No todos yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;