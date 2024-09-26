import React, { useEffect, useState } from 'react';
import './ExamContent.css'; // Import CSS for styling

const ExamContent = () => {
    const [quiz, setQuiz] = useState(null);

    // Lấy dữ liệu từ localStorage khi component mount
    useEffect(() => {
        const storedQuiz = localStorage.getItem('quizInfo');
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            setQuiz(parsedQuiz);
        }
    }, []);

    // Nếu quiz chưa load xong, hiển thị Loading
    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="exam-container">
            <h3>Các câu hỏi:</h3>
            <ul className="questions-list">
                {quiz.questions.map((q, index) => (
                    <li key={index} className="question-item">
                        <strong className="question-title">
                            Câu {index + 1}: {q.questionText}
                        </strong>
                        <div className="options-grid">
                            {q.options.map((option, idx) => (
                                <div key={option.id} className={`option-item ${option.correct ? 'correct' : ''}`}>
                                    {String.fromCharCode(65 + idx)}. {option.text} {option.correct && <span className="correct-text">(Đúng)</span>}
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExamContent;
