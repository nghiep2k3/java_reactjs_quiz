import React, { useEffect, useState } from 'react';
import { Card, Progress, Tabs, Table, Tag, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, BarChartOutlined } from '@ant-design/icons';

const ReportQuizResult = () => {
    const [result, setResult] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [currentTab, setCurrentTab] = useState("1");
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const storedResult = localStorage.getItem('quizResult');
        const storedQuiz = localStorage.getItem('quizInfo');
        if (storedResult) {
            const parsedResult = JSON.parse(storedResult);
            setResult(parsedResult);
        }
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            setQuiz(parsedQuiz);
        }
    }, []);
    useEffect(() => {
        if (result && quiz) {
            handleTabChange("1");
        }
    }, [result, quiz]);
    if (!result || !quiz) {
        return <div>Loading...</div>;
    }
    const handleTabChange = (key) => {
        const rate = (result.correctAnswers / result.resultDetails.length) * 100;
        setCurrentTab(key);
        if (key === "1") {
            setTableData([{
                quizTitle: quiz.title,
                score: result.score,
                rating: rate >= 80 ? "Giỏi" : rate >= 50 ? "Trung bình" : "Yếu",
                correctAnswers: result.correctAnswers,
                incorrectAnswers: result.incorrectAnswers || 0,
                totalQuestions: result.resultDetails.length,
                completedTime: result.submittedTime,
                finishTime: new Date(result.timestamp).toLocaleString(),
                action: "Xem chi tiết"
            }]);
        } else if (key === "2") {
            const correctQuestions = result.resultDetails.filter(q => q.correctOptionId === q.selectedOptionId);
            setTableData(correctQuestions);
        } else if (key === "3") {
            const incorrectQuestions = result.resultDetails.filter(q => q.correctOptionId !== q.selectedOptionId);
            setTableData(incorrectQuestions);
        }
    };

    const columnsForThiThu = [
        {
            title: 'Đề thi',
            dataIndex: 'quizTitle',
            key: 'quizTitle',
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Xếp loại',
            dataIndex: 'rating',
            key: 'rating',
            render: rating => <Tag color={rating === "Giỏi" ? "green" : rating === "Trung bình" ? "yellow" : "red"}>{rating}</Tag>
        },
        {
            title: 'Số câu đúng',
            dataIndex: 'correctAnswers',
            key: 'correctAnswers',
        },
        {
            title: 'Số câu sai',
            dataIndex: 'incorrectAnswers',
            key: 'incorrectAnswers',
        },
        {
            title: 'Tổng số câu',
            dataIndex: 'totalQuestions',
            key: 'totalQuestions',
        },
        {
            title: 'Thời gian hoàn thành',
            dataIndex: 'completedTime',
            key: 'completedTime',
        },
        {
            title: 'Thời gian kết thúc bài thi',
            dataIndex: 'finishTime',
            key: 'finishTime',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: () => <Button type="link">Xem chi tiết</Button>
        }
    ];
    console.log("tt", columnsForThiThu);

    const columnsForQuestions = [
        {
            title: 'Câu hỏi',
            dataIndex: 'questionText',
            key: 'questionText',
        },
        {
            title: 'Đáp án của bạn',
            dataIndex: 'selectedOptionId',
            key: 'selectedOptionId',
            render: (selectedOptionId, record) => record.options.find(opt => opt.id === selectedOptionId)?.text || 'N/A',
        },
        {
            title: 'Đáp án đúng',
            dataIndex: 'correctOptionId',
            key: 'correctOptionId',
            render: (correctOptionId, record) => record.options.find(opt => opt.id === correctOptionId)?.text || 'N/A',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (text, record) => (
                record.correctOptionId === record.selectedOptionId ?
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                    <CloseCircleOutlined style={{ color: '#f5222d' }} />
            )
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ textAlign: 'left' }}><BarChartOutlined style={{ color: "blue" }} /> Kết quả thi</h3>
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <Tabs.TabPane tab="Thi thử" key="1">
                    <Table columns={columnsForThiThu} dataSource={tableData} rowKey="quizTitle" />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Câu đúng" key="2">
                    <Table columns={columnsForThiThu} dataSource={tableData} rowKey="questionText" />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Câu sai" key="3">
                    <Table columns={columnsForThiThu} dataSource={tableData} rowKey="questionText" />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default ReportQuizResult;
