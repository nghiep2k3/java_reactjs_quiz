import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Button, Menu, Affix, Col, Row, message, Modal, Image, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/loading';

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuizExam = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [remainingTime, setRemainingTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [scoreExam, setScoreExam] = useState(0);
    const [storedQuiz, setQuiz] = useState(null);
    const [submittedTime, setSubmittedTime] = useState(null);
    const [questions, setQuestions] = useState([]);
    const selectedTime = storedQuiz?.selectedTime || '30 phút'; //error
    const timeInMinutes = parseInt(selectedTime.split(" ")[0], 10);
    let timeInSeconds = timeInMinutes * 60;

    useEffect(() => {
        setRemainingTime(timeInSeconds);
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    message.info('Hết thời gian!');
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeInSeconds]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`https://api.trandai03.online/api/v1/quizs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 200) {
                    const quizData = response.data;
                    quizData.questions = shuffleArray(quizData.questions);
                    quizData.questions.forEach((question) => {
                        question.questionChoice = shuffleArray(question.questionChoice);
                    });
                    setQuestions(quizData.questions);
                    setQuiz(quizData);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu quiz:", error);
            }
        };

        fetchQuizData();
    }, [id]);

    if (!questions || questions.length === 0) {
        return <Loading />;
    }

    const handleAnswerChange = (questionId, selectedChoices) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedChoices
        }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        let score = 0;
        const remaintimeInMinutes = Math.floor(timeInMinutes - (remainingTime / 60));
        const timeInSeconds = (60 - remainingTime % 60);
        const calculatedTime = remaintimeInMinutes < 1
            ? `0 phút ${timeInSeconds} giây`
            : `${remaintimeInMinutes} phút ${timeInSeconds} giây`;
        const timeSubmit = remaintimeInMinutes * 60 + timeInSeconds;
        setSubmittedTime(calculatedTime);
        const resultDetails = questions.map((question) => {
            const selectedChoices = selectedAnswers[question.id] || [];
            const correctChoices = question.questionChoice.filter(opt => opt.isCorrect).map(opt => opt.id);
            const isCorrect = selectedChoices.sort().toString() === correctChoices.sort().toString();

            if (isCorrect) {
                score++;
            }

            return {
                questionId: question.id,
                selectedChoiceIds: selectedChoices,
            };

        });
        setScoreExam(score);
        setIsModalOpen(false);
        setIsModalOpen2(true);

        const quizResult = {
            quizId: storedQuiz.id,
            questionResultDTOS: resultDetails,
            score,
            // completedAt: new Date().toISOString(),
            submittedTime: timeSubmit,
        };

        localStorage.setItem('quizResult', JSON.stringify(quizResult));

        try {
            const response = await axios.post('https://api.trandai03.online/api/v1/quizs/submit', quizResult, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                notification.success({
                    message: "Nộp bài thành công",
                    description: "Bài thi đã được nộp thành công!"
                });
                console.log("result", response.data);

                localStorage.setItem("Result", JSON.stringify(response.data));

                setScoreExam(score);
                setIsModalOpen(false);
                setIsModalOpen2(true);
            }
        } catch (error) {
            console.error("Lỗi submit:", error.response);
            notification.error({
                message: "Nộp bài không thành công",
                description: "Có lỗi xảy ra khi nộp bài, vui lòng thử lại."
            });
        }
    };

    const scrollToQuestion = (index) => {
        const element = document.getElementById(`question-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="quiz-exam container mt-5" style={{ maxWidth: "100%" }}>
            <Row style={{ display: "flex", justifyContent: "space-around" }}>
                <Col span={5}>
                    <Card title={storedQuiz?.title} bordered={false} style={{ width: 300 }}>
                        <p>Chế độ: {storedQuiz?.level}</p>
                        <p>Thời gian còn lại: </p>
                        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#3E65FE" }}>{formatTime(remainingTime)}</p>
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>
                            Nộp bài thi
                        </Button>
                        <Modal title="Bạn có chắc chắn muốn nộp bài thi?" open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)} />
                        <Modal
                            style={{ textAlign: "center" }}
                            title="Hoàn thành"
                            open={isModalOpen2}
                            onCancel={() => { navigate(`/quizdetail/examcontent/${storedQuiz.id}`); }}
                            onOk={() => navigate('/result')}
                            okText="Xem kết quả"
                            cancelText="Trở về"
                        >
                            <div style={{ maxWidth: "300px", marginLeft: "auto", marginRight: "auto" }}>
                                <Image src='https://studio.eduquiz.vn/assets/images/exam/img_hoanthanh@2x.png' preview={false} />
                            </div>
                            <p>Bạn đã hoàn thành bài thi</p>
                            <h3>{scoreExam} điểm</h3>
                            <div>
                                <p>Số câu đúng: {scoreExam}/{questions.length}</p>
                                <p>Thời gian: {submittedTime}</p>
                            </div>
                        </Modal>
                    </Card>
                </Col>

                <Col span={13}>
                    {questions.map((question, index) => (
                        <Card
                            className="mb-4"
                            key={index}
                            id={`question-${index}`}
                            title={`Câu hỏi ${index + 1}`}
                        >
                            <h4>{question.question}</h4>
                            <Checkbox.Group
                                onChange={(values) => handleAnswerChange(question.id, values)}
                                value={selectedAnswers[question.id] || []}
                            >
                                {question.questionChoice.map((option, idx) => (
                                    <Checkbox key={option.id} value={option.id}>
                                        {option.text}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </Card>
                    ))}
                </Col>

                <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
                    <Affix offsetTop={20}>
                        <Menu mode="vertical" style={{ width: 256 }} defaultSelectedKeys={['0']}>
                            {questions.map((question, index) => (
                                <Menu.Item key={index} onClick={() => scrollToQuestion(index)}>
                                    Câu {index + 1}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Affix>
                </Col>
            </Row>
        </div>
    );
};

export default QuizExam;
