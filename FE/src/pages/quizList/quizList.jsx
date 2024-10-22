import React, { useEffect, useState } from 'react';
import { List, Card, notification, Popconfirm, Button, Image } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;
const QuizList = () => {
    const { id } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    console.log("quiz", quizzes);

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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleDeleteQuiz = async (quizId) => {
        console.log(quizId);
        try {
            const response = await axios.delete(`https://api.trandai03.online/api/v1/quizs/${quizId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            if (response.status === 200) {
                notification.success({
                    message: 'Xóa thành công!',
                    description: 'Đề thi đã được xóa.',
                });
                setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi khi xóa đề thi',
                description: 'Không thể xóa đề thi, vui lòng thử lại sau.',
            });
        }
    };
    return (
        <div>
            <h1>Danh sách các đề thi</h1>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={quizzes}
                renderItem={quiz => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            actions={[
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa đề thi này?"
                                    onConfirm={() => handleDeleteQuiz(quiz.id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button danger icon={<DeleteOutlined />}></Button>
                                </Popconfirm>
                            ]}
                        >
                            <Link to={`/quizdetail/examcontent/${quiz.id}`}>
                                <Image src={`${quiz.image}`} preview={false}></Image>
                                <p><strong>{quiz.title}</strong></p>
                                <p><ClockCircleOutlined /> {formatDate(quiz.createdAt)}</p>
                                <p>Số câu hỏi: {quiz.questions?.length}</p>
                                <p>Trình độ: {quiz?.category?.name || "Không có"}</p>
                                <p>Mô tả: {quiz.description}</p>
                            </Link>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default QuizList;
