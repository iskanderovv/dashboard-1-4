import { Avatar, Menu, Layout, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import useFetch from '../../hooks/useFetch';

const { Header } = Layout;
const { Search } = Input;

const Navbar = ({ collapsed, toggleCollapsed, setTermSearch }) => {
  const [api, contextHolder] = notification.useNotification();
  const [data, loading] = useFetch("/auth/profile");
  const [notificationsAll] = useFetch("/notifications/all");

  const openNotification = () => {  
    api.open({
      message: notificationsAll?.length > 0 ? 'New Notifications' : 'No new notifications',
      description: <div className='flex flex-col gap-4 mt-3'>
        {notificationsAll?.map(({ message }) => <p className='text-gray-700 bg-green-300 py-3 px-3'>{message}</p>)}
      </div> || 'No new notifications',
      duration: 0,
    });
  };
  

  const getUserInitial = (name) => {
    return typeof name === 'string' && name.length > 0 ? name.slice(0, 2).toUpperCase() : 'U';
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

  const searchHandle = (value) => {
    setTermSearch(value);
    console.log(value);
  }

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
        onChange={(e) => searchHandle(e.target.value)}
        allowClear
        style={{
          maxWidth: 600,
        }}
      />
      <div className='flex justify-between gap-10'>
        {contextHolder}
        <div className='text-white select-none' onClick={openNotification}>Notifications</div>
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
