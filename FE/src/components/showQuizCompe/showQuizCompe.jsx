import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Typography, Button } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { PlusOutlined } from "@ant-design/icons";
import Loading from '../loading/loading';

const { Title, Text } = Typography;
const ShowQuizCompe = () => {
    const [competition, setCompetition] = useState(null);
    const { competitionId } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const response = await axios.get(`https://api.trandai03.online/api/v1/competitions/getById/${competitionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    setCompetition(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch competition data", error);
            }
        };
        fetchCompetition();
    }, [competitionId, token]);

    if (!competition) return <Loading />;
    console.log(competition);

    return (
        <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '20px', textAlign: 'start', lineHeight: "30px" }}>
                <Title style={{ textAlign: "center" }} level={3}>{competition.name}</Title>
                <Text strong>Mã Tham Gia: </Text><Tag color="blue">{competition.code}</Tag><br />
                <Text strong>Người Tổ Chức: </Text>{competition.organizedBy}<br />
                <Text strong>Mô Tả: </Text>{competition.description}<br />
                <Text strong>Thời Gian Làm Bài: </Text>{competition.time / 60} phút<br />
                <Text strong>Bắt Đầu Vào Lúc: </Text>{moment(competition.startTime).format('DD/MM/YYYY HH:mm:ss')} <br />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(`/update/updatecompetition/${competitionId}`)}>
                    Chỉnh sửa
                </Button>
            </Card>

            <Title level={4}>Danh Sách Đề Thi</Title>
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={competition.competitionQuizResponses}
                renderItem={(quizItem) => (
                    <List.Item key={quizItem.id}>
                        <Card title={quizItem.quizResponses.title}>
                            <Text strong>Mô Tả: </Text>{quizItem.quizResponses.description}<br />
                            <Text strong>Người Tạo: </Text>{quizItem.quizResponses.usernameCreated}<br />
                            <Text strong>Ngày Tạo: </Text>{moment(quizItem.quizResponses.createdAt).format('DD/MM/YYYY')}<br />
                            <Text strong>Số Câu Hỏi: </Text>{quizItem.quizResponses.questions.length}<br />
                            <Button onClick={() => navigate(`/edit/editquiz/${quizItem?.quizResponses?.id}`)} type="primary" style={{ marginTop: '10px' }}>Xem Chi Tiết</Button>
                        </Card>
                    </List.Item>
                )}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(`/createcompetition/createquizcompetition/${competitionId}`)}>
                Thêm Đề Thi
            </Button>
        </div>
    );
}

export default ShowQuizCompe;
