import React from 'react';
import Headers from '../../components/Headers/headers';
import { Col, Layout, Row, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';

const DoExam = () => {
    return (
        <div>
            <Headers />
            <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
                <Content>
                    <Row>
                        <Col span={7}>
                            <div style={{
                                padding: '24px',
                                marginTop: "100px",
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <Space direction="vertical">
                                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>Tạo một đề thi</p>
                                </Space>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div style={{
                                padding: '24px',
                                marginTop: "100px",
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <Space direction="vertical">
                                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>Tạo một đề thi</p>
                                </Space>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div style={{
                                padding: '24px',
                                marginTop: "100px",
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px'
                            }}>
                                <Space direction="vertical">
                                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>Tạo một đề thi</p>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
}

export default DoExam;
