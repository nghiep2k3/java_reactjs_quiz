import { Card, Image, List, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './courseCard.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const CourseCard = () => {
    const [quizzes, setQuizzes] = useState([]);
    console.log("quiz", quizzes);

    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchAllQuizs = async () => {
            try {
                const response = await axios.get('https://api.trandai03.online/api/v1/quizs/getAllQuiz', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                if (response.status === 200) {
                    setQuizzes(response.data);
                }
            } catch (error) {
                notification.error({
                    message: 'Lỗi khi tải danh sách đề',
                    description: 'Không thể tải danh sách đề, vui lòng thử lại sau.',
                });
            }
        };
        fetchAllQuizs();
    }, []);
    console.log("quiz", quizzes);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true
    };
    const displayedData = quizzes.slice(0, 5);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <div>
            <Slider {...settings}
                style={{ margin: '20px 0' }}>
                {displayedData.map((course) => {
                    return (
                        <div className={`${styles.item} animate__animated animate__fadeInDownBig`} key={course.id}>
                            <Card
                                hoverable
                                style={{ width: 300 }}
                            >
                                {/* objectPosition: '50% 50%',  height: 250*/}
                                <div style={{ height: 250 }}>
                                    <a href={`/details/`}>
                                        <img
                                            alt={course.name}
                                            src={course.image}
                                            style={{ maxWidth: '100%', objectFit: 'cover', width: '100%', objectPosition: '50% 50%' }}
                                            className="product-image"
                                        />
                                    </a>
                                </div>
                                <Title
                                    level={4}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: '100%'
                                    }}
                                >
                                </Title>
                                <Text style={{ fontSize: '16px', color: '#888' }}>
                                    {course.id}
                                </Text> <br />
                                <Text style={{ fontSize: '16px', color: '#888' }}>
                                    {course.title}
                                </Text>
                                <br></br>
                                <Text style={{ fontSize: '16px', color: '#888' }}>
                                    Câu hỏi: {course.questions.length}
                                </Text>
                                <br></br>
                                <Text style={{ fontSize: '16px', color: '#888' }}>
                                    Ngày tạo: {formatDate(course.createdAt)}
                                </Text>
                            </Card>
                        </div>
                    )
                })}
            </Slider>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={quizzes}
                renderItem={quiz => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                        >
                            <Link to={`/quizdetail/examcontent/${quiz.id}`}>
                                <Image src={quiz.image} preview={false}></Image>
                                <p><strong>{quiz.title}</strong></p>
                                <p>Id: {quiz.id}</p>
                                <p><ClockCircleOutlined /> {formatDate(quiz.createdAt)}</p>
                                <p>Số câu hỏi: {quiz.questions?.length}</p>
                                <p>Trình độ: {quiz?.category?.name || "Không có"}</p>
                                <p>Mô tả: {quiz.description}</p>
                            </Link>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default CourseCard;
