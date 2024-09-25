
export interface IQuestion {
    _id: string;
    text: string;
    options: string[];
    keywords?: string[];
    correctAnswerIndex: number;
}

export interface IQuiz {
    _id: string;
    title: string;
    description: string;
    questions: IQuestion[];
}
