import { Avatar, Menu, Layout, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = [
  {
    key: '1',
    label: (
      <NavLink to="/auth">
        Login
      </NavLink>
    ),
  },
  {
    key: '2',
    label: (
      <NavLink to="/auth/register">
        Register
      </NavLink>
    ),
  }
];

const Navbar = ({ collapsed, toggleCollapsed }) => {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className='flex items-center gap-16'>
        <div className="demo-logo" >
          <div className='flex items-center'>
            <span className='text-white text-3xl w-full flex justify-center items-center h-full py-4 font-mono'>Ai.Dev</span>
          </div>
        </div>

        <Button type="primary" onClick={toggleCollapsed} style={{ marginRight: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>


      <Search
        placeholder="Search..."
        allowClear
        onSearch={onSearch}
        style={{
          maxWidth: 600,
        }}
      />

      <div className='flex items-center'>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            minWidth: 200,
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 30
          }}
        />
        <Avatar size="large" style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default Navbar;
