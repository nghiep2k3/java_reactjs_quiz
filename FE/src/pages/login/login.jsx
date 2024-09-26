import React, { useState } from 'react';
import { Button, Form, Input, Checkbox, Card, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.Module.css';
import axios from 'axios';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        console.log('Success:', values);
        setLoading(true);
        try {
            const { username, password } = values;
            const res = await axios.post('', {
                username,
                password
            });
            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem('authToken', token);
                notification.success({
                    message: "Đăng nhập",
                    description: "Thành công!"
                })
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                notification.error({
                    message: "Đăng nhập",
                    description: "Không thành công!"
                })
            }
        } catch (error) {
            notification.error({
                message: "Đăng nhập",
                description: "Thông tin không chính xác!"
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <h2>Đăng Nhập</h2>
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Ghi nhớ tôi</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Quên mật khẩu?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Đăng Nhập
                        </Button>
                        <br />
                        Hoặc <a href="/register">Đăng ký ngay!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;