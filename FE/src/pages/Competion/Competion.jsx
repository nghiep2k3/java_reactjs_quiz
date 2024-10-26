import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const Competion = () => {
    const [form] = Form.useForm();
    const token = localStorage.getItem("token");
    const [timeInMinutes, setTimeInMinutes] = useState(0);

    const onFinish = async (values) => {
        // Convert minutes to seconds if timeInMinutes is used
        const timeInSeconds = timeInMinutes > 0 ? timeInMinutes * 60 : values.time;

        // Prepare the payload for the API call
        const payload = {
            time: timeInSeconds,
            name: values.name,
            description: values.description,
            startTime: values.startTime.format(),  // Moment.js will format to ISO 8601
            quizId: values.quizId,
        };


        
        try {
            const response = await axios.post('https://api.trandai03.online/api/v1/competitions/create', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });
            message.success('Competition created successfully!');
            console.log(response.data);
        } catch (error) {
            message.error('Failed to create competition');
            console.error(error);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Tên cuộc thi"
                name="name"
                rules={[{ required: true, message: 'Please enter the competition name' }]}
            >
                <Input placeholder="Enter competition name" />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Please enter a description' }]}
            >
                <Input.TextArea placeholder="Enter description" />
            </Form.Item>

            <Form.Item
                label="Mã quiz"
                name="quizId"
                rules={[{ required: true, message: 'Please enter the quiz ID' }]}
            >
                <InputNumber min={1} placeholder="Enter quiz ID" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Ngày bắt đầu cuộc thi" name="startTime" rules={[{ required: true, message: 'Please select start time' }]}>
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '100%' }}
                    placeholder="Select date and time"
                />
            </Form.Item>

            <Form.Item label="Thời gian làm bài">
                <Input.Group compact>
                    <Form.Item name="time" style={{ width: '60%' }} rules={[{ required: timeInMinutes === 0, message: 'Please enter a time limit in seconds' }]}>
                        <InputNumber type={'number'} min={0} placeholder="Enter time in seconds" style={{ width: '100%' }} disabled={timeInMinutes > 0} />
                    </Form.Item>

                    <Select
                        defaultValue={0}
                        onChange={(value) => setTimeInMinutes(value)}
                        style={{ width: '40%' }}
                        options={[
                            { value: 0, label: 'Chọn thời gian làm bài' },
                            { value: 5, label: '5 minutes' },
                            { value: 10, label: '10 minutes' },
                            { value: 15, label: '15 minutes' },
                            { value: 30, label: '30 minutes' },
                            { value: 45, label: '45 minutes' },
                            { value: 60, label: '60 minutes' }
                        ]}
                    />


                </Input.Group>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create Competition
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Competion;
