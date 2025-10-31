import { useState, useEffect } from 'react'
import './App.css'

// 定义Todo项的接口
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
}

function App() {
  // 状态管理
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('无法从本地存储加载数据:', error);
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');

  // 保存todos到本地存储
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('无法保存数据到本地存储:', error);
    }
  }, [todos]);

  // 添加新的todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: Date.now(),
        completedAt: null
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // 切换todo的完成状态
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed, 
              completedAt: !todo.completed ? Date.now() : null 
            } 
          : todo
      )
    );
  };

  // 删除todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return '未知';
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? '未知' : date.toLocaleString();
  };

  return (
    <div className="todo-app">
      <h1>今日代办</h1>
      <p className="current-date">{new Date().toLocaleDateString()}</p>
      
      {/* 添加新任务的表单 */}
      <div className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加新任务..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>添加</button>
      </div>
      
      {/* Todo列表 */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="todo-item">
              <span 
                onClick={() => toggleTodo(todo.id)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>删除</button>
            </div>
            <div className="todo-timestamps">
              <p>创建于: {formatDate(todo.createdAt)}</p>
              {todo.completedAt && <p>完成于: {formatDate(todo.completedAt)}</p>}
            </div>
          </li>
        ))}
      </ul>
      
      {/* 任务统计 */}
      <div className="todo-stats">
        <p>总任务: {todos.length} | 已完成: {todos.filter(todo => todo.completed).length}</p>
      </div>
    </div>
  )
}

export default App
