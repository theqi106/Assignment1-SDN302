import React, { useEffect, useState } from 'react';
import { IQuiz } from '../constant/Question';
import { API_DELETE, API_GET } from '../service/Quiz';
import QuizDetails from './QuizDetail';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const QuizList:React.FC<{  newQuiz?: IQuiz}> = ({newQuiz}) => {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
    const deleteQuiz = async (quizId : string) => {
        try {
            await API_DELETE(`/quizzes/${quizId}`);
            setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
            alert('Error deleting quiz');
        }
    };
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
            <Header/>
            <h2>Danh Sách Quiz</h2>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz._id} onClick={() => {setSelectedQuiz(quiz);}}>
                        {quiz.title}
                        <button className='ml-4' onClick={(e) => {e.stopPropagation();deleteQuiz(quiz._id)}}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
            {selectedQuiz && <QuizDetails q={selectedQuiz} />}
        </div>
    );
};

export default QuizList;
