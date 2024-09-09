import { Button, Card, Typography } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './courseCard.module.css';
const { Title, Text } = Typography;

const data = [
    {
        id: 1,
        name: "ReactJS Basics",
        image: "https://cdn.worldvectorlogo.com/logos/react-1.svg",
        questions: 50,
        plays: 45.7,
    },
    {
        id: 2,
        name: "Advanced JavaScript",
        image: "https://cdn.worldvectorlogo.com/logos/react-1.svg",
        questions: 100,
        plays: 15,
    },
    {
        id: 3,
        name: "Node.js Mastery",
        image: "https://example.com/nodejs-course.png",
        questions: 3000000,
        plays: 20,
    },
    {
        id: 4,
        name: "Python for Data Science",
        image: "https://example.com/python-course.png",
        questions: 120,
        plays: 60,
    },
    {
        id: 5,
        name: "Machine Learning with TensorFlow",
        image: "https://example.com/ml-course.png",
        questions: 150,
        plays: 25,
    }
];
const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true
};
const CourseCard = () => {
    const displayedData = data.slice(0, 5);
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
                                    <a href={`/details/${data.id}`}>
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
                                    {course.name}
                                </Text>
                                <br></br>
                                <Text style={{ fontSize: '16px', color: '#888' }}>
                                    Câu hỏi: {course.questions}
                                </Text>
                                <br></br>
                                <Text style={{ fontSize: '16px', color: '#888' }}>
                                    Số lượt chơi: {course.plays}
                                </Text>
                                <br></br>
                                {/* <Button
                                    type="primary"
                                    style={{ marginTop: '10px', width: '100%' }}
                                >
                                    Thêm vào giỏ hàng
                                </Button> */}
                            </Card>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

export default CourseCard;
