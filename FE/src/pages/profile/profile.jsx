import React, { useEffect, useState } from 'react';
import { Card, Avatar, Descriptions, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    notification.error({
                        message: 'Không thể tải thông tin',
                        description: 'Vui lòng thử lại sau.',
                    });
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
                notification.error({
                    message: 'Lỗi kết nối!',
                    description: 'Không thể kết nối tới máy chủ, vui lòng thử lại sau.',
                });
            }
        };

        fetchUserData();
    }, [token]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card
                style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
                cover={<Avatar size={100} icon={<UserOutlined />} />}
            >
                <Descriptions title="Thông tin người dùng" layout="vertical" bordered>
                    <Descriptions.Item label="Tên đăng nhập">{username || userData.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{email || userData.email}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tham gia">
                        {new Date(userData.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                </Descriptions>
                <Button type="primary" style={{ marginTop: '20px' }}>Chỉnh sửa thông tin</Button>
            </Card>
        </div>
    );
};

export default Profile;
