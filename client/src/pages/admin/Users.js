import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table, message, Input } from 'antd';

const { Search } = Input;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        setFilteredUsers(res.data.data); // Set initial filtered users to all users
      }
    } catch (error) {
      console.log(error);
      message.error('Error while fetching users');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Search handler
  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  // Block user handler
  const handleBlock = async (id) => {
    try {
      const res = await axios.put(`/api/v1/admin/block/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getUsers(); // Refresh the user list after blocking
      }
    } catch (error) {
      console.log(error);
      message.error('Error while blocking user');
    }
  };

  // Unblock user handler
  const handleUnblock = async (id) => {
    try {
      const res = await axios.put(`/api/v1/admin/unblock/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getUsers(); // Refresh the user list after unblocking
      }
    } catch (error) {
      console.log(error);
      message.error('Error while unblocking user');
    }
  };

  // Table columns definition
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Blocked',
      dataIndex: 'isBlocked',
      render: (text, record) => (
        <span>{record.isBlocked ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {record.isBlocked ? (
            <button 
              className="btn btn-success" 
              onClick={() => handleUnblock(record._id)}
              style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Unblock
            </button>
          ) : (
            <button 
              className="btn btn-danger" 
              onClick={() => handleBlock(record._id)}
              style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Block
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 style={{ margin: '20px 0', textAlign: 'center' }}>Users</h1>

      {/* Search Input */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Search
          placeholder="Search by name or email"
          enterButton
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>

      {/* Users Table */}
      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        rowKey="_id" 
        pagination={{
          pageSize: 6,             // Show 10 rows per page
          showSizeChanger: true,     // Allow the user to select page size
          pageSizeOptions: ['10', '20', '30'],  // Options for rows per page
          defaultCurrent: 1,         // Default to the first page
        }}
        style={{ margin: '20px', borderRadius: '10px', overflowX: 'auto' }}  // Adding horizontal scroll
      />
    </Layout>
  );
};

export default Users;
