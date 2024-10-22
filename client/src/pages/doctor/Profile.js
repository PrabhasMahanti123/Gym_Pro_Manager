import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Col, Form, Input, message, Row, TimePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/doctor/updateProfile',
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0].format('HH:mm')),
            moment(values.timings[1].format('HH:mm')),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/doctor/getDoctorInfo',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <div style={{ padding: '20px', backgroundColor: '#f7f9fc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#4A4A4A', marginBottom: '20px' }}>Profile</h1>
        {doctor && (
          <Form
            layout='vertical'
            onFinish={handleFinish}
            className='m-3'
            initialValues={{
              ...doctor,
              timings: [moment(doctor.timings[0], 'HH:mm'), moment(doctor.timings[1], 'HH:mm')],
            }}
          >
            <h3 style={{ color: '#4A4A4A' }}>Personal Information</h3>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='First Name' name='firstName' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your first name' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Last Name' name='lastName' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your last name' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Phone' name='phone' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your phone' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Email' name='email' required rules={[{ required: true }]}>
                  <Input type='email' placeholder='Your email' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Website' name='website' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your website' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Address' name='address' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your clinic address' style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>
            <hr />
            <h3 style={{ color: '#4A4A4A' }}>Professional Information</h3>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Specialization' name='specialization' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your specialization' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Experience' name='experience' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your experience' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Fees Per Consultation' name='feesPerConsultation' required rules={[{ required: true }]}>
                  <Input type='text' placeholder='Your fees' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label='Timings' name='timings' required rules={[{ required: true }]}>
                  <TimePicker.RangePicker format='HH:mm' style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className='btn btn-primary form-btn' type='submit' style={buttonStyle}>
                    Update
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Layout>
  );
};

// CSS styles as JavaScript objects
const inputStyle = {
  borderRadius: '5px',
  border: '1px solid #d9d9d9',
  padding: '10px',
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

export default Profile;
