import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, message, Row, Col, Card, Modal, Image, Typography, Alert, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, CodeOutlined } from '@ant-design/icons';
import axios from 'axios';
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";

const { Title, Text } = Typography;

const jsCompletions = completeFromList([
  { label: "alert()", type: "function", detail: "Hiển thị hộp thoại cảnh báo" },
  { label: "console.log()", type: "function", detail: "In dữ liệu ra console" },
  { label: "setTimeout()", type: "function", detail: "Hàm hẹn giờ" },
  { label: "setInterval()", type: "function", detail: "Hàm chạy lặp sau khoảng thời gian" },
  { label: "document.getElementById()", type: "function", detail: "Tìm phần tử theo ID" },
]);

const SubmitEssay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quizData, remainingTime: initialRemainingTime, idCompetition } = location.state || {};
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime || 0);
    const remainingTimeRef = useRef(remainingTime);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [submittedTime, setSubmittedTime] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [codeModes, setCodeModes] = useState([]);

    const calculateRemainingTime = () => {
        const examEndTime = localStorage.getItem('examEndTime');
        if (examEndTime) {
            const timeRemaining = Math.floor((examEndTime - Date.now()) / 1000);
            return timeRemaining > 0 ? timeRemaining : 0;
        }
        return initialRemainingTime || 0;
    };

    useEffect(() => {
        const examEndTime = localStorage.getItem('examEndTime');
        if (examEndTime) {
            const timeRemaining = Math.floor((examEndTime - Date.now()) / 1000);
            setRemainingTime(timeRemaining > 0 ? timeRemaining : 0);
        }
        const interval = setInterval(() => {
            if (remainingTimeRef.current > 0) {
                setRemainingTime((prevTime) => prevTime - 1);
            } else {
                clearInterval(interval);
                message.info('Hết thời gian!');
                handleSubmitEssay();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleSubmitEssay = async () => {
        const remaintimeInMinutes = Math.floor(initialRemainingTime / 60 - (remainingTime / 60));
        const timeInSeconds = ((initialRemainingTime - remainingTime) % 60);
        const calculatedTime = remaintimeInMinutes < 1
            ? `0 phút ${Math.floor(timeInSeconds)} giây`
            : `${remaintimeInMinutes} phút ${Math.floor(timeInSeconds)} giây`;

        const timeSubmit = Math.floor(remaintimeInMinutes * 60 + timeInSeconds);
        setSubmittedTime(calculatedTime);
        const essayQuestionResultDTOS = quizData.essayQuestions.map((q, index) => ({
            questionId: q.id,
            answer: answers[index] || '',
        }));

        const essayResult = {
            quizId: quizData.id,
            essayQuestionResultDTOS,
            submittedTime: timeSubmit,
            competitionId: idCompetition,
        };
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('https://api.trandai03.online/api/v1/quizs/submitEssay', essayResult, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });

            if (response.status === 200) {
                message.success('Nộp bài thi tự luận thành công');
                console.log(response.data);
                setIsModalOpen(false);
                setIsModalOpen2(true);
                localStorage.removeItem("selectedAnswers");
            }
        } catch (error) {
            message.error('Nộp bài thi tự luận thất bại');
        }
    };

    const toggleCodeMode = (index) => {
        const newCodeModes = [...codeModes];
        newCodeModes[index] = !newCodeModes[index];
        setCodeModes(newCodeModes);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    return (
        <div className="quiz-exam" style={{
            maxWidth: 1200,
            margin: '24px auto',
            padding: '24px',
            backgroundColor: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
        }}>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                    <Card
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <ClockCircleOutlined />
                                <span>Thông tin bài thi</span>
                            </div>
                        }
                        bordered={false}
                        headStyle={{ border: 'none', padding: '16px 24px' }}
                        bodyStyle={{ padding: '16px 24px' }}
                        style={{
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%)'
                        }}
                    >
                        <div style={{ marginBottom: 16 }}>
                            <Text strong>Tiêu đề:</Text>
                            <Title level={5} style={{ marginTop: 8 }}>{quizData?.title}</Title>
                        </div>

                        <div style={{
                            background: '#fff',
                            padding: 16,
                            borderRadius: 8,
                            marginBottom: 24,
                            textAlign: 'center',
                            border: '1px solid #e8e8e8'
                        }}>
                            <Text type="secondary">Thời gian còn lại</Text>
                            <Title
                                level={2}
                                style={{
                                    margin: '8px 0',
                                    color: remainingTime > 60 ? '#3E65FE' : '#ff4d4f',
                                    fontFamily: 'monospace'
                                }}
                            >
                                {formatTime(Math.floor(remainingTime))}
                            </Title>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            block
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                height: 48,
                                fontSize: 16,
                                fontWeight: 600,
                                borderRadius: 8,
                                boxShadow: '0 4px 12px rgba(62,101,254,0.2)'
                            }}
                        >
                            Nộp bài thi
                        </Button>
                        <Alert
                            message="Lưu ý"
                            description="Luôn giữ tab trong suốt quá trình làm bài (vi phạm sẽ 0 điểm)"
                            type="warning"
                            showIcon
                            style={{ marginTop: 24, borderRadius: 8 }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card
                        title={<Title level={4} style={{ margin: 0, color: "#fff" }}>Câu hỏi tự luận</Title>}
                        bordered={false}
                        headStyle={{ border: 'none', padding: '16px 24px' }}
                        bodyStyle={{ padding: '24px' }}
                        style={{
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            borderRadius: 12
                        }}
                    >
                        <Form layout="vertical">
                            {quizData.essayQuestions.map((q, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: 24,
                                        padding: 24,
                                        background: '#fff',
                                        borderRadius: 8,
                                        border: '1px solid #f0f0f0',
                                        transition: 'box-shadow 0.2s',
                                        ':hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                        }
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        gap: 8,
                                        marginBottom: 16,
                                        alignItems: 'baseline'
                                    }}>
                                        <div style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            background: '#3E65FE',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            {index + 1}
                                        </div>
                                        <Text strong style={{ fontSize: 16 }}>{q.question}</Text>
                                    </div>
                                    {codeModes[index] ? (
                                        <CodeMirror
                                            value={answers[index] || ''}
                                            height="200px"
                                            theme={oneDark}
                                            extensions={[javascript({ jsx: true }), autocompletion({ override: [jsCompletions] })]}
                                            onChange={(value) => handleAnswerChange(index, value)}
                                        />
                                    ) : (
                                        <Input.TextArea
                                            value={answers[index] || ''}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            rows={4}
                                        />
                                    )}
                                    <Button
                                        icon={<CodeOutlined />}
                                        onClick={() => toggleCodeMode(index)}
                                        style={{ marginTop: 8 }}
                                    >
                                        {codeModes[index] ? 'Chế độ văn bản' : 'Chế độ code'}
                                    </Button>
                                </div>
                            ))}
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Modal
                title={null}
                open={isModalOpen2}
                footer={null}
                centered
                closable={false}
                style={{ maxWidth: 400 }}
            >
                <div style={{ textAlign: 'center', padding: 24 }}>
                    <Image
                        src="https://studio.eduquiz.vn/assets/images/exam/img_hoanthanh@2x.png"
                        preview={false}
                        style={{ width: 160, margin: '0 auto 24px' }}
                    />
                    <Title level={3} style={{ marginBottom: 8 }}>Nộp bài thành công!</Title>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                        Thời gian làm bài: {submittedTime}
                    </Text>
                    <Button
                        type="primary"
                        block
                        size="large"
                        onClick={() => navigate('/', { replace: true })}
                        style={{ borderRadius: 8 }}
                    >
                        Trở về trang chủ
                    </Button>
                </div>
            </Modal>
            <Modal title="Bạn có chắc chắn muốn nộp bài thi?" open={isModalOpen} onOk={handleSubmitEssay} onCancel={() => setIsModalOpen(false)} />
        </div>
    );
};

export default SubmitEssay;