import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './index.css';

interface Quiz {
  id: string;
  title: string;
  description: string;
  published: boolean;
  available: boolean;
  dueDate: string;
  points: number;
  questions: any[]; 
}

interface QuizzesProps {
  quizzes: Quiz[];
  addNewQuiz: (quizName: string) => void;
  deleteQuiz: (quizId: string) => void;
  togglePublish: (quizId: string) => void;
}

function Quizzes({
    quizzes,
  addNewQuiz,
  deleteQuiz,
  togglePublish,
}: QuizzesProps) {
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [newQuizName, setNewQuizName] = useState('');

  const handleAddNewQuiz = () => {
    if (newQuizName.trim() !== '') {
      addNewQuiz(newQuizName);
      setNewQuizName('');
      setShowAddQuiz(false);
    }
  };
  const handleSaveQuizFromDetailPage = (quiz: Quiz) => {

  };
  
  return (
    <div className="p-4 kanbas-navigation">
      <h1 className="mb-4">Quizzes</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowAddQuiz(true)}
      >
        + Quiz
      </button>
      <p>Click the "+ Quiz" button to add a new quiz.</p>

      {showAddQuiz && (
        <div className="mt-4">
          <h5>Add New Quiz</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Quiz Name"
            value={newQuizName}
            onChange={(e) => setNewQuizName(e.target.value)}
          />

          <Link to="/Kanbas/Quizzes/Editor" className="btn btn-primary"
          onClick={handleAddNewQuiz}
          >
            <i className="fa-solid fa-book"></i> Editor
          </Link>
          <button
            className="btn btn-danger ms-2"
            onClick={() => setShowAddQuiz(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-4">
        <h2>Assignment Quizzes</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Quizzes;
