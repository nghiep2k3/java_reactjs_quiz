import React, { useState } from 'react';
import { Button, Input, Form, Card, Row, Col, Radio, Menu, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import styles from './createQuestion.module.css';
const CreateQuestion = () => {
    const [options, setOptions] = useState([
        { id: 1, text: '', correct: false },
        { id: 2, text: '', correct: false },
        { id: 3, text: '', correct: false },
        { id: 4, text: '', correct: false },
    ]);
    const [questions, setQuestions] = useState([]);
    const [selectedScore, setselectedScore] = useState(null);
    const handleOptionChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index].text = e.target.value;
        setOptions(newOptions);
    };

    const handleCorrectChange = (index) => {
        const newOptions = options.map((option, i) => ({
            ...option,
            correct: i === index
        }));
        setOptions(newOptions);
    };

    const handleDeleteOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        const newOption = { id: options.length + 1, text: '', correct: false };
        setOptions([...options, newOption]);
    };
    const handleScoreChange = (value) => {
        setselectedScore(value);
    };
    const handleSubmit = (values) => {
        const newQuestion = {
            question: values.question,
            options: options,
            score: selectedScore
        };
        setQuestions([...questions, newQuestion]);
        console.log("Câu hỏi đã lưu:", newQuestion);
        console.log(values.question);

    };
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div style={{ backgroundColor: "#E5E5E5" }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"

                    defaultSelectedKeys={['2']}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}

                >
                    <Select
                        showSearch
                        placeholder="Điểm"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={Array.from({ length: 10 }, (_, i) => ({ value: (i + 1).toString() }))}
                        onChange={handleScoreChange}
                    />
                </Menu>
            </Header>
            <Card style={{ width: '1100px', margin: '50px auto', background: "#451A42" }}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="question"
                        rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
                    >
                        <Input.TextArea
                            className="custom-textarea"
                            style={{
                                height: '250px',
                                backgroundColor: isFocused ? 'rgba(0, 0, 0, 0.4)' : '#451A42',
                                color: isFocused ? 'white' : 'black',
                                textAlign: 'center',
                                fontSize: '30px',
                            }}
                            placeholder="Nhập nội dung câu hỏi..."
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </Form.Item>

                    <Form.Item label="Tùy chọn trả lời">
                        {options.map((option, index) => (
                            <Row key={index} align="middle" style={{ marginBottom: '10px' }}>
                                <Col span={18}>
                                    <Input
                                        placeholder={`Tùy chọn ${index + 1}`}
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(index, e)}
                                    />
                                </Col>
                                <Col span={2}>
                                    <Radio
                                        checked={option.correct}
                                        onChange={() => handleCorrectChange(index)}
                                    >
                                        <CheckOutlined />
                                    </Radio>
                                </Col>
                                <Col span={2}>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        type="danger"
                                        onClick={() => handleDeleteOption(index)}
                                    />
                                </Col>
                            </Row>
                        ))}

                        {/* Nút thêm tùy chọn */}
                        <Button
                            icon={<PlusOutlined />}
                            type="dashed"
                            onClick={handleAddOption}
                            style={{ width: '100%', marginTop: '10px' }}
                        >
                            Thêm tùy chọn
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Lưu câu hỏi
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ marginTop: '20px' }}>
                    <h3>Các câu hỏi đã lưu:</h3>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <strong>Câu hỏi:</strong> {q.question} <br></br>
                                <strong>Điểm:</strong> {q.score}
                                <ul>
                                    {q.options.map((opt, optIndex) => (
                                        <li key={optIndex}>
                                            {opt.text} {opt.correct && <strong>(Đúng)</strong>}
                                        </li>
                                    ))}
                                </ul>

                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default CreateQuestion;
