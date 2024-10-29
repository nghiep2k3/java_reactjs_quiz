import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Modal, message, Progress, Row, Col } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import moment from 'moment';

const { Title, Text } = Typography;

const JoinCompetition = () => {
    const [competitionData, setCompetitionData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);
    const token = localStorage.getItem("token");
    const { code } = useParams();
    //lỗi
    useEffect(() => {
        const fetchCompetitionData = async () => {
            try {
                const response = await axios.get(`https://api.trandai03.online/api/v1/competitions/getByCode/${code}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setCompetitionData(response.data);

                const startTime = new Date(response.data.startTime).getTime(); // Lấy thời gian bắt đầu
                console.log(startTime);

                const duration = response.data.time * 1000; // Đổi sang milliseconds
                const endTime = startTime + duration; // Tính thời gian kết thúc
                const initialRemainingTime = Math.floor((endTime - Date.now()) / 1000); // Thời gian còn lại tính bằng giây

                if (initialRemainingTime > 0) {
                    setRemainingTime(initialRemainingTime);

                    const interval = setInterval(() => {
                        setRemainingTime((prevTime) => {
                            if (prevTime <= 1) {
                                clearInterval(interval);
                                return 0;
                            }
                            return prevTime - 1;
                        });
                    }, 1000);

                    return () => clearInterval(interval);
                }
            } catch (error) {
                message.error("Failed to fetch competition data.");
            }
        };
        fetchCompetitionData();
    }, [token, code]);



    const handleJoin = () => {
        if (joinCode === competitionData?.code) {
            setIsModalVisible(true);
        } else {
            message.error("Incorrect code. Please try again.");
        }
    };

    if (!competitionData) {
        return <Loading />;
    }

    const timeInMinutes = competitionData.time / 60;

    return (
        <Row>

            <Col span={5}>
                <Card bordered={false}>
                    <p>Thời gian còn lại: </p>
                    {remainingTime > 0 && (
                        <>
                            <Form.Item label="Remaining Time">
                                <Progress
                                    percent={(remainingTime / competitionData.time) * 100}
                                    format={() => `${Math.floor(remainingTime / 60)}:${remainingTime % 60}`}
                                    status="active"
                                />
                            </Form.Item>
                            <Text style={{ display: 'block', textAlign: 'center', fontSize: '16px' }}>
                                Time Left: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60} minutes
                            </Text>
                        </>
                    )}
                </Card>
            </Col>
            <Col span={16}>
                <Card style={{ margin: '0 30px', padding: '20px', borderRadius: '8px' }}>
                    <Form layout="vertical" onFinish={handleJoin}>
                        <Form.Item label="Tên cuộc thi">
                            <Input value={competitionData.name} disabled />
                        </Form.Item>
                        <Form.Item label="Tạo bởi">
                            <Input value={competitionData.organizedBy} disabled />
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <Input.TextArea value={competitionData.description} rows={3} disabled />
                        </Form.Item>
                        <Form.Item label="Thời gian bắt đầu">
                            <Input value={moment(competitionData.startTime).format('DD/MM/YYYY HH:mm:ss')} disabled />
                        </Form.Item>
                        <Form.Item label="Thời gian làm bài">
                            <Input value={`${timeInMinutes} phút`} disabled />
                        </Form.Item>

                        {remainingTime > 0 && (
                            <>
                                <Form.Item label="Remaining Time">
                                    <Progress
                                        percent={(remainingTime / competitionData.time) * 100}
                                        format={() => `${Math.floor(remainingTime / 60)}:${remainingTime % 60}`}
                                        status="active"
                                    />
                                </Form.Item>
                                <Text style={{ display: 'block', textAlign: 'center', fontSize: '16px' }}>
                                    Time Left: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60} minutes
                                </Text>
                            </>
                        )}

                        <Form.Item>
                            <Button type="primary">
                                Join Competition
                            </Button>
                        </Form.Item>
                    </Form>

                    <Modal
                        title="Competition Details"
                        visible={isModalVisible}
                        onOk={() => setIsModalVisible(false)}
                        onCancel={() => setIsModalVisible(false)}
                    >
                        <p><Text strong>Name:</Text> {competitionData.name}</p>
                        <p><Text strong>Organized By:</Text> {competitionData.organizedBy}</p>
                        <p><Text strong>Start Time:</Text> {moment(competitionData.startTime).format('DD/MM/YYYY HH:mm:ss')}</p>
                        <p><Text strong>Duration:</Text> {timeInMinutes} phút</p>
                    </Modal>
                </Card>
            </Col>

        </Row>
    );
};

export default JoinCompetition;
