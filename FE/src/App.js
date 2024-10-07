import React, { useState } from "react";
import {
  AccountBookOutlined,
  UserOutlined,
  FormOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Image, Layout, Menu, Modal, Space, Button, Dropdown } from "antd";
import Search from "antd/es/transfer/search";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MyFooter from "./components/Footer/footer";
import "./App.css";
import Meta from "antd/es/card/Meta";

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <BookOutlined />,
    label: "Khám phá",
    path: "/",
  },
  {
    key: "2",
    icon: <AccountBookOutlined />,
    label: "Thư viện của tôi",
    path: "/mylibrary",
  },
  {
    key: "3",
    icon: <FormOutlined />,
    label: "Kết quả thi của tôi",
    path: "/reportquizresult",
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "Đề thi yêu thích",
    path: "/favorexam",
  },
  {
    key: "5",
    icon: <FileOutlined />,
    label: "Quản lý đề thi",
    path: "/quizlist",
  },
  {
    key: "7",
    icon: <SettingOutlined />,
    label: "Cài đặt",
    path: "/settings",
  },
  {
    key: "6",
    icon: <LogoutOutlined />,
    label: "Lớp học tập",
    path: "/class",
  },
];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  const menu = (
    <Menu>
      {username ? (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <a href="/profile">Hồ sơ</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="3" icon={<UserOutlined />}>
          <a href="/login">Đăng nhập</a>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <div>
      <Layout>
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            backgroundColor: "#fff",
            borderRight: "1px solid #f2f2f2",
            padding: "20px 0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Image
              src="https://cf.quizizz.com/img/logos/Purple.webp"
              preview={false}
              width={collapsed ? 50 : 150}
            />
          </div>

          <Modal
            title="Tạo đề thi mới?"
            style={{ textAlign: "center" }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Card
              hoverable
              onClick={() => {
                const username = localStorage.getItem("username");
                if (username) {
                  window.location.href = "/createquiz/inforquiz";  // Chuyển hướng tới trang tạo đề thi
                } else {
                  window.location.href = "/login";  // Chuyển hướng tới trang đăng nhập
                }
                handleCancel();  // Đóng modal
              }}
              style={{
                width: 240,
                margin: "0 auto",
              }}
              cover={
                <img
                  alt="example"
                  src="https://templatelab.com/wp-content/uploads/2017/04/puzzle-piece-template-13.jpg"
                />
              }
            >
              <Meta title="Quiz" description="Đưa ra đánh giá và thực hành" />
            </Card>
          </Modal>

          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            style={{ fontSize: "16px" }}
          >
            <div
              style={{
                textAlign: "left",
                marginTop: "20px",
              }}
            >
              <Button type="text" onClick={toggleCollapse} style={{
                textAlign: "left"
              }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </div>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{collapsed ? null : item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout>
          <Header
            style={{
              gap: ".5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              padding: "10px 20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Search
              placeholder="Tìm kiếm..."
              enterButton="Tìm kiếm"
              size="middle"
              style={{ width: "40%" }}
            />

            <Button
              type="primary"
              onClick={showModal}
              style={{
                height: "40px",
                lineHeight: "40px",
                borderRadius: "1.2em",
                backgroundImage:
                  "linear-gradient(90deg, rgb(62, 101, 254) 0%, rgb(210, 60, 255) 100%)",
                color: "#fff",
                width: "150px",
              }}
            >
              Tạo đề thi
            </Button>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <Space size="large" align="center">
                <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
              </Space>
            </Dropdown>
          </Header>

          <Content
            style={{
              minHeight: "100vh",
              padding: "24px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Outlet />
          </Content>

          <MyFooter />
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
