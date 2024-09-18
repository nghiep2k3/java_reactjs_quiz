import { Col, Layout, Row, Space, Menu, Avatar, Image, Button, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined, QuestionCircleOutlined, LikeOutlined, HeartOutlined, DownloadOutlined, FacebookOutlined, TwitterOutlined, TwitchOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
    return (

        <div style={{ background: "#F1F3F5", height: "2000px" }}>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', lineHeight: "40px" }}>
                    <Image src="https://cf.quizizz.com/img/logos/Purple.webp"
                        preview={false}
                        width={150} style={{ float: 'left' }}>
                    </Image>

                    <Avatar style={{ float: 'right', backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Header>
            </Layout>
            <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
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
                                        <h2>{quiz.title}</h2>
                                        <p style={{ fontWeight: "bold" }}>{quiz.level}</p>
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
                                    <Col span={8}><Button type="primary" htmlType="submit" style={{ width: '100%' }}>Bắt đầu ôn thi</Button></Col>
                                    <Col span={7}><Button type="primary" htmlType="submit" style={{ width: '100%' }}>Tải về</Button></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <Layout style={{ marginTop: '30px', minHeight: '100vh', justifyContent: 'center' }}>
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
