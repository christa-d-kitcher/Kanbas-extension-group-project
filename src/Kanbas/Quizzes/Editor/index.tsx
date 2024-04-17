import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function QuizzesDetail() {
  const [quizType, setQuizType] = useState('Graded Quiz');
  const [points, setPoints] = useState(0);
  const [assignmentGroup, setAssignmentGroup] = useState('Quizzes');
  const [shuffleAnswers, setShuffleAnswers] = useState('Yes');
  const [timeLimit, setTimeLimit] = useState('20 Minutes');
  const [multipleAttempts, setMultipleAttempts] = useState('No');
  const [showCorrectAnswers, setShowCorrectAnswers] = useState('No');
  const [accessCode, setAccessCode] = useState('');
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState('Yes');
  const [webcamRequired, setWebcamRequired] = useState('No');
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState('No');
  const [dueDate, setDueDate] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // sending the data to an API
  };

  return (
    <div className="p-4 kanbas-navigation">
      <h1 className="mb-4">Quizzes Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="quizType" className="form-label">Quiz Type</label>
          <select id="quizType" className="form-select" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="points" className="form-label">Points</label>
          <input type="number" id="points" className="form-control" value={points} onChange={(e) => setPoints(parseInt(e.target.value))} />
        </div>

        <div className="mb-3">
          <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
          <select id="assignmentGroup" className="form-select" value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="shuffleAnswers" className="form-label">Shuffle Answers</label>
          <select id="shuffleAnswers" className="form-select" value={shuffleAnswers} onChange={(e) => setShuffleAnswers(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="timeLimit" className="form-label">Time Limit</label>
          <input type="text" id="timeLimit" className="form-control" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="multipleAttempts" className="form-label">Multiple Attempts</label>
          <select id="multipleAttempts" className="form-select" value={multipleAttempts} onChange={(e) => setMultipleAttempts(e.target.value)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="showCorrectAnswers" className="form-label">Show Correct Answers</label>
          <select id="showCorrectAnswers" className="form-select" value={showCorrectAnswers} onChange={(e) => setShowCorrectAnswers(e.target.value)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="accessCode" className="form-label">Access Code</label>
          <input type="text" id="accessCode" className="form-control" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="oneQuestionAtATime" className="form-label">One Question at a Time</label>
          <select id="oneQuestionAtATime" className="form-select" value={oneQuestionAtATime} onChange={(e) => setOneQuestionAtATime(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="webcamRequired" className="form-label">Webcam Required</label>
          <select id="webcamRequired" className="form-select" value={webcamRequired} onChange={(e) => setWebcamRequired(e.target.value)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="lockQuestionsAfterAnswering" className="form-label">Lock Questions After Answering</label>
          <select id="lockQuestionsAfterAnswering" className="form-select" value={lockQuestionsAfterAnswering} onChange={(e) => setLockQuestionsAfterAnswering(e.target.value)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input type="date" id="dueDate" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="availableDate" className="form-label">Available Date</label>
          <input type="date" id="availableDate" className="form-control" value={availableDate} onChange={(e) => setAvailableDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="untilDate" className="form-label">Until Date</label>
          <input type="date" id="untilDate" className="form-control" value={untilDate} onChange={(e) => setUntilDate(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary me-2"
                //   onClick={handleAddNewQuiz}
                  >Save</button>

        <Link to="/Kanbas/Quizzes" className="btn btn-danger">Cancel</Link>
      </form>
    </div>
  );
}

export default QuizzesDetail;
