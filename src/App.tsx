import React, { useState } from 'react'
import { Layout, Menu, Typography, Button } from 'antd'
import { 
  UnorderedListOutlined, 
  AppstoreOutlined, 
  SettingOutlined, 
  BarChartOutlined, 
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import './App.css'
import TodoList from './components/TodoList'

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

  // 渲染其他预留功能组件
  const renderDashboard = () => (
    <div style={{ padding: '24px', background: 'white', minHeight: '300px', borderRadius: '4px' }}>
      <Title level={3}>仪表盘</Title>
      <Text>这里将显示系统概览和统计数据</Text>
    </div>
  );

  const renderDataAnalysis = () => (
    <div style={{ padding: '24px', background: 'white', minHeight: '300px', borderRadius: '4px' }}>
      <Title level={3}>数据分析</Title>
      <Text>这里将显示数据分析图表和报表</Text>
    </div>
  );

  const renderUserManagement = () => (
    <div style={{ padding: '24px', background: 'white', minHeight: '300px', borderRadius: '4px' }}>
      <Title level={3}>用户管理</Title>
      <Text>这里将显示用户管理界面</Text>
    </div>
  );

  const renderSettings = () => (
    <div style={{ padding: '24px', background: 'white', minHeight: '300px', borderRadius: '4px' }}>
      <Title level={3}>系统设置</Title>
      <Text>这里将显示系统设置选项</Text>
    </div>
  );

  // 根据选中的菜单项渲染对应的内容
  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return renderTodoList();
      case '2':
        return renderDashboard();
      case '3':
        return renderDataAnalysis();
      case '4':
        return renderUserManagement();
      case '5':
        return renderSettings();
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
              label: '待办事项',
            },
            {
              key: '2',
              icon: <AppstoreOutlined />,
              label: '仪表盘',
            },
            {
              key: '3',
              icon: <BarChartOutlined />,
              label: '数据分析',
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: '用户管理',
            },
            {
              key: '5',
              icon: <SettingOutlined />,
              label: '系统设置',
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
