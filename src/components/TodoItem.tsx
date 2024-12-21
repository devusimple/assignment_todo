import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { Trash2, Edit, Check, X, Save } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:text-green-700"
          >
            <Save size={20} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-600 hover:text-gray-700"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </>
      )}
    </div>
  );
}