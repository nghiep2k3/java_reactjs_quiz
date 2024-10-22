import React, { useEffect, useState } from 'react';
import { Card, Progress, Tabs, Table, Tag, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import Loading from '../../components/loading/loading';
import axios from 'axios';

const ReportQuizResult = () => {
    const [result, setResult] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [currentTab, setCurrentTab] = useState("1");
    const [tableData, setTableData] = useState([]);
    // Gọi API lấy dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/result/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                if (response.status === 200) {
                    setResult(response.data)
                }
            } catch (error) {
                console.error('Error fetching quiz result:', error);
            }
        };
        fetchData();
    }, []);
    console.log("data", result);

    useEffect(() => {
        if (result && quiz) {
            handleTabChange("1");
        }
    }, [result, quiz]);

    if (!result || !quiz) {
        return <Loading />;
    }

    const handleTabChange = (key) => {
        setCurrentTab(key);
        if (key === "1") {
            setTableData(result.map((res) => ({
                quizTitle: "Quiz " + res.quizId, // Đổi 'quizTitle' thành tên quiz (có thể từ API)
                score: res.score,
                rating: res.score >= 80 ? "Giỏi" : res.score >= 50 ? "Trung bình" : "Yếu",
                correctAnswers: res.correctAnswers || 0,  // Thêm logic xử lý khi hiển thị
                incorrectAnswers: res.incorrectAnswers || 0,
                totalQuestions: res.resultQuestionResponses.length,
                completedTime: res.submittedTime,
                finishTime: new Date(res.completedAt).toLocaleString(),
                action: "Xem chi tiết"
            })));
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

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ textAlign: 'left' }}><BarChartOutlined style={{ color: "blue" }} /> Kết quả thi</h3>
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <Tabs.TabPane tab="Thi thử" key="1">
                    <Table columns={columnsForThiThu} dataSource={tableData} rowKey="quizTitle" />
                </Tabs.TabPane>
                {/* Các Tab khác */}
            </Tabs>
        </div>
    );
};

export default ReportQuizResult;
