import { Col, Layout, Row, Input, Space, Button, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Link from 'antd/es/typography/Link';
import React from 'react';
import styles from './createQuiz.module.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const items = [
    {
        key: '1',
        label: 'Thông tin cơ bản',
        path: "/createquiz/inforquiz",
    },
    {
        key: '2',
        label: 'Soạn câu hỏi',
        path: '/createquiz/createquestion',
    },
    {
        key: '3',
        label: 'Lịch sử truy cập',
        path: '/history',
    },
    {
        key: '4',
        label: 'Thống kê',
        path: '/statistical',
    },
];
const CreateQuiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onChange = (key) => {
        const selectedTab = items.find(item => item.key === key);
        if (selectedTab) {
            navigate(selectedTab.path);
        }
    };
    return (
        <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
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
                            <Space direction="vertical">
                                <p style={{ fontSize: "22px", fontWeight: "bold" }}>Tạo một đề thi</p>
                            </Space>
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
    );
}

export default CreateQuiz;
