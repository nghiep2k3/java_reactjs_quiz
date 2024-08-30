import React from 'react';
import { AccountBookOutlined, UserOutlined, FormOutlined, BookOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Card, Image, Layout, Menu, theme } from 'antd';
import { Button } from 'antd/es/radio';
import styles from './Home.Module.css';
import Search from 'antd/es/transfer/search';
import Slider from 'react-slick';
import Footer from '../components/footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from '../components/footer';
const { Header, Content, Sider } = Layout;

const items = [
    {
        key: '1',
        icon: React.createElement(BookOutlined),
        label: 'Khám phá',
    },
    {
        key: '2',
        icon: React.createElement(AccountBookOutlined),
        label: 'Thư viện của tôi',
    },
    {
        key: '3',
        icon: React.createElement(FormOutlined),
        label: 'Báo cáo',
    },
    {
        key: '4',
        icon: React.createElement(SettingOutlined),
        label: 'Cài đặt',
    },
    {
        key: '5',
        icon: React.createElement(UserOutlined),
        label: 'Hồ sơ'
    },
    {
        key: '6',
        icon: React.createElement(LogoutOutlined),
        label: 'Đăng xuất'
    },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true
};
const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const contentStyle = {
        display: 'flex',
        justifyContent: 'space-around',
    };
    return (
        <Layout>
            <Sider
                style={{
                    backgroundColor: "#fff",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px 0',
                    borderRight: '1px solid #f2f2f2'
                }}
            >
                <Image
                    src='https://cf.quizizz.com/img/logos/Purple.webp'
                    preview={false}
                    width={150}
                    style={{ marginBottom: '20px' }}
                />
                <Button
                    style={{
                        textAlign: "center",
                        height: "40px",
                        lineHeight: "40px",
                        borderRadius: "1.2em",
                        backgroundImage: "linear-gradient(to right, #348F50 0%, #56B4D3  51%, #348F50  100%)",
                        color: "#fff",
                        width: '70%',
                        marginBottom: '20px',
                    }}
                >
                    Thêm mới
                </Button>

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ width: '100%' }}
                />
            </Sider>

            <Layout>
                <Header
                    style={{ backgroundColor: "#fff" }}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 50px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 1000,
                            backgroundColor: "#f2f2f2",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div style={{ margin: "48px" }}>
                            <h3 style={{ fontSize: "2.25rem", fontWeight: "600", textAlign: "center" }}>Bạn sẽ dạy gì hôm nay?</h3>
                        </div>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                            style={{
                                gridColumn: 3 / 11,
                                height: 200,
                                width: 200,
                            }}
                        />
                        <div style={{ marginTop: "100px" }}>
                            <h3 style={{ fontSize: "2.25rem", fontWeight: "600" }}>Khởi động vui vẻ</h3>
                        </div>
                        <Slider {...settings}
                            style={{ margin: '20px 0' }}>
                            <div>
                                <Card title="Quiz 1">Content 1</Card>
                            </div>
                            <div>
                                <Card title="Quiz 2">Content 2</Card>
                            </div>
                            <div>
                                <Card title="Quiz 3">Content 3</Card>
                            </div>
                            <div>
                                <Card title="Quiz 4">Content 4</Card>
                            </div>
                            <div>
                                <Card title="Quiz 5">Content 5</Card>
                            </div>
                            <div>
                                <Card title="Quiz 6">Content 6</Card>
                            </div>
                        </Slider>
                    </div>
                </Content>
                <MyFooter></MyFooter>
            </Layout>
        </Layout>
    );
};

export default Home;
