import React, { useEffect, useState } from 'react';
import { Card, Tag, List, Avatar, Progress, Affix, Menu } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './Result.module.css';

const Result = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const resultData = JSON.parse(localStorage.getItem('quizResult'));
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult(resultData);
    };
    fetchData();
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  const questionLength = result.resultDetails.length;
  const calculateScorePercent = () => {
    return (result.correctAnswers / questionLength) * 100;
  };

  const scrollToQuestion = (index) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.resultContainer}>
      <Card
        title="Kết quả làm bài"
        style={{ marginBottom: '24px', textAlign: 'center' }}
        bordered={false}
      >
        <p><strong>Tên người làm bài:</strong> {result.userName}</p>
        <p><strong>Tổng điểm:</strong> {result.score}</p>
        <Progress
          type="circle"
          percent={calculateScorePercent()}
          format={percent => `${percent.toFixed(0)}%`}
        />
        <p><strong>Số câu đúng:</strong> <Tag color="green">{result.correctAnswers}</Tag></p>
        <p><strong>Số câu sai:</strong> <Tag color="red">{result.incorrectAnsers}</Tag></p>
        <strong>Thời gian làm bài:</strong>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#3E65FE" }}>
          {result.submittedTime}</p>
      </Card>
      <Affix offsetTop={0}>
        <Menu mode="horizontal" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          {result.resultDetails.map((_, index) => (
            <Menu.Item key={index} onClick={() => scrollToQuestion(index)}>
              Câu {index + 1}
            </Menu.Item>
          ))}
        </Menu>
      </Affix>
      <Card title="Chi tiết câu hỏi">
        <List
          itemLayout="vertical"
          dataSource={result.resultDetails}
          renderItem={(question, index) => (
            <List.Item key={index} id={`question-${index}`}>
              <List.Item.Meta
                avatar={<Avatar icon={question.selectedOptionId === question.correctOptionId ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <CloseCircleOutlined style={{ color: '#f5222d' }} />} />}
                title={<strong>Câu {index + 1}: {question.questionText}</strong>}
              />
              <p><strong>Đáp án đúng:</strong> {question.correctAnswer}</p>
              <div className={styles.optionsContainer}>
                {question.options.map((option, idx) => {
                  const isUserAnswer = option.id === question.selectedOptionId;
                  const isCorrectAnswer = option.id === question.correctOptionId;
                  return (
                    <Tag
                      key={idx}
                      color={isCorrectAnswer ? 'green' : isUserAnswer ? 'red' : 'default'}
                    >
                      {String.fromCharCode(65 + idx)}. {option.text}
                    </Tag>
                  );
                })}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Result;
