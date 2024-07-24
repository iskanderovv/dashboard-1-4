import { Button, Layout, Menu, Modal } from 'antd';
const { Sider } = Layout;
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { SIGNOUT } from '../../redux/actions/action-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SiderComponent = ({ collapsed }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    dispatch({ type: SIGNOUT });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="70"
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
        inlineCollapsed={collapsed}
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
      <div className='p-3 flex-1 flex items-end'>
        <Button
          className='w-full'
          type='primary'
          danger
          onClick={showModal}
        >
          Sign Out
        </Button>
        <Modal
          title="Confirm"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to sign out?</p>
        </Modal>
      </div>
    </Sider>
  );
};

export default SiderComponent;
