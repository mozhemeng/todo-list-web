import React, { useState } from 'react'
import { Layout, Menu, Typography, Button } from 'antd'
import { 
  UnorderedListOutlined, 
  ClockCircleOutlined, 
  SafetyOutlined, 
  BranchesOutlined, 
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import './App.css'
import TodoList from './components/TodoList'
import TimestampConverter from './components/TimestampConverter'
import JsonFormatter from './components/JsonFormatter'
import Base64Converter from './components/Base64Converter'
import HashCalculator from './components/HashCalculator'

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

function App() {
  // 状态管理
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');

  // 渲染TodoList组件
  const renderTodoList = () => {
    return <TodoList />;
  };

  // 渲染其他功能组件
  const renderTimestampConverter = () => (
    <TimestampConverter />
  );

  const renderJsonFormatter = () => (
    <JsonFormatter />
  );

  const renderBase64Converter = () => (
    <Base64Converter />
  );

  const renderHashCalculator = () => (
    <HashCalculator />
  );

  // 根据选中的菜单项渲染对应的组件
  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return renderTodoList();
      case '2':
        return renderTimestampConverter();
      case '3':
        return renderJsonFormatter();
      case '4':
        return renderBase64Converter();
      case '5':
        return renderHashCalculator();
      default:
        return renderTodoList();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="logo" style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            {collapsed ? '工具' : '工具集'}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenu]}
          onClick={e => setSelectedMenu(e.key)}
          items={[
            {
              key: '1',
              icon: <UnorderedListOutlined />,
              label: '代办清单',
            },
            {
              key: '2',
              icon: <ClockCircleOutlined />,
              label: '时间戳转换',
            },
            {
              key: '3',
              icon: <BranchesOutlined />,
              label: 'JSON格式化',
            },
            {
              key: '4',
              icon: <FileTextOutlined />,
              label: 'Base64编解码',
            },
            {
              key: '5',
              icon: <SafetyOutlined />,
              label: '哈希计算',
            },
          ]}
        />
        <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
          <Button
            type="primary"
            shape="circle"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px' }}
          />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)' }}>
        </Header>
        <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
          {renderContent()}
        </Content>
        <Footer style={{ textAlign: 'center', background: '#fff' }}>
          <Text type="secondary">管理系统 ©{new Date().getFullYear()} Created with Ant Design</Text>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
