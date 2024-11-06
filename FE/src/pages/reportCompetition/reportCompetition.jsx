import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReportCompetition = () => {
    const { competitionId } = useParams();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`https://api.trandai03.online/api/v1/result/competition/${competitionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setResults(response.data);
                console.log(results);

            } catch (error) {
                message.error("Không thể tải kết quả cuộc thi. Vui lòng thử lại sau.");
            }
        };
        fetchResults();
    }, [competitionId, token]);

    const handleViewDetails = (resultId) => {
        navigate(`/resultDetail/${resultId}`);
    };

    const classifyScore = (score) => {
        if (score >= 8) return <Tag color="green">Giỏi</Tag>;
        if (score >= 5) return <Tag color="blue">Khá</Tag>;
        return <Tag color="red">Yếu</Tag>;
    };

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Mã đề',
            dataIndex: 'quizTitle',
            key: 'quizTitle',
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Số câu đúng / Tổng số câu',
            key: 'totalCorrect',
            render: (_, record) => `${record.totalCorrect} / ${record.resultQuestionResponses.length}`,
        },
        {
            title: 'Xếp loại',
            key: 'classification',
            render: (_, record) => classifyScore(record.score),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => handleViewDetails(record.id)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Kết quả cuộc thi</h2>
            <Table
                columns={columns}
                dataSource={results}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default ReportCompetition;
