import { Avatar, Menu, Layout, Input, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
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

  const getUserInitial = (name) => {
    return typeof name === 'string' && name.length > 0 ? name.charAt(0).toUpperCase() : 'U';
  };

  const getAvatarColor = (name) => {
    if (typeof name !== 'string' || name.length === 0) return '#87d068';

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 50%, 70%)`;
  };

  const userName = loading ? 'User' : `${data?.first_name?.charAt(0).toUpperCase()}${data?.first_name?.slice(1).toLowerCase()}`;
  const avatarColor = loading ? '#87d068' : getAvatarColor(data?.first_name);


  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className='flex items-center gap-16'>
        <div className="demo-logo">
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
        <Link to='profile' className='flex items-center gap-2'>
          <Avatar size="large" style={{ backgroundColor: avatarColor, cursor: 'pointer' }}>
            {loading ? <UserOutlined /> : getUserInitial(data?.first_name)}
          </Avatar>
          <span className='text-white text-[17px]'>{userName}</span>
        </Link>
      </div>
    </Header>
  );
};

export default Navbar;
