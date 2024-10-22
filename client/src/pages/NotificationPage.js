import React from 'react';
import Layout from '../components/Layout';
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    };

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    return (
        <Layout>
            <h1 style={{ padding: '20px', textAlign: 'center', color: '#4a4a4a' }}>Notification Page</h1>
            <Tabs defaultActiveKey="0">
                <Tabs.TabPane tab="Unread" key="0">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <h3 style={{ margin: 0, cursor: 'pointer' }} onClick={handleMarkAllRead}>Mark All as Read</h3>
                    </div>
                    {
                        user?.notification.map((notificationMgs, index) => (
                            <div 
                                key={index}
                                className='card' 
                                onClick={() => navigate(notificationMgs.onClickPath)} 
                                style={{ cursor: 'pointer', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px', margin: '10px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            >
                                <div style={{ fontSize: '16px', color: '#333' }}>
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>

                <Tabs.TabPane tab="Read" key="1">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <h3 style={{ margin: 0, color: '#007bff', cursor: 'pointer' }} onClick={handleDeleteAllRead}>Delete All Read</h3>
                    </div>
                    {
                        user?.seennotification.map((notificationMgs, index) => (
                            <div 
                                key={index}
                                className='card' 
                                onClick={() => navigate(notificationMgs.onClickPath)} 
                                style={{ cursor: 'pointer', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px', margin: '10px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            >
                                <div style={{ fontSize: '16px', color: '#333' }}>
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export default NotificationPage;
