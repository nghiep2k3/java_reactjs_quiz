import React, { useEffect, useState } from 'react';
import { List, Card, notification, Popconfirm, Button, Image, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import Loading from '../../components/loading/loading';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [favorquizzes, setFavorQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
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
        fetchQuizzes();
    }, []);


    useEffect(() => {
        const fetchFavorQuizzes = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                if (response.status === 200) {
                    console.log(response.data);
                    const newFavorQuizzes = response.data.data.favoriteQuizResponse.map((res) => res.quiz.id);
                    const uniqueFavorQuizzes = [...new Set([...favorquizzes, ...newFavorQuizzes])];
                    setFavorQuizzes(uniqueFavorQuizzes);
                }
            } catch (error) {
                notification.error({
                    message: 'Lỗi khi tải danh sách yêu thích',
                    description: 'Không thể tải danh sách yêu thích, vui lòng thử lại sau.',
                });
            }
        };
        fetchFavorQuizzes();
    }, []);

    console.log("favor", favorquizzes);


    const handleEditQuiz = (quizId) => {
        navigate(`/edit/editquiz/${quizId}`);
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

    const toggleFavorite = async (quizId) => {
        try {
            if (favorquizzes.includes(quizId)) {
                const res = await axios.delete(`https://api.trandai03.online/api/v1/quizs/unfavorite/${quizId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (res.status === 200) {
                    const updatedFavor = favorquizzes.filter((id) => id !== quizId);
                    setFavorQuizzes(updatedFavor)
                    message.success('Đã bỏ yêu thích!');
                }
            } else {
                const res = await axios.post(`https://api.trandai03.online/api/v1/quizs/favorite/${quizId}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (res.status === 200) {
                    setFavorQuizzes([...favorquizzes, quizId])
                    message.success('Thêm vào mục yêu thích thành công!');
                }
            }
        } catch (error) {
            message.error('Lỗi khi cập nhật mục yêu thích, vui lòng thử lại.');
            console.log(error.message);

        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    if (!quizzes) {
        return <Loading />;
    }

    return (
        <div>
            <h1>Danh sách các đề thi</h1>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={quizzes}
                locale={{ emptyText: <Loading /> }}
                renderItem={quiz => (
                    <List.Item>
                        <Card
                            hoverable
                            actions={[
                                <Button onClick={() => handleEditQuiz(quiz.id)} icon={<EditOutlined />} />,
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa đề thi này?"
                                    onConfirm={() => handleDeleteQuiz(quiz.id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button danger icon={<DeleteOutlined />} />
                                </Popconfirm>,
                                <Button
                                    icon={favorquizzes.includes(quiz.id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                                    onClick={() => toggleFavorite(quiz.id)}
                                />
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
                                    <strong>Id:</strong> {quiz.id}
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
