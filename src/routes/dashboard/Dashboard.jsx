import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import SiderComponent from '../../components/sider/Sider';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout>
      <SiderComponent collapsed={collapsed} />
        <div style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: 24,
          minHeight: 580,
          margin: '38px',
          width: '100%'
        }}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
