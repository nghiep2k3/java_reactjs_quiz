import React, { useState } from 'react';
import { Form, Upload, Button, Switch, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import mammoth from 'mammoth';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const QuestionEssay = () => {
    const { competitionId } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [isAutoScored, setIsAutoScored] = useState(true);

    const handleUpload = async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer();

            const result = await mammoth.extractRawText({ arrayBuffer });
            const text = result.value;

            const questionMatches = text.match(/câu hỏi:(.*?)(?=đáp án:|tiêu chí chấm điểm:|điểm tối đa:|$)/gis);
            const answerMatches = text.match(/đáp án:(.*?)(?=câu hỏi:|tiêu chí chấm điểm:|điểm tối đa:|$)/gis);
            const criteriaMatches = text.match(/tiêu chí chấm điểm:(.*?)(?=câu hỏi:|đáp án:|điểm tối đa:|$)/gis);
            const maxScoreMatches = text.match(/điểm tối đa:(.*?)(?=câu hỏi:|đáp án:|tiêu chí chấm điểm:|$)/gis);
            const parsedQuestions = questionMatches.map((match, index) => ({
                questionText: match.replace(/câu hỏi:/i, '').trim(),
                modelAnswer: answerMatches[index] ? answerMatches[index].replace(/đáp án:/i, '').trim() : '',
                scoringCriteria: criteriaMatches[index] ? criteriaMatches[index].replace(/tiêu chí chấm điểm:/i, '').trim() : '',
                isAutoScored: isAutoScored,
                maxScore: maxScoreMatches[index] ? parseInt(maxScoreMatches[index].replace(/điểm tối đa:/i, '').trim(), 10) : 0,
            }));

            setQuestions(parsedQuestions);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    const customRequest = ({ file, onSuccess }) => {
        handleUpload(file);
        onSuccess("ok");
    };
    const handleSubmit = async () => {
        const storedQuiz = JSON.parse(localStorage.getItem('quizCompe')) || {};
        const newQuiz = {
            title: storedQuiz.title || '',
            description: storedQuiz.description || '',
            category_id: storedQuiz.category_id || 2,
            essayQuestionDTOS: questions,
            type: "ESSAY",
            isPublished: storedQuiz.isPublished || false,
        };
        try {
            const response = await axios.post(`https://api.trandai03.online/api/v1/competitions/quiz/create/${competitionId}`, newQuiz, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });
            if (response.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Quiz đã được tạo thành công.',
                });
                localStorage.removeItem("quizCompe")
                localStorage.removeItem("quizQuestionsCompe")
                navigate(`/createcompetition/showquizcompe/${competitionId}`)
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi khi tạo quiz',
                description: 'Không thể tạo quiz, vui lòng thử lại sau.',
            });
            console.log(error.response);
        }

    }
    return (
        <div>
            <div>
                <h3 style={{ textAlign: "center" }}>Nội Dung Đề Tự Luận</h3>
                {questions.map((question, index) => (
                    <div key={index}>
                        <h4>Câu hỏi {index + 1}</h4>
                        <p><strong>Câu hỏi:</strong> {question.questionText}</p>
                        <p><strong>Đáp án mẫu:</strong> {question.modelAnswer}</p>
                        <p><strong>Tiêu chí chấm điểm:</strong> {question.scoringCriteria}</p>
                        <p><strong>Điểm tối đa:</strong> {question.maxScore}</p>

                    </div>
                ))}
            </div>
            <Form layout="vertical">
                <Form.Item label="Upload File Word">
                    <Upload customRequest={customRequest} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Chọn File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Tự động chấm điểm">
                    <Switch checked={isAutoScored} onChange={setIsAutoScored} />
                </Form.Item>
                <Button type="primary" onClick={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
                    Tạo đề
                </Button>
            </Form>
        </div>
    );
};

export default QuestionEssay;