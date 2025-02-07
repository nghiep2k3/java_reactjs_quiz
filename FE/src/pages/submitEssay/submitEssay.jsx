import React, { useState } from 'react';
import { Form, Button, message, Upload } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import mammoth from 'mammoth';


const SubmitEssay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quizData, remainingTime, idCompetition } = location.state || {};
    const [fileContent, setFileContent] = useState([]);
    console.log(quizData);

    const handleUpload = async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            const text = result.value.split('\n').filter(line => line.trim() !== '');
            const answers = new Array(quizData.essayQuestions.length).fill('');
            text.forEach(line => {
                const match = line.match(/Đáp án (\d+):\s*(.*)/i);
                if (match) {
                    const index = parseInt(match[1], 10) - 1;
                    if (index >= 0 && index < answers.length) {
                        answers[index] = match[2].trim();
                    }
                }
            });

            setFileContent(answers);

            return false;
        } catch (error) {
            message.error('Lỗi khi đọc file');
            return false;
        }
    };

    const handleSubmitEssay = async () => {
        const essayQuestionResultDTOS = quizData.essayQuestions.map((q, index) => ({
            questionId: q.id,
            answer: fileContent[index] || '',
        }));

        const essayResult = {
            quizId: quizData.id,
            essayQuestionResultDTOS,
            submittedTime: Date.now(),
            competitionId: idCompetition,
        };
        console.log("essayResult", essayResult);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`https://api.trandai03.online/api/v1/quizs/submitEssay`, essayResult, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });
            if (response.status === 200) {
                message.success('Nộp bài thi tự luận thành công');
                console.log(response.data);

            }
        } catch (error) {
            message.error('Nộp bài thi tự luận thất bại');
        }
    };

    return (
        <div>
            <h3>Các câu hỏi tự luận</h3>
            <Form onFinish={handleSubmitEssay}>
                {quizData.essayQuestions.map((q, index) => (
                    <Form.Item
                        key={index}
                        label={`Câu ${index + 1}: ${q.question}`}
                        name={`answers[${index}]`}
                    >
                    </Form.Item>
                ))}
                <Form.Item label="Upload File Word">
                    <Upload
                        beforeUpload={handleUpload}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Nộp bài
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SubmitEssay;