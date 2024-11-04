import React, { useEffect, useState } from 'react';
import { Tabs, Table, Tag, Button } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import axios from 'axios';

const ResultCompetition = () => {
    const [result, setResult] = useState(null);
    const [currentTab, setCurrentTab] = useState("1");
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/result/competition/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                if (response.status === 200) {
                    setResult(response.data);
                }
            } catch (error) {
                console.error('Error fetching quiz result:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (result) {
            handleTabChange("1");
        }
    }, [result]);

    if (!result) {
        return <Loading />;
    }
    const handleTabChange = (key) => {
        setCurrentTab(key);
        if (key === "1") {
            setTableData(
                result.map((res) => {
                    const timeStart = new Date(res.competitionResponse.startTime).getTime();
                    const duration = res.competitionResponse.time;
                    const timeEnd = timeStart + duration;
                    const checked = Date.now() - timeEnd;
                    if (checked >= 0) {
                        return {
                            idResult: res.id,
                            quizTitle: res.quizTitle,
                            score: res.score,
                            rating: res.score >= 8 ? "Giỏi" : res.score >= 5 ? "Trung bình" : "Yếu",
                            correctAnswers: res.totalCorrect || 0,
                            incorrectAnswers: res.resultQuestionResponses.length - res.totalCorrect || 0,
                            totalQuestions: res.resultQuestionResponses.length,
                            completedTime: res.submittedTime,
                            finishTime: new Date(res.completedAt).toLocaleString(),
                        };
                    } else {
                        return null;
                    }
                })
            );
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
            dataIndex: 'idResult',
            key: 'action',
            render: (idResult) => (
                <Button type="link" onClick={() => navigate(`/result/${idResult}`)}>
                    Xem chi tiết
                </Button>
            ),
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ textAlign: 'left' }}>
                <BarChartOutlined style={{ color: "blue" }} /> Kết quả thi
            </h3>
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <Tabs.TabPane tab="Thi thử" key="1">
                    <Table columns={columnsForThiThu} dataSource={tableData} rowKey="idResult" />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Cuộc thi" key="2">
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default ResultCompetition;
