
import { useState } from 'react';
import './App.css'
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import QuizDetails from './components/QuizDetails';
import { IQuiz } from './constant/Question';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>();
  const [ newQuiz, setNewQuiz] = useState<IQuiz>();

  return (
      <div className="App">
         <Router>
      <Routes>
        <Route path="/" element={<Home newQuiz={newQuiz} onSelectQuiz={(quiz) => setSelectedQuiz(quiz)}/>} />
        <Route path="/create-quiz" />
        <Route path="/contact" />
      </Routes>
    </Router>
          {/* <h1>Ứng Dụng Quiz</h1>
          <QuizForm setNewQuiz={(quiz) => setNewQuiz(quiz)}/>
          <QuizList newQuiz={newQuiz} onSelectQuiz={(quiz) => setSelectedQuiz(quiz)} />
          {selectedQuiz && <QuizDetails q={selectedQuiz} />} */}
      </div>
  );
}

export default App
