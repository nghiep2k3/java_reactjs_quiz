import React, { useEffect, useState } from 'react';
import { List, Card, notification, Popconfirm, Button, Image } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;
const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const handleEditQuiz = (quizId) => {
        navigate(`/edit/editquiz/${quizId}`);
    };
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
                            actions={[
                                <Button onClick={() => handleEditQuiz(quiz.id)} icon={<EditOutlined />}></Button>,
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa đề thi này?"
                                    onConfirm={() => handleDeleteQuiz(quiz.id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button danger icon={<DeleteOutlined />}></Button>
                                </Popconfirm>
                            ]}
                            style={{
                                width: 280,
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <Link to={`/quizdetail/examcontent/${quiz.id}`}>
                                <div style={{ height: 160, overflow: 'hidden', marginBottom: '15px', borderRadius: '8px' }}>
                                    <Image
                                        src={quiz.image}
                                        alt={quiz.title}
                                        preview={false}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </div>

                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginBottom: '10px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {quiz.title}
                                </p>


                                <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>
                                    <ClockCircleOutlined style={{ marginRight: '5px' }} />
                                    {formatDate(quiz.createdAt)}
                                </p>

                                <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>
                                    <strong>Người tạo:</strong> {quiz.usernameCreated}
                                </p>
                                <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>
                                    <strong>Số câu hỏi:</strong> {quiz.questions?.length}
                                </p>

                                <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>
                                    <strong>Môn học:</strong> {quiz?.category?.name || "Không có"}
                                </p>

                                <p style={{
                                    fontSize: '14px',
                                    color: '#888',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    marginBottom: '5px'
                                }}>
                                    <strong>Mô tả:</strong> {quiz.description || 'Không có mô tả'}
                                </p>
                            </Link>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default QuizList;
