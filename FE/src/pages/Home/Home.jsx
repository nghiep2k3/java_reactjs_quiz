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
            <CourseCard></CourseCard>
        </div>
    );
};

export default Home;
