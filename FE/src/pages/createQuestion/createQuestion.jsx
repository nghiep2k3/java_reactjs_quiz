import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Card, Row, Col, Radio, Anchor, notification } from 'antd';
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
                questionText: '',
                options: [
                    { id: 1, text: '', correct: false },
                    { id: 2, text: '', correct: false },
                    { id: 3, text: '', correct: false },
                    { id: 4, text: '', correct: false },
                ],
                // score: null
            }
        ];
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const saveToLocalStorage = (updatedQuestions) => {
        localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
    };

    const addNewQuestion = () => {
        const newQuestion = {
            questionText: '',
            options: [
                { id: 1, text: '', correct: false },
                { id: 2, text: '', correct: false },
                { id: 3, text: '', correct: false },
                { id: 4, text: '', correct: false },
            ],
            // score: null
        };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        saveToLocalStorage(updatedQuestions);
    };
    const deleteQuestion = () => {

    }
    const handleQuestionChange = (qIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].questionText = e.target.value;
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleOptionChange = (qIndex, optionIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[optionIndex].text = e.target.value;
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleAddOption = (qIndex) => {
        const newQuestions = [...questions];
        const newOption = { id: newQuestions[qIndex].options.length + 1, text: '', correct: false };
        newQuestions[qIndex].options.push(newOption);
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleDeleteOption = (qIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== optionIndex);
        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);
    };

    const handleCorrectChange = (qIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options = newQuestions[qIndex].options.map((option, oIndex) => ({
            ...option,
            correct: oIndex === optionIndex,
        }));

        setQuestions(newQuestions);
        saveToLocalStorage(newQuestions);

    };

    const handleSubmit = async () => {
        const storedQuiz = JSON.parse(localStorage.getItem('quizInfo')) || [];
        console.log("aa", storedQuiz);

        // Updated currentDate formatting
        const currentDate = new Date().toISOString();

        // Prepare updated quiz data
        const updatedQuiz = {
            ...storedQuiz,
            questions,
            timestamp: currentDate
        };

        // Store updated quiz info back to localStorage
        console.log(token);
        console.log(updatedQuiz);
        localStorage.setItem('quizInfo', JSON.stringify(updatedQuiz));

        // Function to post quiz data to API
        try {
            const response = await axios.post('https://api.trandai03.online/api/v1/quizs/create', updatedQuiz, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            if (response.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Thành công',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi khi tạo quiz',
                description: 'Không thể tạo quiz, vui lòng thử lại sau.',
            });
            console.log(error.response);
        }

        // navigate('/quizlist');
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
                                            value={question.questionText}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                            placeholder="Nhập nội dung câu hỏi..."
                                            style={{ height: '100px', fontSize: '16px' }}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Tùy chọn trả lời">
                                        {question.options.map((option, optionIndex) => (
                                            <Row key={option.id} align="middle" style={{ marginBottom: '10px' }}>
                                                <Col span={18}>
                                                    <Input
                                                        placeholder={`Tùy chọn ${optionIndex + 1}`}
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(qIndex, optionIndex, e)}
                                                    />
                                                </Col>
                                                <Col span={2} style={{ marginLeft: "15px" }}>
                                                    <Radio
                                                        checked={option.correct}
                                                        onChange={() => handleCorrectChange(qIndex, optionIndex)}
                                                    >
                                                        Đúng
                                                    </Radio>
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
