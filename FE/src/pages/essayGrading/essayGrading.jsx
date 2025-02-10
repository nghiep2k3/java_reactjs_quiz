import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Typography, message, Card, Form, Collapse } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const EssayGrading = () => {
    const { idResult } = useParams();
    const [results, setResults] = useState([]);
    const [editingResult, setEditingResult] = useState(null);
    const [form] = Form.useForm();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`https://api.trandai03.online/api/v1/result/competition/${idResult}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                });
                setResults(response.data);
                console.log(response.data);


            } catch (error) {
                message.error('Không thể tải dữ liệu kết quả');
            }
        };
        fetchResults();
    }, []);

    const handleEdit = (record) => {
        setEditingResult(record);
        form.setFieldsValue({
            totalScore: record.score,
            questions: record.essayQuestionResultRespones.map(q => ({
                id: q.id,
                score: q.score,
                feedback: q.feedback,
            })),
        });
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedResult = {
                id: editingResult.id,
                totalScore: values.totalScore,
                questions: values.questions.map(q => ({
                    id: q.id,
                    score: q.score,
                    feedback: q.feedback,
                })),
            };
            await axios.post('https://api.trandai03.online/api/v1/result', updatedResult);
            message.success('Lưu kết quả thành công');
            setResults(prevResults =>
                prevResults.map(result =>
                    result.id === editingResult.id ? { ...result, ...updatedResult } : result
                )
            );
            setEditingResult(null);
        } catch (error) {
            message.error('Lưu kết quả thất bại');
        }
    };

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Thời gian hoàn thành',
            dataIndex: 'completedAt',
            key: 'completedAt',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => handleEdit(record)}>
                    Chỉnh sửa
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Chấm điểm bài thi tự luận</Title>
            <Card>
                <Table
                    dataSource={results}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </Card>

            {editingResult && (
                <Card style={{ marginTop: '24px' }}>
                    <Title level={4}>Chỉnh sửa kết quả cho {editingResult.username}</Title>
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Tổng điểm"
                            name="totalScore"
                            rules={[{ required: true, message: 'Vui lòng nhập tổng điểm' }]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.List name="questions">
                            {(fields) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => {
                                        const question = editingResult.competitionResponse.competitionQuizResponses[0].quizResponses.essayQuestions[key];
                                        const userAnswer = editingResult.essayQuestionResultRespones[key];

                                        return (
                                            <Collapse key={key} defaultActiveKey={['0']} style={{ marginBottom: '16px' }}>
                                                <Panel header={`Câu hỏi ${key + 1}`} key={key}>
                                                    <div style={{ marginBottom: '16px' }}>
                                                        <Text strong>Câu hỏi:</Text>
                                                        <Text>{question.question}</Text>
                                                    </div>
                                                    <div style={{ marginBottom: '16px' }}>
                                                        <Text strong>Tiêu chí chấm điểm:</Text>
                                                        <Text>{question.scoringCriteria}</Text>
                                                    </div>
                                                    <div style={{ marginBottom: '16px' }}>
                                                        <Text strong>Đáp án của người dùng:</Text>
                                                        <Text>{userAnswer.answer}</Text>
                                                    </div>

                                                    <Form.Item
                                                        {...restField}
                                                        label="Điểm"
                                                        name={[name, 'score']}
                                                        rules={[{ required: true, message: 'Vui lòng nhập điểm' }]}
                                                    >
                                                        <Input type="number" max={question.maxScore} placeholder="Điểm" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        label="Phản hồi"
                                                        name={[name, 'feedback']}
                                                        rules={[{ required: true, message: 'Vui lòng nhập phản hồi' }]}
                                                    >
                                                        <Input.TextArea placeholder="Phản hồi" />
                                                    </Form.Item>
                                                </Panel>
                                            </Collapse>
                                        );
                                    })}
                                </>
                            )}
                        </Form.List>

                        <Button type="primary" onClick={handleSave}>
                            Lưu kết quả
                        </Button>
                        <Button style={{ marginLeft: '8px' }} onClick={() => setEditingResult(null)}>
                            Hủy
                        </Button>
                    </Form>
                </Card>
            )}
        </div>
    );
};

export default EssayGrading;