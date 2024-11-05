import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Typography, message } from 'antd';
import Loading from '../../components/loading/loading';

const { Title, Paragraph } = Typography;

const FavoriteQuizzes = () => {
    const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);

    useEffect(() => {
        const fetchFavoriteQuizzes = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/quizs/favorite/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                });
                if (response.status === 200) {
                    setFavoriteQuizzes(response.data);
                }
            } catch (error) {
                message.error('Lỗi khi lấy danh sách yêu thích');
                console.error('Lỗi khi lấy danh sách yêu thích:', error);
            }
        };

        fetchFavoriteQuizzes();
    }, []);
    if (!favoriteQuizzes) {
        return <Loading />
    }
    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Danh sách đề thi yêu thích</Title>
            <List
                locale={{ emptyText: <Loading /> }}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={favoriteQuizzes}
                renderItem={(quiz) => (
                    <List.Item>
                        <Card
                            title={quiz.title}
                            bordered={true}
                            hoverable
                            style={{ borderRadius: '10px' }}
                        >
                            <Paragraph>{quiz.description || 'Không có mô tả'}</Paragraph>
                            {/* Thêm nút, thông tin khác nếu cần */}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FavoriteQuizzes;
