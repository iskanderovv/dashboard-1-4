import { Layout, Menu, Typography } from 'antd';
const { Sider } = Layout;
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const SiderComponent = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
     
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: <NavLink end className="nav-link" to="/dashboard">Products</NavLink>,
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <NavLink end className="nav-link" to="/dashboard/users">Users</NavLink>,
          },
        ]}
      />
    </Sider>
  );
};

export default SiderComponent;
