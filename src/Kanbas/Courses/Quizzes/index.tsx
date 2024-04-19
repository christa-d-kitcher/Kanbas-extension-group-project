import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios'; // Import axios for HTTP requests
import * as client from './client';
import { KanbasState } from "../../store";

import { setQuizzes, setCurrentQuiz, addQuiz, updateQuiz, deleteQuiz } from './quizReducer';

const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

const QuizList = () => {
  const navigate = useNavigate();
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes);
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const { courseId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesData = await client.getAllQuizzes();
      dispatch(setQuizzes(quizzesData));
      console.log(quizzesData);
    };
    fetchQuizzes();
  }, []);

  const handlePublish = async (quizId:string) => {
    await client.publishQuiz(quizId);
    const quizzesData = await client.getAllQuizzes();
    dispatch(setQuizzes(quizzesData));
  };

  const handleUnpublish = async (quizId:string) => {
    await client.unpublishQuiz(quizId);
    const quizzesData = await client.getAllQuizzes();
    dispatch(setQuizzes(quizzesData));
  };

  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${new Date().getTime().toString()}/DetailEditor`);
  };

  const handleQuizClick = (quizId:string) => {
    const currentQuiz = quizzes.find((quiz) => quiz._id === quizId);
    dispatch(setCurrentQuiz(currentQuiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizDetail`);
  };


  const handleEdit = (quizId:string) => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`);
  };

  const renderAvailability = (quiz:any) => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);
    const dueDate = new Date(quiz.dueDate);

    if (currentDate > untilDate) {
      return 'Closed';
    } else if (currentDate >= availableDate && currentDate <= untilDate) {
      return 'Available';
    } else {
      return `Not available until ${availableDate.toDateString()}`;
    }
  };

  const deleteQuiz = async (quizId:string) => {
    try {
      await axios.delete(`${QUIZZES_API}/${quizId}`);
      const quizzesData = await client.getAllQuizzes();
      dispatch(setQuizzes(quizzesData));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div>
      {quizzes.length === 0 ? (
        <p>Click Add Quiz Button to add a new quiz</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <span onClick={() => handleQuizClick(quiz._id)}>{quiz.title}</span>
              <span>{renderAvailability(quiz)}</span>
              <span>Due Date: {quiz.dueDate}</span>
              <span>Points: {quiz.points}</span>
              <span>Number of Questions: {quiz.questions.length}</span>
              {quiz.isPublished ? (
                <span role="img" aria-label="Published" onClick={() => handleUnpublish(quiz._id)}>✅</span>
              ) : (
                <span role="img" aria-label="Unpublished" onClick={() => handlePublish(quiz._id)}>🚫</span>
              )}

              {quiz.isPublished ? (
                <button
                  style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => handleUnpublish(quiz.id)}
                >
                  Published
                </button>
              ) : (
                <button
                  style={{ backgroundColor: '#757575', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => handlePublish(quiz._id)}
                >
                  Unpublished
                </button>
              )}
              {/* context menu */}
              <div className="context-menu">
                <span className="menu-button">⋮</span>
                <div className="dropdown-content">
                  <button onClick={() => handleEdit(quiz._id)}>Edit</button>
                  <button onClick={() => deleteQuiz(quiz._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddQuiz}>+ Quiz</button>
    </div>
  );
};

export default QuizList;