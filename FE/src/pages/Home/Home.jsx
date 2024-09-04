import React, { useState } from 'react';
import { AccountBookOutlined, UserOutlined, FormOutlined, BookOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Card, Image, Layout, Menu, theme } from 'antd';
import { Button } from 'antd/es/radio';
import styles from './Home.module.css';
import Search from 'antd/es/transfer/search';
import Slider from 'react-slick';
import MyLibrary from '../../components/myLibrary/myLibrary'
import CourseCard from '../../components/courseCard/courseCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from '../../components/Footer/footer';
const { Header, Content, Sider } = Layout;
const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
};
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
    const [selectedKey, setSelectedKey] = useState('1');
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const renderContent = () => {
        if (selectedKey === '2') {
            return <MyLibrary />;  // Show MyLibrary component when 'Thư viện của tôi' is clicked
        }
        // Default content (e.g., CourseCard)
        return (
            <>
                <div style={{ margin: "48px" }}>
                    <h3 style={{ fontSize: "2.25rem", fontWeight: "600", textAlign: "center" }}>Bạn sẽ dạy gì hôm nay?</h3>
                </div>
                <Search placeholder="input search text" enterButton="Search" size="large" />
                <div style={{ marginTop: "100px" }}>
                    <h3 style={{ fontSize: "2.25rem", fontWeight: "600" }}>Khởi động vui vẻ</h3>
                </div>
                <CourseCard />
            </>
        );
    };
    return (
        <Layout hasSider>
            <Sider
                style={{
                    siderStyle,
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
                    onClick={handleMenuClick}
                // style={{ width: '100%' }}
                />
            </Sider>

            <Layout>
                <Header style={{ backgroundColor: "#fff" }}>
                    <Search placeholder="input search text" enterButton="Search" size="large" />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 50px 0',
                        padding: 24,
                        minHeight: 1000,
                        backgroundColor: "#f2f2f2",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {renderContent()}  {/* Render content based on selected menu */}
                </Content>
                <MyFooter />
            </Layout>
        </Layout>
    );
};

export default Home;
