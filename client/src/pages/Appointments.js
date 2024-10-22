import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { render } from '@testing-library/react';
import moment from 'moment';
import { Table } from 'antd';

const Appointments = () => {
    const [appointments, setAppointment] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.post('/api/v1/user/user-appointments', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setAppointment(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.name}
                </span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')}
                </span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: (text, record) => (
                <span>
                    {record.time[0]} - {record.time[1]} {/* Display time range directly */}
                </span>
            )
        }
    ];

    return (
        <Layout>
            <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Appointments</h2>
                <Table
                    columns={columns}
                    dataSource={appointments}
                    pagination={false}
                    style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                    rowKey="id" // Assuming there's an 'id' field in appointments data
                />
            </div>
        </Layout>
    );
};

export default Appointments