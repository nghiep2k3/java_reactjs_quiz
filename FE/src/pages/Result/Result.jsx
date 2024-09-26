import React, { useEffect, useState } from 'react';
import styles from './Result.module.css'; // Import CSS module

const Result = () => {
  const [result, setResult] = useState(null);

  // Giả lập gọi API để lấy kết quả
  useEffect(() => {
    const fetchData = async () => {
      const resultData = {
        userName: "Nguyen Van A",
        totalScore: 85,
        correctAnswers: 18,
        incorrectAnswers: 2,
        questions: [
          {
            questionText: "Câu hỏi 1?",
            userAnswer: "B",
            correctAnswer: "A",
            options: [
              { id: 1, text: "A" },
              { id: 2, text: "B" },
              { id: 3, text: "C" },
              { id: 4, text: "D" },
            ],
          },
          {
            questionText: "Câu hỏi 2?",
            userAnswer: "A",
            correctAnswer: "A",
            options: [
              { id: 1, text: "A" },
              { id: 2, text: "B" },
              { id: 3, text: "C" },
              { id: 4, text: "D" },
            ],
          },
          {
            questionText: "Câu hỏi 2?",
            userAnswer: "B",
            correctAnswer: "D",
            options: [
              { id: 1, text: "A" },
              { id: 2, text: "B" },
              { id: 3, text: "C" },
              { id: 4, text: "D" },
            ],
          },
          {
            questionText: "Câu hỏi 2?",
            userAnswer: "A",
            correctAnswer: "C",
            options: [
              { id: 1, text: "A" },
              { id: 2, text: "B" },
              { id: 3, text: "C" },
              { id: 4, text: "D" },
            ],
          },
          // Các câu hỏi khác...
        ],
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult(resultData);
    };

    fetchData();
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.resultContainer}>
      <h2>Kết quả làm bài</h2>
      <div className={styles.resultCard}>
        <p><strong>Tên người làm bài:</strong> {result.userName}</p>
        <p><strong>Tổng điểm:</strong> {result.totalScore}</p>
        <p><strong>Số câu đúng:</strong> {result.correctAnswers}</p>
        <p><strong>Số câu sai:</strong> {result.incorrectAnswers}</p>
      </div>

      <div className={styles.questionResult}>
        <h3>Danh sách câu hỏi:</h3>
        <ul className={styles.questionList}>
          {result.questions.map((question, index) => (
            <li key={index} className={styles.questionItem}>
              <p className={styles.questionText}>
                <strong>Câu {index + 1}:</strong> {question.questionText}
              </p>
              <p className={styles.correctAnswer}>
                <strong>Đáp án đúng:</strong> {question.correctAnswer}
              </p>
              <div className={styles.optionsContainer}>
                {question.options.map((option, idx) => {
                  const isUserAnswer = option.text === question.userAnswer;
                  const isCorrectAnswer = option.text === question.correctAnswer;
                  return (
                    <div
                      key={idx}
                      className={`${styles.optionItem} 
                      ${isCorrectAnswer ? styles.correct : ''}
                      ${isUserAnswer && !isCorrectAnswer ? styles.incorrect : ''}`}
                    >
                      {option.text}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
