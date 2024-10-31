import React, { useEffect, useState } from 'react';
import { List, Card, Button, Typography, message, Tag, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserCompetitions = () => {
    const [competitions, setCompetitions] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/competitions/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    setCompetitions(response.data);
                }
            } catch (error) {
                message.error("Không thể tải danh sách cuộc thi. Vui lòng thử lại sau.");
            }
        };
        fetchCompetitions();
    }, [token]);

    const handleDeleteCompetition = async () => {
        try {
            await axios.delete(`https://api.trandai03.online/api/v1/competitions/delete/${selectedCompetitionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCompetitions(competitions.filter(competition => competition.id !== selectedCompetitionId));
            message.success("Xóa cuộc thi thành công.");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Không thể xóa cuộc thi. Vui lòng thử lại sau.");
        }
    };

    const showDeleteConfirm = (competitionId) => {
        setSelectedCompetitionId(competitionId);
        setIsModalOpen(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>Các Cuộc Thi của Bạn</Title>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={competitions}
                renderItem={competition => (
                    <List.Item>
                        <Card
                            title={<Text strong>{competition.name}</Text>}
                            extra={<Tag color="blue">Mã: {competition.code}</Tag>}
                            actions={[
                                <Button
                                    type="link"
                                    icon={<EyeOutlined />}
                                    onClick={() => navigate(`/createcompetition/showquizcompe/${competition.id}`)}>
                                    Xem Chi Tiết
                                </Button>,
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => showDeleteConfirm(competition.id)}>
                                    Xóa
                                </Button>
                            ]}
                        >
                            <p><Text strong>Người tạo:</Text> {competition.organizedBy}</p>
                            <p><Text strong>Thời gian bắt đầu:</Text> {new Date(competition.startTime).toLocaleString()}</p>
                            <p><Text strong>Mô tả:</Text> {competition.description || "Không có mô tả"}</p>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title="Bạn có chắc chắn muốn xóa cuộc thi?"
                open={isModalOpen}
                onOk={handleDeleteCompetition}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default UserCompetitions;
