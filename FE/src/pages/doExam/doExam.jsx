import React, { useEffect, useState } from 'react';
import { Card, Radio, Button, Menu, Affix, Col, Row, message, Modal, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
const QuizExam = () => {
    const navigate = useNavigate();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [remainingTime, setRemainingTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [scoreExam, setScoreExam] = useState(0);
    const [submittedTime, setSubmittedTime] = useState(null);
    const storedQuiz = JSON.parse(localStorage.getItem('quizInfo')) || {};
    const selectedTime = storedQuiz?.selectedTime || '30 phút';
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
    }, [])
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const storedQuiz = localStorage.getItem("quizInfo");
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            const shuffledQuestions = shuffleArray(parsedQuiz.questions).map((question, index) => ({
                ...question,
                id: index + 1,
                options: shuffleArray(question.options)
            }));
            setQuestions(shuffledQuestions);
        }
    }, []);

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }
    const handleAnswerChange = (questionId, optionId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
    };
    const handleSubmit = () => {
        let score = 0;
        const userName = localStorage.getItem("username");
        const remaintimeInMinutes = Math.floor(timeInMinutes - (remainingTime / 60));
        const timeInSeconds = (60 - remainingTime % 60);
        const calculatedTime = remaintimeInMinutes < 1
            ? `0 phút ${timeInSeconds} giây`
            : `${remaintimeInMinutes} phút ${timeInSeconds} giây`;
        setSubmittedTime(calculatedTime);
        const resultDetails = questions.map((question) => {
            const selectedOptionId = selectedAnswers[question.id];
            const correctOption = question.options.find(opt => opt.correct);
            const isCorrect = correctOption && selectedOptionId === correctOption.id;

            if (isCorrect) {
                score++;
            }

            return {
                questionText: question.questionText,
                selectedOptionId,
                correctOptionId: correctOption ? correctOption.id : null,
                options: question.options
            };
        });

        setSubmittedTime(() => {
            const remaintimeInMinutes = Math.floor(timeInMinutes - (remainingTime / 60));
            const timeInSeconds = (60 - remainingTime % 60);
            return remaintimeInMinutes < 1 ? `0 phút ${timeInSeconds} giây`
                : `${remaintimeInMinutes} phút ${timeInSeconds} giây`;
        });


        setScoreExam(score);
        setIsModalOpen(false);
        setIsModalOpen2(true);

        const quizResult = {
            userName,
            score,
            correctAnswers: score,
            incorrectAnsers: questions.length - score,
            submittedTime: calculatedTime,
            resultDetails,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('quizResult', JSON.stringify(quizResult));
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
                    <Card
                        title={storedQuiz.title}
                        bordered={false}
                        style={{
                            width: 300,
                        }}
                    >
                        <p>Chế độ: {storedQuiz.level}</p>
                        <p>Thời gian còn lại: </p>
                        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#3E65FE" }}>{formatTime(remainingTime)}</p>
                        <Button
                            type="primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Nộp bài thi
                        </Button>
                        <Modal title="Bạn có chắc chắn muốn nộp bài thi?" open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)}>
                        </Modal>
                        <Modal style={{ textAlign: "center" }}
                            title="Hoàn thành"
                            open={isModalOpen2}
                            onCancel={() => { navigate('/quizdetail/examcontent') }} onOk={() => navigate('/result')} okText="Xem kết quả" cancelText="Trở về">
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
                            <h4>{question.questionText}</h4>
                            <Radio.Group
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                value={selectedAnswers[question.id]}
                            >
                                {question.options.map((option, idx) => (
                                    <Radio key={option.idx} value={option.id}>
                                        {option.text}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Card>
                    ))}


                </Col>

                <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
                    <Affix offsetTop={20}>
                        <Menu
                            mode="vertical"
                            style={{ width: 256 }}
                            defaultSelectedKeys={['0']}
                        >
                            {questions.map((question, index) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => scrollToQuestion(index)}
                                >
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
