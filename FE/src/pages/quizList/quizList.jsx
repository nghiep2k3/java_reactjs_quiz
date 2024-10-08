import React, { useEffect, useState } from 'react';
import { List, Card, notification } from 'antd';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;
const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/quizs/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                if (response.status === 200) {
                    setQuizzes(response.data);
                }
            } catch (error) {
                notification.error({
                    message: 'Lỗi khi tải danh sách chủ đề',
                    description: 'Không thể tải danh sách chủ đề, vui lòng thử lại sau.',
                });
            }
        };
        fetchCategories();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');  // Thêm số 0 nếu là ngày 1 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0 nên cần +1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <div>
            <h1>Danh sách các đề thi</h1>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={quizzes}
                renderItem={quiz => (
                    <List.Item>
                        <Link to='/quizdetail/examcontent'>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <p><strong>{quiz.title}</strong></p>
                                <p>
                                    <strong><ClockCircleOutlined></ClockCircleOutlined> {formatDate(quiz.createdAt)}</strong>
                                </p>
                                <p>Số câu hỏi: {quiz.questions?.length}</p>
                                <p>Trình độ: {quiz?.category?.name || "Không có"}</p>
                                <p>Mô tả: {quiz.description}</p>

                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default QuizList;
