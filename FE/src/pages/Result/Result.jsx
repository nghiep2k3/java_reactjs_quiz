import React, { useEffect, useState } from 'react';
import { Card, Tag, List, Avatar, Progress, Affix, Menu } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './Result.module.css';
import Loading from '../../components/loading/loading';

const Result = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const resultData = JSON.parse(localStorage.getItem('Result'));
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult(resultData);
    };
    fetchData();
  }, []);
  if (!result) {
    return <Loading></Loading>
  }

  const questionLength = result.resultQuestionResponses.length;
  const correctAnswers = result.resultQuestionResponses.filter(opt => opt.isCorrect)
  const calculateScorePercent = () => {
    return (correctAnswers.length / questionLength) * 100;
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
        <p><strong>Tên người làm bài:</strong> {result.username}</p>
        <p><strong>Tổng điểm:</strong> {result.score}</p>
        <Progress
          type="circle"
          percent={calculateScorePercent()}
          format={percent => `${percent.toFixed(0)}%`}
        />
        <p><strong>Số câu đúng:</strong> <Tag color="green">{correctAnswers.length}</Tag></p>
        <p><strong>Số câu sai:</strong> <Tag color="red">{questionLength - correctAnswers.length}</Tag></p>
        <strong>Thời gian làm bài:</strong>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#3E65FE" }}>
          {result.submittedTime} giây</p>
      </Card>
      <Affix offsetTop={0}>
        <Menu mode="horizontal" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          {result.resultQuestionResponses.map((_, index) => (
            <Menu.Item key={index} onClick={() => scrollToQuestion(index)}>
              Câu {index + 1}
            </Menu.Item>
          ))}
        </Menu>
      </Affix>
      <Card title="Chi tiết câu hỏi">
        <List
          itemLayout="vertical"
          dataSource={result.resultQuestionResponses}
          renderItem={(questionResponse, index) => (
            <List.Item key={index} id={`question-${index}`}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={questionResponse.isCorrect
                      ? <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      : <CloseCircleOutlined style={{ color: '#f5222d' }} />}
                  />
                }
                title={<strong>Câu {index + 1}: {questionResponse.question.question}</strong>}
              />

              <p><strong>Đáp án đúng:</strong></p>

              <div className={styles.optionsContainer}>

                {questionResponse.question.questionChoice.map((option, idx) => {
                  const selectedIds = questionResponse.selectedChoice.map(selected => selected.choice.id);
                  const isUserAnswer = selectedIds.includes(option.id);
                  const isCorrectAnswer = option.isCorrect;

                  return (
                    <Tag
                      key={idx}
                      color={isCorrectAnswer ? 'green' : isUserAnswer ? 'red' : 'default'}
                    >
                      {String.fromCharCode(65 + idx)}. {option.text}
                      {isUserAnswer && ' (Đã chọn)'}
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
