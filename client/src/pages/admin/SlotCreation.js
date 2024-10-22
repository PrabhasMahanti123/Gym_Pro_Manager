import React, { useState } from 'react';
import { Col, Form, Input, Row, message, Select, Card, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import moment from 'moment';
import axios from 'axios';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';

const { Option } = Select;

const SlotCreation = () => {
  const [numOfSlots, setNumOfSlots] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);
  const [numOfPeople, setNumOfPeople] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const formattedTimeSlots = timeSlots.map(slot => {
        const startTime = moment(slot[0].time + ' ' + slot[0].period, ['HH:mm A', 'h:mm A'], true).format('HH:mm');
        const endTime = moment(slot[1].time + ' ' + slot[1].period, ['HH:mm A', 'h:mm A'], true).format('HH:mm');

        if (!moment(slot[0].time + ' ' + slot[0].period, ['HH:mm A', 'h:mm A'], true).isValid() ||
            !moment(slot[1].time + ' ' + slot[1].period, ['HH:mm A', 'h:mm A'], true).isValid()) {
          throw new Error('Invalid time format');
        }

        return [startTime, endTime];
      });

      const slotData = {
        date: moment(date).format('YYYY-MM-DD'), // Using DatePicker selected date
        numOfSlots: values.numOfSlots,
        numOfPeople: values.numOfPeople,
        time: formattedTimeSlots,
      };

      const res = await axios.post('/api/v1/admin/create-slot', slotData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Slot created successfully');
        navigate('/admin/create-slot');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message || 'Error while creating slot');
      console.error(error);
    }
  };

  const handleTimeChange = (value, index, isStart) => {
    const newTimeSlots = [...timeSlots];

    if (!newTimeSlots[index]) {
      newTimeSlots[index] = [{ time: '', period: 'AM' }, { time: '', period: 'AM' }];
    }

    if (isStart) {
      newTimeSlots[index][0] = value;
    } else {
      newTimeSlots[index][1] = value;
    }

    setTimeSlots(newTimeSlots);
  };

  const renderTimeInputs = () => {
    const timeInputs = [];
    for (let i = 0; i < numOfSlots; i++) {
      timeInputs.push(
        <Card key={i} style={{ marginBottom: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <h4>Time Slot {i + 1}</h4>
          <Form.Item
            label={`Start Time`}
            required
            rules={[{ required: true, message: 'Please enter start time in HH:mm format' }]}
          >
            <Input
              placeholder="HH:mm"
              onChange={(e) => handleTimeChange({ time: e.target.value, period: timeSlots[i]?.[0]?.period || 'AM' }, i, true)}
              value={timeSlots[i] ? timeSlots[i][0]?.time : ''}
              style={{ borderRadius: '5px', boxShadow: 'none' }}
            />
            <Select
              defaultValue="AM"
              onChange={(period) => handleTimeChange({ time: timeSlots[i]?.[0]?.time || '', period }, i, true)}
              style={{ marginLeft: '10px', borderRadius: '5px' }}
            >
              <Option value="AM">AM</Option>
              <Option value="PM">PM</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={`End Time`}
            required
            rules={[{ required: true, message: 'Please enter end time in HH:mm format' }]}
          >
            <Input
              placeholder="HH:mm"
              onChange={(e) => handleTimeChange({ time: e.target.value, period: timeSlots[i]?.[1]?.period || 'AM' }, i, false)}
              value={timeSlots[i] ? timeSlots[i][1]?.time : ''}
              style={{ borderRadius: '5px', boxShadow: 'none' }}
            />
            <Select
              defaultValue="AM"
              onChange={(period) => handleTimeChange({ time: timeSlots[i]?.[1]?.time || '', period }, i, false)}
              style={{ marginLeft: '10px', borderRadius: '5px' }}
            >
              <Option value="AM">AM</Option>
              <Option value="PM">PM</Option>
            </Select>
          </Form.Item>
        </Card>
      );
    }
    return timeInputs;
  };

  return (
    <Layout>
      <h1 className='text-center'>Create New Gym Slot</h1>
      <Form
        layout='vertical'
        onFinish={handleFinish}
        className='m-3'
        initialValues={{ numOfSlots: 0 }}
      >
        <Card style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <h3>Slot Information</h3>
          <Row gutter={20}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Date"
                name="date"
                required
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(date, dateString) => setDate(dateString)}
                  style={{ borderRadius: '5px', width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Number of Slots"
                name="numOfSlots"
                required
                rules={[{ required: true, message: 'Please enter the number of slots' }]}
              >
                <Input
                  type='number'
                  min={1}
                  placeholder='Enter the number of available slots'
                  onChange={(e) => setNumOfSlots(Number(e.target.value))}
                  style={{ borderRadius: '5px', boxShadow: 'none' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Number of People"
                name="numOfPeople"
                required
                rules={[{ required: true, message: 'Please enter the number of people' }]}
              >
                <Input
                  type='number'
                  min={1}
                  placeholder='Enter the number of people allowed'
                  onChange={(e) => setNumOfPeople(Number(e.target.value))}
                  style={{ borderRadius: '5px', boxShadow: 'none' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <h3>Time Slots</h3>
          {renderTimeInputs()}
        </Card>

        <Row gutter={20} style={{ marginTop: '20px' }}>
          <Col xs={24} md={12}></Col>
          <Col xs={24} md={12}>
            <button className='btn' type='submit' style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
              Create Slot
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default SlotCreation;
