
import React, { useState } from 'react'
import { API_POST } from '../service/Quiz';
import { IQuestion } from '../constant/Question';

const QuestionForm:React.FC<{ quizId: string, setQuizD: (q: IQuestion) => void }> = ({quizId, setQuizD}) => {
    const [text, setText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<string>('0');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const question = { text, options, correctAnswerIndex };
        const quiz = await API_POST(`/quizzes/${quizId}/question`, question);
        setQuizD(quiz as unknown as IQuestion);
        setText('');
        setOptions(['', '', '', '']);
        setCorrectAnswerIndex('')
    };

    return (
        <form onSubmit={(e) => { handleSubmit(e); }}>
            <h2>Thêm Câu Hỏi Mới</h2>
            <input
                type="text"
                placeholder="Câu hỏi"
                value={text}
                onChange={e => setText(e.target.value)}
                required
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Lựa chọn ${index + 1}`}
                    value={option}
                    onChange={e => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                    }}
                    required
                />
            ))}
            <input
                type="number"
                min="0"
                max={options.length - 1}
                value={correctAnswerIndex}
                onChange={e => setCorrectAnswerIndex(e.target.value)}
                required
                placeholder="Chỉ số câu trả lời đúng"
            />
            <button type="submit">Thêm Câu Hỏi</button>
        </form>
    );
};

export default QuestionForm;
