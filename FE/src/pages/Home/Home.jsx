import React, { useState } from 'react';
import { AccountBookOutlined, UserOutlined, FormOutlined, BookOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Card, Image, Layout, Menu, theme } from 'antd';
import { Button } from 'antd/es/radio';
import Search from 'antd/es/transfer/search';
import Slider from 'react-slick';
import MyLibrary from '../../components/myLibrary/myLibrary'
import CourseCard from '../../components/courseCard/courseCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from '../../components/Footer/footer';
import { Link, Outlet } from 'react-router-dom';

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
                    <Card title="Quiz 1">
                        Content 1
                        <br />
                        <Link to="/ViewQuiz"><Button >Bài 1</Button></Link>
                    </Card>
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
    );
};

export default Home;
