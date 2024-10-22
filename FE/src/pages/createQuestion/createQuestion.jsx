import React, { useState } from 'react';
import { Button, Input, Form, Card, Row, Col, Radio, Anchor, notification, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CreateQuestion = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState(() => {
        const storedQuestions = localStorage.getItem('quizQuestions');
        return storedQuestions ? JSON.parse(storedQuestions) : [
            {
                question: '',
                questionChoiceDTOS: [
                    { id: 1, text: '', correct: false },
                    { id: 2, text: '', correct: false },
                    { id: 3, text: '', correct: false },
                    { id: 4, text: '', correct: false },
                ],
            }
        ];
    });

    const [setCurrentQuestionIndex] = useState(0);

    const saveToLocalStorage = (updatedQuestions) => {
        localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
    };

    const addNewQuestion = () => {
        const newQuestion = {
            question: '',
            questionChoiceDTOS: [
                { id: 1, text: '', correct: false },
                { id: 2, text: '', correct: false },
                { id: 3, text: '', correct: false },
                { id: 4, text: '', correct: false },
            ],
        };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        saveToLocalStorage(updatedQuestions);
    };

    const deleteQuestion = (qIndex) => {
        const updatedQuestions = questions.filter((_, index) => index !== qIndex);
        setQuestions(updatedQuestions);
        saveToLocalStorage(updatedQuestions);
    }
    const handleQuestionChange = (qIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].question = e.target.value;
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleOptionChange = (qIndex, optionIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].questionChoiceDTOS[optionIndex].text = e.target.value;
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleAddOption = (qIndex) => {
        const newQuestions = [...questions];
        const newOption = { id: newQuestions[qIndex].questionChoiceDTOS.length + 1, text: '', correct: false };
        newQuestions[qIndex].questionChoiceDTOS.push(newOption);
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleDeleteOption = (qIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].questionChoiceDTOS = newQuestions[qIndex].questionChoiceDTOS.filter((_, i) => i !== optionIndex);
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleCorrectChange = (qIndex, optionIndex, checked) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].questionChoiceDTOS[optionIndex].correct = checked;
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };
    const handleSubmit = async () => {
        const storedQuiz = JSON.parse(localStorage.getItem('quizInfo')) || {};
        const currentDate = new Date().toISOString();
        const formattedQuestions = questions.map((question) => {
            return {
                question: question.question,
                questionChoiceDTOS: question.questionChoiceDTOS.map((option) => {
                    return {
                        text: option.text,
                        isCorrect: option.correct,
                    };
                }),
            };
        });

        const newQuiz = {
            title: storedQuiz.title || '',
            description: storedQuiz.description || '',
            category_id: storedQuiz.category_id || 2,
            questions: formattedQuestions,
            isPublished: storedQuiz.isPublished || false,
            userCreate: storedQuiz.userCreate || 'JohnDoe',
            timestamp: currentDate,
        };
        try {
            const response = await axios.post('https://api.trandai03.online/api/v1/quizs/create', newQuiz, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });
            if (response.status === 201) {
                notification.success({
                    message: 'Thành công',
                    description: 'Quiz đã được tạo thành công.',
                });
                // localStorage.removeItem("quizInfo")
                // localStorage.removeItem("quizQuestions")
                // navigate('/quizlist')
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi khi tạo quiz',
                description: 'Không thể tạo quiz, vui lòng thử lại sau.',
            });
            console.log(error.response);
        }
        const images = storedQuiz.images
        try {
            const response = await axios.post(`https://api.trandai03.online/api/v1/quizs/image/${response.data.id}`, images, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });
            if (response.status === 201) {
                notification.success({
                    message: 'Thành công',
                    description: 'Upload ảnh thành công',
                });
                localStorage.removeItem("quizInfo")
                localStorage.removeItem("quizQuestions")
                navigate('/quizlist')
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi khi tạo quiz',
                description: 'Không thể upload ảnh, vui lòng thử lại sau.',
            });
            console.log(error.response);
        }
    };

    const handleAnchorClick = (qIndex) => {
        setCurrentQuestionIndex(qIndex);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Col span={2}>
                    <Anchor
                        replace
                        items={questions.map((_, qIndex) => ({
                            key: `part-${qIndex + 1}`,
                            href: `#part-${qIndex + 1}`,
                            title: `Câu ${qIndex + 1}`,
                            onClick: () => handleAnchorClick(qIndex),
                        }))}
                    />
                </Col>
                <Col span={20}>
                    {questions.map((question, qIndex) => (
                        <Card key={qIndex} style={{ marginBottom: '20px' }}>
                            <div id={`part-${qIndex + 1}`}>
                                <Form layout="vertical">
                                    <Form.Item
                                        label={`Câu hỏi ${qIndex + 1}`}
                                        rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
                                    >
                                        <Input.TextArea
                                            value={question.question}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                            placeholder="Nhập nội dung câu hỏi..."
                                            style={{ height: '100px', fontSize: '16px' }}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Tùy chọn trả lời">
                                        {question.questionChoiceDTOS.map((option, optionIndex) => (
                                            <Row key={option.id} align="middle" style={{ marginBottom: '10px' }}>
                                                <Col span={18}>
                                                    <Input
                                                        placeholder={`Tùy chọn ${optionIndex + 1}`}
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(qIndex, optionIndex, e)}
                                                    />
                                                </Col>
                                                <Col span={2} style={{ marginLeft: "15px" }}>
                                                    <Checkbox
                                                        checked={option.correct}
                                                        onChange={(e) => handleCorrectChange(qIndex, optionIndex, e.target.checked)}
                                                    >
                                                        Đúng
                                                    </Checkbox>
                                                </Col>
                                                <Col span={2}>
                                                    <Button
                                                        style={{ color: "red" }}
                                                        icon={<DeleteOutlined />}
                                                        type="danger"
                                                        onClick={() => handleDeleteOption(qIndex, optionIndex)}
                                                    />
                                                </Col>
                                            </Row>
                                        ))}
                                    </Form.Item>
                                </Form>
                            </div>
                            <div style={{ display: "flex", gap: ".5rem" }}>

                                <Button
                                    type="danger"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteQuestion(qIndex)}
                                    style={{ marginTop: '10px', background: '#ff4d4f', color: '#fff' }}
                                >
                                    Xóa câu hỏi
                                </Button>
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={() => handleAddOption(qIndex)}
                                    style={{
                                        width: '150px', marginTop: '10px',
                                        backgroundImage: 'linear-gradient(90deg, rgb(255, 127, 206) 0%, rgb(252, 149, 110) 100%)',
                                        color: '#fff'
                                    }}
                                >
                                    Thêm đáp án
                                </Button>
                            </div>
                        </Card>
                    ))}
                </Col>
            </div>

            <Button type="dashed" onClick={addNewQuestion} icon={<PlusOutlined />} style={{ width: '100%' }}>
                Thêm câu hỏi
            </Button>

            <Button type="primary" onClick={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
                Lưu tất cả câu hỏi
            </Button>
        </div>
    );
};

export default CreateQuestion;
