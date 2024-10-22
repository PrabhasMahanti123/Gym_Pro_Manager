import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { DatePicker, message, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Slot = () => {
  const [slots, setSlots] = useState([]); // To store all slots
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState([]); // To store slots for selected date

  // Fetch all slots from the backend
  const getAllSlots = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getallslots', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setSlots(res.data.data); // Set all available slots
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error('Error while fetching slots');
      console.error(error);
    }
  };

  // Fetch all slots on component mount
  useEffect(() => {
    getAllSlots();
  }, []);

  // Filter slots based on the selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD'); // Format for comparison
      const filtered = slots.filter(slot => slot.date === formattedDate); // Filter by selected date
      setFilteredSlots(filtered); // Set filtered slots
    } else {
      setFilteredSlots([]); // Reset if no date selected
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Slot Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Available Times',
      dataIndex: 'time',
      key: 'time',
      render: (time) => time.join(', '), // Join time array for display
    },
  ];

  return (
    <Layout>
      <div className="container" style={{ margin: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2>Select a Date to View Slots</h2>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="DD-MM-YYYY"
          style={{ borderRadius: '5px', boxShadow: 'none', marginBottom: '20px' }}
        />

        <h3>Available Slots:</h3>
        {filteredSlots.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={filteredSlots} 
            rowKey="_id" // Assuming each slot has a unique ID
            pagination={{
              pageSize: 3, }}
            style={{ marginTop: '20px', borderRadius: '10px' }}
          />
        ) : (
          <p style={{ color: 'red' }}>No slots available for the selected date.</p>
        )}
      </div>
    </Layout>
  );
};

export default Slot;
