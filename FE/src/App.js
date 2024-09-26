import React, { useState } from "react";
import {
  AccountBookOutlined,
  UserOutlined,
  FormOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
  FileOutlined
} from "@ant-design/icons";
import { Card, Image, Layout, Menu, Modal } from "antd";
import { Button } from "antd/es/radio";
import Search from "antd/es/transfer/search";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyFooter from "./components/Footer/footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Meta from "antd/es/card/Meta";
const { Header, Content, Sider } = Layout;

const items = [
  { key: "1", icon: <BookOutlined />, label: "Khám phá", path: "/" },
  { key: "2", icon: <AccountBookOutlined />, label: "Thư viện của tôi", path: "/mylibrary" },
  { key: "3", icon: <FormOutlined />, label: "Báo cáo", path: "/reports" },
  { key: "4", icon: <SettingOutlined />, label: "Cài đặt", path: "/settings" },
  { key: "5", icon: <UserOutlined />, label: "Hồ sơ", path: "/profile" },
  { key: "6", icon: <FileOutlined />, label: "Đề thi", path: "/quizlist" },
  { key: "7", icon: <LogoutOutlined />, label: "Đăng nhập", path: "/login" },
];


const App = () => {
  const location = useLocation();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
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
                "linear-gradient(90.57deg, rgb(62, 101, 254) 0%, rgb(210, 60, 255) 100%)",
              color: "#fff",
              width: "70%",
              marginBottom: "20px",
            }}

          >
            Thêm mới
          </Button>
          <Modal title="Bạn muốn tạo gì?"
            style={{ textAlign: 'center' }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Link to={"/createquiz/inforquiz"}>
              <Card
                hoverable
                onClick={handleCancel}
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
            defaultSelectedKeys={[location.pathname]}
            style={{ width: "100%" }}
          >
            {items.map((item) => (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
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
