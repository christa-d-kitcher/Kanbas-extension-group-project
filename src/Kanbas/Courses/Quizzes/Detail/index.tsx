import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveQuiz, updateQuiz, publishQuiz, unpublishQuiz } from '../client';
import { setCurrentQuiz } from '../quizReducer';
import { KanbasState } from "../../../store";

const QuizDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state : KanbasState) => state.quizReducer.quiz);
  const [editedQuiz, setEditedQuiz] = useState(quiz);
  const { courseId } = useParams();

  const handleSave = async () => {
    if (quiz._id) {
      await updateQuiz(editedQuiz);
    } else {
      const newQuiz = await saveQuiz(editedQuiz);
      dispatch(setCurrentQuiz(newQuiz));
    }
    navigate('/Kanbas/Courses/QuizzesList/QuizDetails/QuizList');
  };

  const handlePublish = async () => {
    if (quiz.isPublished) {
      await unpublishQuiz(quiz._id);
    } else {
      await publishQuiz(quiz._id);
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
  };

  return (
    <div>
      <h1>Quiz Details</h1>
      <form onSubmit={handleSave}>
        <div>
          <label>Quiz Type:</label>
          <select
            value={editedQuiz.quizType}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, quizType: e.target.value })}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
        <div>
          <label>Points:</label>
          <input
            type="number"
            value={editedQuiz.points}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, points: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Assignment Group:</label>
          <select
            value={editedQuiz.assignmentGroup}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, assignmentGroup: e.target.value })}
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>
        <div>
          <label>Shuffle Answers:</label>
          <select
            value={editedQuiz.shuffleAnswers}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, shuffleAnswers: e.target.value })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Time Limit:</label>
          <input
            type="text"
            value={editedQuiz.timeLimit}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, timeLimit: e.target.value })}
          />
        </div>
        <div>
          <label>Multiple Attempts:</label>
          <select
            value={editedQuiz.multipleAttempts}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, multipleAttempts: e.target.value })}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div>
          <label>Show Correct Answers:</label>
          <select
            value={editedQuiz.showCorrectAnswers}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, showCorrectAnswers: e.target.value })}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div>
          <label>Access Code:</label>
          <input
            type="text"
            value={editedQuiz.accessCode}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, accessCode: e.target.value })}
          />
        </div>
        <div>
          <label>One Question at a Time:</label>
          <select
            value={editedQuiz.oneQuestionAtATime}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, oneQuestionAtATime: e.target.value })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Webcam Required:</label>
          <select
            value={editedQuiz.webcamRequired}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, webcamRequired: e.target.value })}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div>
          <label>Lock Questions After Answering:</label>
          <select
            value={editedQuiz.lockQuestionsAfterAnswering}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, lockQuestionsAfterAnswering: e.target.value })}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={editedQuiz.dueDate}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, dueDate: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default QuizDetails;
