import React, { useState } from 'react';
import { API_POST } from '../service/Quiz';
import { IQuiz } from '../constant/Question';

const QuizForm: React.FC<{ setNewQuiz: (quiz: IQuiz) => void }> = ({ setNewQuiz }) => {

    const [ title, setTitle ] = useState<string>("");
    const [ description, setDescription ] = useState<string>("");

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newQuiz = await API_POST('/quizzes', { title, description });
        setNewQuiz(newQuiz as unknown as IQuiz);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Tạo Quiz Mới</h2>
            <input
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Mô tả"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <button type="submit">Tạo Quiz</button>
        </form>
    );
};

export default QuizForm;
