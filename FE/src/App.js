import React from 'react';
import { AccountBookOutlined, UserOutlined, FormOutlined, BookOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Card, Image, Layout, Menu, theme } from 'antd';
import { Button } from 'antd/es/radio';
import Search from 'antd/es/transfer/search';
import Slider from 'react-slick';
// import Footer from '../../../components/Footer/footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from './components/Footer/footer';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
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
function App() {
  return (
    <div>
      
    </div>
  );
}

export default App;
