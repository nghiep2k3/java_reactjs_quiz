import React, { useState } from "react";
import {
  AccountBookOutlined,
  UserOutlined,
  FormOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Card, Image, Layout, Menu, Modal } from "antd";
import { Button } from "antd/es/radio";
import Search from "antd/es/transfer/search";
import Slider from "react-slick";
// import Footer from '../../../components/Footer/footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from "./components/Footer/footer";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import CourseCard from "./components/courseCard/courseCard";
import MyLibrary from "./components/myLibrary/myLibrary";
import Home from "./pages/Home/Home";
import Meta from "antd/es/card/Meta";
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


const App = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [selectedKey, setSelectedKey] = useState('1');
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  const renderContent = () => {
    if (selectedKey === '2') {
      return <MyLibrary />;  // Show MyLibrary component when 'Thư viện của tôi' is clicked
    }
    // Default content (e.g., CourseCard)
    return (
      // <>
      //   <div style={{ margin: "48px" }}>
      //     <h3 style={{ fontSize: "2.25rem", fontWeight: "600", textAlign: "center" }}>Bạn sẽ dạy gì hôm nay?</h3>
      //   </div>
      //   <Search placeholder="input search text" enterButton="Search" size="large" />
      //   <div style={{ marginTop: "100px" }}>
      //     <h3 style={{ fontSize: "2.25rem", fontWeight: "600" }}>Khởi động vui vẻ</h3>
      //   </div>
      //   <CourseCard />
      // </>
      <Home></Home>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            type="primary"
            onClick={showModal}
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
          <Modal title="Bạn muốn tạo gì?"
            style={{ textAlign: 'center' }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Link to={"/createquiz"}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src="https://templatelab.com/wp-content/uploads/2017/04/puzzle-piece-template-13.jpg" />}
              >
                <Meta title="Quiz" description="Đưa ra đánh giá và thực hành" />
              </Card>
            </Link>
          </Modal>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ width: "100%" }}
            onClick={handleMenuClick}
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
            {renderContent()}
          </Content>
          <MyFooter></MyFooter>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
