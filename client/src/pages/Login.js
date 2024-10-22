import React, { useState } from 'react';
import { Form, message } from 'antd';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "../styles/RegisterStyles.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();    

  // State to manage password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success('Login successful');
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h1 className="text-center">Login Form</h1>

        <Form.Item label="Email" name="email">
          <div className="email1">
            <Input type="email" required />
          </div>
        </Form.Item>

        <Form.Item label="Password" name="password">
          <div className="password-container">
            <Input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              required
              suffix={
                passwordVisible ? 
                <EyeTwoTone onClick={togglePasswordVisibility} /> : 
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              } // Eye icon toggling
            />
          </div>
        </Form.Item>

        <Link to="/register" className="m-3 link">Register here</Link>
        <button className="submit" type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;
