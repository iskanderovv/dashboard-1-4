import { useOutletContext, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Button, Table, message } from 'antd';
const { Column } = Table;
import axios from '../../api';

const Users = () => {
  const [data, loading, setData] = useFetch('/admin/registered-users');
  const { termSearch } = useOutletContext();
  const navigate = useNavigate();

  const handlePromote = async (username) => {
    try {
      const response = await axios.post('/admin/add-admin', { username });
      console.log(response);
      if (response.status === 200) {
        message.success('User promoted successfully');
        setData((prevData) =>
          prevData.map((user) =>
            user.username === username ? { ...user, role: 'admin' } : user
          )
        );
      } else {
        message.error(response.data.message || 'Failed to promote user');
      }
    } catch (error) {
      console.log(error);
      message.error('An error occurred while promoting the user');
    }
  };

  const filteredData = data?.filter((user) => {
    return user.first_name.toLowerCase().includes(termSearch.toLowerCase()) || user.username.toLowerCase().includes(termSearch.toLowerCase());
  });

  return (
    <Table loading={loading} dataSource={filteredData} rowKey="_id">
      <Column title="Name" dataIndex="first_name" key="first_name" />
      <Column title="Username" dataIndex="username" key="username" />
      <Column
        title="Promote"
        key="promote"
        render={(_, record) => (
          <Button
            type="primary"
            onClick={() => handlePromote(record.username)}
            disabled={record.role === 'admin'}
          >
            {record.role === 'admin' ? 'Promoted' : 'Promote'}
          </Button>
        )}
      />
    </Table>
  );
}

export default Users;
