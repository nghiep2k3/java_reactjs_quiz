import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Card, Typography, Badge, Button, Skeleton } from 'antd';
import { StarFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './Test.css'; // Import your CSS file
import styles from './Test.module.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

const QuizCard = ({ quiz }) => (
    <Card
        hoverable
        className="quiz-card"
        cover={
            <div style={{}} className="quiz-card-cover">
                {quiz.image ? (
                    <img src={quiz.image} alt={quiz.title} className="quiz-image" />
                ) : (
                    <div className="placeholder-cover d-flex justify-content-center align-items-center h-100">🔔</div>
                )}
            </div>
        }
    >
        <Link to={`/quizdetail/examcontent/${quiz.id}`}>
            <Title level={4} className="quiz-title">
                {quiz.title} - {quiz.id}
            </Title>
            <Text type="secondary" className="quiz-description">
                {quiz.description ? quiz.description : "No description available."}
            </Text>
            <div className="quiz-badge">
                <Badge count="QUIZ" style={{ backgroundColor: '#6b238e' }} />
            </div>
            <div className="quiz-footer">
                <Text>
                    {quiz.questions.length} Questions • {quiz.plays ? quiz.plays : 'No plays yet'}
                </Text>
            </div>
        </Link>
    </Card>
);
const QuizCardByCate = ({ quiz }) => (
    <Card
        hoverable
        className="quiz-card"
        cover={
            <div style={{}} className="quiz-card-cover">
                {quiz.image ? (
                    <img src={quiz.image} alt={quiz.title} className="quiz-image" />
                ) : (
                    <div className="placeholder-cover d-flex justify-content-center align-items-center h-100">🔔</div>
                )}
            </div>
        }
    >
        <Link to={`/quizdetail/examcontent/${quiz.id}`}>
            <Title level={4} className="quiz-title">
                {quiz.title} - {quiz.id}
            </Title>
            <Text type="secondary" className="quiz-description">
                {quiz.description ? quiz.description : "No description available."}
            </Text>
            <div className="quiz-badge">
                <Badge count="QUIZ" style={{ backgroundColor: '#6b238e' }} />
            </div>
            <div className="quiz-footer">
                <Text>
                    {quiz.questions.length} Questions • {quiz.plays ? quiz.plays : 'No plays yet'}
                </Text>
            </div>
        </Link>
    </Card>
);

const ListItemQuiz = ({ item }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = React.useRef(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <div style={{ display: 'none !important' }} />,
        prevArrow: <div style={{ display: 'none !important' }} />,
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <StarFilled style={{ color: '#f0c00e', marginRight: '5px' }} />
                <Title level={3}>{item.name}</Title>
            </div>

            {/* Nút Prev */}
            {currentSlide > 0 && (
                <Button
                    icon={<LeftOutlined />}
                    onClick={handlePrev}
                    style={{ position: 'absolute', top: '60%', left: 0, zIndex: 10, transform: 'translateY(-50%)' }}
                />
            )}
            {console.log(222, item.quizResponses.length)}
            <Slider ref={sliderRef} {...settings} className={item.quizResponses.length <= 4 ? 'auto-width' : 'fixed-width'}>
                {item.quizResponses.map((quiz) => (
                    <div key={quiz.id}>
                        <QuizCard quiz={quiz} />
                    </div>
                ))}
            </Slider>

            {/* Nút Next */}
            {currentSlide < item.quizResponses.length - settings.slidesToShow && (
                <Button
                    icon={<RightOutlined />}
                    onClick={handleNext}
                    style={{ position: 'absolute', top: '60%', right: 0, zIndex: 10, transform: 'translateY(-50%)' }}
                />
            )}
        </div>
    );
};

const Test = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [data, setData] = useState([]);
    const [dataCardQuery, setDataCardQuery] = useState([]);
    const token = localStorage.getItem("token");
    const handleCategorySelect = async (categoryId) => {
        setSelectedCategory(categoryId);

        console.log("categoryId", categoryId);

        if (categoryId === "") {
            await fetchAllQuizs();
        } else {
            setData([]);
            try {
            	const response = await axios.get(`https://api.trandai03.online/api/v1/quizs/category/${categoryId}`, {
            		headers: {
            			'Authorization': `Bearer ${localStorage.getItem("token")}`,
            			'Content-Type': 'application/json',
            			'Accept': '*/*'
            		}
            	});
    
            	console.log("data theo cate",response.data);
            	// console.log("data theo cate",response.data[0].category.name);
    
            } catch (error) {
            	console.error('Error fetching quizzes:', error);
            }
        }

    };
    const fetchAllQuizs = async () => {
        try {
            const response = await axios.get(`https://api.trandai03.online/api/v1/quizs/getAllQuizByCategory`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            setData(response.data);
            console.log("data", response.data);

        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    'https://api.trandai03.online/api/v1/category/getAll',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                        },
                    }
                );
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        fetchAllQuizs();
    }, []);


    if (!data.length) {
        return <div>
            <div className={styles.container}>
                <b className={styles.label}>Filter: </b>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    className={styles.select}
                >
                    <option value="">--Tất cả--</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.id} - {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <h1>Không có câu hỏi</h1>
        </div>;
    }

    return (
        <div>
            <div className={styles.container}>
                <b className={styles.label}>Filter: </b>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    className={styles.select}
                >
                    <option value="">--Tất cả--</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.id} - {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='mt-2'>
                {data.map((quiz) => (
                    <ListItemQuiz key={quiz.id} item={quiz} />
                ))}
            </div>
        </div>
    );
};

export default Test;
