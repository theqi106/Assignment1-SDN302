
import { useState } from 'react';
import './App.css'
import { IQuiz } from './constant/Question';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import CreateQuiz from './pages/CreateQuiz'

function App() {
  const [ newQuiz, setNewQuiz] = useState<IQuiz>();

  return (
      <div className="App">
         <Router>
      <Routes>
        <Route path="/" element={<Home  newQuiz={newQuiz}/>} />
        <Route path="/create" element={<CreateQuiz setNewQuiz={(quiz) => setNewQuiz(quiz)} />} />
        {/* <Route path="/details" element={<QuizDetail q={selectedQuiz}/>} /> */}
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
