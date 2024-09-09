import { Col, Layout, Row, Input, Space, Checkbox, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Link from 'antd/es/typography/Link';
import React from 'react';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};
const CreateQuiz = () => {
    return (
        <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
            <Content>
                <Row justify="center">
                    <Col>
                        <div style={{
                            width: '1100px',
                            height: '900px',
                            padding: '24px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px'
                        }}>
                            <Space direction="vertical">
                                <p style={{ fontSize: "22px", fontWeight: "bold" }}>Tạo một bài quiz mới</p>
                                <Search
                                    placeholder="Nhập tên chủ đề"
                                    onSearch={onSearch}
                                    style={{
                                        width: 1050,
                                    }}
                                /></Space>
                            <p style={{ fontSize: "17px", fontWeight: "bold" }}>Thêm một câu hỏi mới</p>
                            <Link to={"/createquesion"}>
                                <Button type="primary">Nhiều lựa chọn</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default CreateQuiz;
