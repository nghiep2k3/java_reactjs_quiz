import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const storedQuiz = localStorage.getItem('quizInfo');
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            setQuizzes([parsedQuiz]);
        }
    }, []);

    return (
        <div>
            <h1>Danh sách các đề thi</h1>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={quizzes}
                renderItem={quiz => (
                    <List.Item>
                        <Link to='/quizdetail'>

                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta title={quiz.title} description={`Số lượng câu hỏi: ${quiz.questions?.length}`}></Meta>
                                <p>Trình độ: {quiz.level || "Không có"}</p>
                                <p>Mô tả: {quiz.description}</p>

                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default QuizList;
