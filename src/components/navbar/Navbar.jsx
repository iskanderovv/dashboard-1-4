import { Avatar, Menu, Layout, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';

const { Header } = Layout;
const { Search } = Input;


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
  const [data, loading] = useFetch("/auth/profile");

  console.log(data);

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
        <div className='flex items-center gap-2'>
          <Avatar size="large" style={{ backgroundColor: '#87d068', cursor: 'pointer' }}>
            {loading ? <UserOutlined /> : data?.first_name.at(0).toUpperCase()}
          </Avatar>
          <span className='text-white text-[17px]'>{ loading ? "User": data?.first_name.at(0).toUpperCase() + data?.first_name.slice(1).toLowerCase() }</span>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
