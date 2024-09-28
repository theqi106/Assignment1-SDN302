import React, { useEffect, useState } from 'react';
import { IQuiz } from '../constant/Question';
import { API_GET } from '../service/Quiz';

const QuizList:React.FC<{ newQuiz?: IQuiz, onSelectQuiz:(quiz: IQuiz) => void }> = ({ newQuiz, onSelectQuiz }) => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await API_GET("/quizzes");
            setQuizzes(response as unknown as IQuiz[]);
        };
        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (newQuiz) {
            setQuizzes([...quizzes, newQuiz]);
        }
            },[newQuiz]);

    return (
        <div>
            <h2>Danh Sách Quiz</h2>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz._id} onClick={() => {onSelectQuiz(quiz)}}>
                        {quiz.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
