import React, { useState } from 'react';
import Slider from 'react-slick';
import { Card, Typography, Badge, Button } from 'antd';
import { StarFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { Text, Title } = Typography;

const quizData = [
  { id: 1, title: 'Vòng quanh thế giới', description: 'Vòng quanh thế giới', questions: 8, plays: '68.4K', icon: '🌍' },
  { id: 2, title: 'Đúng hay sai', description: 'Đúng hay sai', questions: 12, plays: '112.8K', icon: '🔔' },
  { id: 3, title: 'Làm quen với toán', description: 'Làm quen với toán', questions: 14, plays: '14.4K', icon: '👤' },
  { id: 4, title: 'Câu đố trước khi lớp bắt đầuvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', description: 'Câu đố trước khi lớp bắt đầu', questions: 4, plays: '23.9K', icon: '😊' },
  { id: 5, title: 'Câu đố trước khi lớp bắt đầu', description: 'Câu đố trước khi lớp bắt đầu', questions: 4, plays: '23.9K', icon: '😊' },
  { id: 6, title: 'Câu đố trước khi lớp bắt đầu', description: 'Câu đố trước khi lớp bắt đầu', questions: 4, plays: '23.9K', icon: '😊' },
  { id: 7, title: 'Câu đố trước khi lớp bắt đầu', description: 'Câu đố trước khi lớp bắt đầu', questions: 4, plays: '23.9K', icon: '😊' },
  { id: 8, title: 'Câu đố trước khi lớp bắt đầu', description: 'Câu đố trước khi lớp bắt đầu', questions: 4, plays: '23.9K', icon: '😊' },
  { id: 9, title: 'Câu đố trước khi lớp bắt đầu', description: 'Câu đố trước khi lớp bắt đầu', questions: 4, plays: '23.9K', icon: '😊' },
];

const QuizCard = ({ quiz }) => (
  <Card
    hoverable
    style={{ width: 290, height: 300, margin: '0 auto', zIndex: 99 }}
    cover={
      <div style={{ backgroundColor: '#6b238e', color: 'white', textAlign: 'center', padding: '30px 0', fontSize: '24px' }}>
        {quiz.icon}
      </div>
    }
  >
     <Title
      level={4}
      style={{
        height: 50, // Giới hạn chiều cao cho hai dòng văn bản
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2, // Giới hạn hiển thị 2 dòng
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.2em', // Điều chỉnh khoảng cách giữa các dòng
        whiteSpace: 'normal', // Đảm bảo văn bản xuống dòng
      }}
    >
      {quiz.title}
    </Title>
    <Text type="secondary">{quiz.description}</Text>
    <div style={{ marginTop: '10px' }}>
      <Badge count="QUIZ" style={{ backgroundColor: '#6b238e' }} />
    </div>
    <div style={{ marginTop: '10px' }}>
      <Text>{quiz.questions} Câu hỏi • {quiz.plays} lần chơi</Text>
    </div>
  </Card>
);


const SliderItems = () => {
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
        <Title level={3}>Ice breaker</Title>
      </div>
      
      {/* Nút Prev */}
      {currentSlide > 0 && (
        <Button
          icon={<LeftOutlined />}
          onClick={handlePrev}
          style={{ position: 'absolute', top: '60%', left: 0, zIndex: 10, transform: 'translateY(-50%)' }}
          onMouseEnter={() => setCurrentSlide(currentSlide)}
        />
      )}

      <Slider ref={sliderRef} {...settings}>
        {quizData.map((quiz) => (
          <div key={quiz.id}>
            <QuizCard quiz={quiz} />
          </div>
        ))}
      </Slider>
      
      {/* Nút Next */}
      {currentSlide < quizData.length - settings.slidesToShow && (
        <Button
          icon={<RightOutlined />}
          onClick={handleNext}
          style={{ position: 'absolute', top: '60%', right: 0, zIndex: 10, transform: 'translateY(-50%)' }}
          onMouseEnter={() => setCurrentSlide(currentSlide)}
        />
      )}
    </div>
  );
};

export default SliderItems;
