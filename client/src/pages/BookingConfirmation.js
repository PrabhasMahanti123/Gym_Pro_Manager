import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import moment from 'moment';
import axios from 'axios';
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { DatePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { date, slot } = location.state || {};
  const handleBooking = async () => {
    if (!date || !slot) {
      return alert("Date & time are required");
    }

    try {
      dispatch(showLoading());

      const res = await axios.post('/api/v1/user/book-slot', {
        userId: user._id,
        name: user.name,
        date: date,
        time: slot
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error('Error while booking the slot');
    }
  };

  return (
    <Layout>
      <div className="container m-2">
        <h2>Booking Confirmation</h2>
        {date && slot ? (
          <div>
            <p>Your booking details:</p>
            <p>Date: {date}</p>
            <p>Time Slot: {slot}</p>
            <button className="btn btn-primary mt-2" onClick={handleBooking}>
              Book Now
            </button>
            <div style={{ margin: '10px 0' }} /> {/* Space between buttons */}
            <button className="btn btn-secondary mt-2" onClick={() => navigate('/apply-slot')}>
              Go Back to Apply Slot
            </button>
          </div>
        ) : (
          <p>No booking details found.</p>
        )}
      </div>
    </Layout>
  );
};

export default BookingConfirmation;
