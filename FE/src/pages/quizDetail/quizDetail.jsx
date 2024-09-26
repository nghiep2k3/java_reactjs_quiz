import { Col, Layout, Row, Space, Modal, Avatar, Image, Button, Tabs, Radio, Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    UserOutlined, QuestionCircleOutlined, CheckOutlined, SettingOutlined,
    LikeOutlined, HeartOutlined, DownloadOutlined, FacebookOutlined, TwitterOutlined, TwitchOutlined
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Headers from '../../components/Headers/headers';
const { Header, Content } = Layout;
const items = [
    {
        key: '1',
        label: 'Nội dung đề thi',
        path: "/quizdetail/examcontent",
    },
    {
        key: '2',
        label: 'Kết quả ôn tập',
        path: '',
    },
    {
        key: '3',
        label: 'Thống kê ôn  tập',
        path: '',
    },

];
const QuizDetail = () => {
    const options = [
        {
            value: '15 phút',
            label: '15 phút',
        },
        {
            value: '30 phút',
            label: '30 phút',
        },
        {
            value: '45 phút',
            label: '45 phút',
        },
    ];
    const [selectedTime, setSelectedTime] = useState('30 phút');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const updatedQuiz = { ...quiz, selectedTime };
        localStorage.setItem('quizInfo', JSON.stringify(updatedQuiz));
        setIsModalOpen(false);
        navigate('/doexam')
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [value, setValue] = useState(1);
    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const storedQuiz = localStorage.getItem('quizInfo');
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            setQuiz(parsedQuiz);
        }
    }, []);

    if (!quiz) {
        return <div>Loading...</div>;
    }
    const onChange = (key) => {
        const selectedTab = items.find(item => item.key === key);
        if (selectedTab) {
            navigate(selectedTab.path);
        }
    };
    const handleTimeChange = (value) => {
        setSelectedTime(value);
        const updateQuiz = { ...quiz, selectedTime: value };
        localStorage.setItem('quizInfo', JSON.stringify(updateQuiz));
    }
    return (

        <div style={{ background: "#F1F3F5", height: "2000px" }}>
            <Headers />
            <Layout style={{ justifyContent: 'center' }}>
                <Content>
                    <Row justify="center">
                        <Col style={{ padding: "1.25rem!important" }}>
                            <div style={{
                                width: '1300px',
                                padding: '24px',
                                marginTop: "100px",
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <Space direction="vertical">
                                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>Thông tin đề thi</p>
                                </Space>
                                <Row style={{ gap: "1rem" }}>
                                    <Col span={8}>
                                        <Image src='https://upload-api.eduquiz.io.vn/default/exam/exam-02.png' preview={false}></Image>
                                    </Col>
                                    <Col span={8} style={{ gap: '.75rem' }}>
                                        <div className='d-flex align-items-baseline'><b style={{ fontSize: 24 }}>Người tạo đề thi: </b><p className='fs-5 ps-2'>Nguyễn Thiện Nghiệp</p></div>
                                        <div className='d-flex align-items-baseline'><b style={{ fontSize: 24 }}>Tên bài thi: </b><p className='fs-5 ps-2'>{quiz.title}</p></div>
                                        <div className='d-flex align-items-baseline'><b style={{ fontSize: 24 }}>Cấp độ: </b><p className='fs-5 ps-2'>{quiz.level}</p></div>
                                        <div style={{ display: 'flex', alignItems: "center", gap: '.5rem' }}>
                                            <QuestionCircleOutlined /> {quiz.questions?.length}
                                            <LikeOutlined />
                                            <DownloadOutlined />
                                        </div>
                                        <div style={{ display: 'flex', marginTop: '20px', alignItems: "center", gap: '1.2rem' }}>
                                            <LikeOutlined style={{ fontSize: '23px' }} />
                                            <HeartOutlined style={{ fontSize: '23px' }} />
                                        </div>
                                    </Col>
                                    <Col span={7}>
                                        <p style={{ fontSize: '20px' }}>Chia sẻ đề thi</p>
                                        <div style={{ fontSize: '20px', gap: '1rem !important' }}>
                                            <FacebookOutlined />
                                            <TwitterOutlined />
                                            <TwitchOutlined />
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <Button type="primary" htmlType="submit" style={{ width: '100px' }}>Sao chép</Button>
                                            <Button type="primary" htmlType="submit" style={{ width: '200px', marginLeft: '20px' }}>Quét mã QRcode</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '20px', gap: "1rem" }}>
                                    <Col span={8}><Button type="primary" htmlType="submit" style={{ width: '100%' }}>Thẻ ghi nhớ</Button></Col>
                                    <Col span={8}><Button onClick={showModal} type="primary" htmlType="submit" style={{ width: '100%' }}>Bắt đầu ôn thi</Button></Col>
                                    <Modal style={{ fontSize: '16px' }} title="Chế độ luyện thi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                        <Radio.Group onChange={onChangeRadio} value={value}>
                                            <Radio value={2}>Thi thử</Radio>
                                        </Radio.Group> <br />
                                        <CheckOutlined /> Không giới hạn thời gian làm đề thi <br />
                                        <CheckOutlined /> Không hiển thị ngay đáp án <br />
                                        <CheckOutlined /> Kết quả được hiển thị ngay sau khi kiểm tra
                                        <hr style={{ borderWidth: '0px 0px thin', borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.12)' }} />
                                        <div style={{ display: 'flex', gap: '.5rem' }}>
                                            <SettingOutlined />
                                            <h3>Cài đặt đề thi</h3>
                                        </div>
                                        <p style={{ fontWeight: 'bold' }}>Thời gian làm bài thi</p>
                                        <Space.Compact>
                                            <Select
                                                defaultValue={selectedTime || "30 phút"}
                                                onChange={handleTimeChange} options={options} />
                                        </Space.Compact>
                                    </Modal>
                                    <Col span={7}><Button type="primary" htmlType="submit" style={{ width: '100%' }}>Tải về</Button></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <Layout style={{ marginTop: '20px', minHeight: '100vh', justifyContent: 'center' }}>
                <Content>
                    <Row justify="center">
                        <Col>
                            <div style={{
                                width: '1300px',
                                padding: '24px',
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <Tabs activeKey={[location.pathname]}
                                    items={items.map(item => ({
                                        key: item.key,
                                        label: item.label
                                    }))} onChange={onChange}>
                                </Tabs>
                                <Outlet />
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            {/* <h1>Chi tiết đề thi: {quiz.title}</h1>
            <p>Trình độ: {quiz.level}</p>
            <p>Mô tả: {quiz.description}</p>
            <h3>Các câu hỏi:</h3>
            <ul>
                {quiz.questions && quiz.questions.map((q, index) => (
                    <li key={index}>
                        <strong>{q.questionText}</strong>
                        <ul>
                            {q.options.map(option => (
                                <li key={option.id}>
                                    {option.text} {option.correct ? "(Correct)" : ""}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default QuizDetail;
