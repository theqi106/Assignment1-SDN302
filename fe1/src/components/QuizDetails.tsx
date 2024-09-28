import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import { IQuiz } from '../constant/Question';

const QuizDetails: React.FC<{q: IQuiz}> = ({ q }) => {
    const [ quiz, setQuizD ] = useState<IQuiz>(q);

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <h3>Câu Hỏi</h3>
                {quiz.questions.map(question => (
                    <ul>
                        <h4>{question.text}</h4>
                        {question.options.map((option,index) =>(
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                ))}
            <QuestionForm quizId={quiz._id} setQuizD={(newQ) => { setQuizD({ ...quiz, questions: [...quiz.questions, newQ] })}} />
        </div>
    );
};

export default QuizDetails;
