import React, { useEffect, useState } from 'react';

const ExamContent = () => {
    const [quiz, setQuiz] = useState(null);
    useEffect(() => {
        const storedQuiz = localStorage.getItem('quizInfo');
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            setQuiz(parsedQuiz);
        }
    }, []);

    if (!quiz) {
        return <div>Loading...</div>;
    }
    console.log("aaa", quiz);

    return (
        <div>
            <h3>Các câu hỏi:</h3>
            <ul>
                {quiz.questions && quiz.questions.map((q, index) => (
                    <li key={index}>
                        <strong>Câu {index + 1}: {q.questionText}</strong>
                        <ul>
                            {q.options.map(option => (
                                <li key={option.id}>
                                    {option.text} {option.correct ? "(Correct)" : ""}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExamContent;
