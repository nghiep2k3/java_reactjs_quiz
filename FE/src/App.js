import React from "react";
import {
  AccountBookOutlined,
  UserOutlined,
  FormOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Card, Image, Layout, Menu, theme } from "antd";
import { Button } from "antd/es/radio";
import Search from "antd/es/transfer/search";
import Slider from "react-slick";
// import Footer from '../../../components/Footer/footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from "./components/Footer/footer";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: React.createElement(BookOutlined),
    label: "Khám phá",
  },
  {
    key: "2",
    icon: React.createElement(AccountBookOutlined),
    label: "Thư viện của tôi",
  },
  {
    key: "3",
    icon: React.createElement(FormOutlined),
    label: "Báo cáo",
  },
  {
    key: "4",
    icon: React.createElement(SettingOutlined),
    label: "Cài đặt",
  },
  {
    key: "5",
    icon: React.createElement(UserOutlined),
    label: "Hồ sơ",
  },
  {
    key: "6",
    icon: React.createElement(LogoutOutlined),
    label: "Đăng xuất",
  },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  arrows: true,
};
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const contentStyle = {
    display: "flex",
    justifyContent: "space-around",
  };
  return (
    <div>
      <Layout>
        <Sider
          style={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 0",
            borderRight: "1px solid #f2f2f2",
          }}
        >
          <Image
            src="https://cf.quizizz.com/img/logos/Purple.webp"
            preview={false}
            width={150}
            style={{ marginBottom: "20px" }}
          />
          <Button
            style={{
              textAlign: "center",
              height: "40px",
              lineHeight: "40px",
              borderRadius: "1.2em",
              backgroundImage:
                "linear-gradient(to right, #348F50 0%, #56B4D3  51%, #348F50  100%)",
              color: "#fff",
              width: "70%",
              marginBottom: "20px",
            }}
          >
            Thêm mới
          </Button>

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ width: "100%" }}
          />
        </Sider>

        <Layout>
          <Header style={{ backgroundColor: "#fff" }}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Header>
          <Content
            style={{
              minHeight: 500,
              margin: "24px 16px 50px 16px",
            }}
          >
            <Outlet></Outlet>
          </Content>
          <MyFooter></MyFooter>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
