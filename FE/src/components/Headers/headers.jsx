import { Avatar, Image, Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
const Headers = () => {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', lineHeight: "40px" }}>
                <Image src="https://cf.quizizz.com/img/logos/Purple.webp"
                    preview={false}
                    width={150} style={{ float: 'left' }}>
                </Image>

                <Avatar style={{ float: 'right', backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Header>
        </Layout>
    );
}

export default Headers;
