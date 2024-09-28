import React, { useState } from 'react';
import { API_POST } from '../service/Quiz';
import { IQuiz } from '../constant/Question';
import Header from '../components/Header';
import '../css/Quiz.css'
import { useNavigate } from 'react-router-dom';

const CreateQuiz: React.FC<{ setNewQuiz: (quiz: IQuiz) => void }> = ({ setNewQuiz }) => {

    const [ title, setTitle ] = useState<string>("");
    const [ description, setDescription ] = useState<string>("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newQuiz = await API_POST('/quizzes', { title, description });
        setNewQuiz(newQuiz as unknown as IQuiz);
        navigate('/');
    };
    return (
        <div className='container'>
            <Header/>
        <form onSubmit={handleSubmit}>
            <h2>Tạo Quiz Mới</h2>
            <div className='input-text-area'>
            <input
                className="block w-full w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                id='input-quiz'
            />
            <textarea
                className="block w-full w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Mô tả"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                id='text-area-quiz'
            />
            </div>
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">Tạo Quiz</button>
        </form>
        </div>
    );
};

export default CreateQuiz;
