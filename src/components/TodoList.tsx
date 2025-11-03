import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Input, 
  List, 
  Checkbox, 
  Space, 
  Card, 
  Tag, 
  Divider,
  Typography
} from 'antd';
import { 
  DeleteOutlined, 
  PlusOutlined
} from '@ant-design/icons';

// 定义Todo项的接口
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
}

const { Title, Text } = Typography;

const TodoList: React.FC = () => {
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

  // 完成所有代办
  const completeAllTodos = () => {
    setTodos(
      todos.map(todo => 
        !todo.completed 
          ? { 
              ...todo, 
              completed: true, 
              completedAt: Date.now() 
            } 
          : todo
      )
    );
  };

  // 删除已完成代办
  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return '未知';
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? '未知' : date.toLocaleString();
  };

  return (
    <div className="content-container">
      <div style={{ background: 'white', padding: '20px', borderRadius: '4px', maxWidth: '800px', margin: '0 auto' }}>
        <Title level={2} style={{ margin: '16px 0', textAlign: 'center' }}>代办清单</Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
          {new Date().toLocaleDateString()}
        </Text>
        
        <Card style={{ marginBottom: 20, background: 'white' }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="添加新任务..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={addTodo}
              size="large"
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={addTodo}
              size="large"
            >
              添加
            </Button>
          </Space.Compact>
        </Card>
        
        <List
          itemLayout="horizontal"
          dataSource={todos}
          bordered
          style={{ background: 'white' }}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => deleteTodo(todo.id)}
                >
                  删除
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Checkbox 
                    checked={todo.completed} 
                    onChange={() => toggleTodo(todo.id)}
                  />
                }
                title={
                  <Text 
                    style={{ 
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      fontSize: '16px'
                    }}
                  >
                    {todo.text}
                  </Text>
                }
                description={
                  <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    <Text type="secondary" style={{ fontSize: '12px', display: 'block', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      创建于: {formatDate(todo.createdAt)}
                    </Text>
                    {todo.completedAt && (
                      <Text type="secondary" style={{ fontSize: '12px', display: 'block', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        完成于: {formatDate(todo.completedAt)}
                      </Text>
                    )}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
        
        <Divider />
        
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <Tag color="blue">总任务: {todos.length}</Tag>
              <Tag color="green">已完成: {todos.filter(todo => todo.completed).length}</Tag>
            </Space>
            <Space>
              <Button 
                type="primary" 
                onClick={completeAllTodos}
                disabled={todos.length === 0 || todos.every(todo => todo.completed)}
              >
                完成所有代办
              </Button>
              <Button 
                danger 
                onClick={deleteCompletedTodos}
                disabled={todos.filter(todo => todo.completed).length === 0}
              >
                删除已完成代办
              </Button>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default TodoList;