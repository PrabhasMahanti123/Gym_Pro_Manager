import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';

const ApplySlot = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const getAvailableSlots = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllSlots', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setSlots(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error('Error while fetching available slots');
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, []);

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      const filtered = slots.filter(slot => slot.date === formattedDate);
      setFilteredSlots(filtered.length > 0 ? filtered[0].time : []);
    } else {
      setFilteredSlots([]);
    }
  };

  const handleAvailability = async () => {
    if (!selectedDate || !selectedSlot) {
      return message.error('Please select both a date and a time slot.');
    }

    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/slot-availability',
        {
          date: selectedDate.format('DD-MM-YYYY'),
          time: selectedSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        navigate('/booking-confirmation', {
          state: { date: selectedDate.format('DD-MM-YYYY'), slot: selectedSlot },
        });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error('Error while checking availability');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#4A4A4A', marginBottom: '20px', textAlign: 'center' }}>Book a Gym Slot</h2>
        
        <div className="container m-2" style={{ maxWidth: '500px', margin: 'auto' }}>
          <h4 style={{ color: '#4A4A4A' }}>Select a Date:</h4>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="DD-MM-YYYY"
            style={{ width: '100%', marginBottom: '20px', borderRadius: '5px', border: '1px solid #d9d9d9', padding: '8px' }}
          />

          <h4 style={{ color: '#4A4A4A' }}>Select a Time Slot:</h4>
          <select value={selectedSlot} onChange={handleSlotChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #d9d9d9', marginBottom: '20px' }}>
            <option value="">-- Select a Slot --</option>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slotRange, index) => (
                <option key={index} value={`${slotRange[0]} - ${slotRange[1]}`}>
                  {`${slotRange[0]} - ${slotRange[1]}`} {/* Display time ranges */}
                </option>
              ))
            ) : (
              <option disabled>No slots available for the selected date</option>
            )}
          </select>

          <div className="d-flex flex-column mt-3">
            <button 
              className="btn btn-primary mt-2" 
              onClick={handleAvailability}
              style={{
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplySlot;
