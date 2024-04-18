import React, { useState } from 'react';
import './index.css';
import { Editor } from '@tinymce/tinymce-react';// use the advanced editor called TinyMCE for the Description (WYSIWYG),
import * as client from "./client";
import { useNavigate, useParams, Link } from "react-router-dom";
//need to install TinyMCE React integration:npm install @tinymce/tinymce-react


const Quizzes = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    timeLimit: 20,
    type: "Graded Quiz",
    assignmentGroup: "Quizzes",
    isPublished: false,
    shuffleAnswers: true,
    multipleAttempts: false,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  } as any)
  const [activeTab, setActiveTab] = useState('Details');
  const { cid } = useParams();

  const handleEditorChange = (content: string) => {
    setQuiz({...quiz, description: content})
  };

  const handleSave = async() => { 
    await client.saveQuiz(quiz);
  };
  const handleSaveAndPublish = async() => { 
      const resp = await client.saveQuiz(quiz);
      await client.publishQuiz(resp._id);
      navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };
  const handleCancel = () => { 
      setQuiz({
        timeLimit: 20,
        type: "Graded Quiz",
        assignmentGroup: "Quizzes",
        isPublished: false,
        shuffleAnswers: true,
        multipleAttempts: false,
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
      })
      navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };

  return (
    <div className="quiz-container">
      <div className="tabs">
        <button className={`tab ${activeTab === 'Details' ? 'active' : ''}`} onClick={() => setActiveTab('Details')}>
          Details
        </button>
        <button className={`tab ${activeTab === 'Questions' ? 'active' : ''}`} onClick={() => setActiveTab('Questions')}>
          Questions
        </button>
      </div>

      {activeTab === 'Details' && (
        <div className="details-container">
          <input
            type="text"
            className="quiz-title-input"
            value={quiz.title}
            onChange={(e) => setQuiz({...quiz, title: e.target.value})}
            placeholder="Unnamed Quiz"
          />


          {/* My API key for the TinyMCE installation included in the code:rbhkgq7fs4tvui8zgsogy4uf9kwqbr2rlc47ipr5b9yxtnlz */}
          <div className="quiz-container">
            <div className="wysiwyg-editor-container">
              <label htmlFor="quizDescription">Quiz Instructions:</label>
              <Editor
                apiKey="rbhkgq7fs4tvui8zgsogy4uf9kwqbr2rlc47ipr5b9yxtnlz"
                value={quiz.description}
                onEditorChange={handleEditorChange}
                init={{
                  height: 500,
                  menubar: 'file edit view insert format tools table help',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'undo redo'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
          </div>


          <label htmlFor="quizType">Quiz Type</label>
          <select id="quizType" value={quiz.quizType} onChange={(e) => setQuiz({...quiz, quizType: e.target.value})}>
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>

          <label htmlFor="assignmentGroup">Assignment Group</label>
          <select id="assignmentGroup" value={quiz.assignmentGroup} onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value})}>
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignment">Assignment</option>
            <option value="Project">Project</option>
          </select>

          <div className="quiz-options">
            <label>
              <input type="checkbox" checked={quiz.shuffleAnswers} onChange={(e) => setQuiz({...quiz, shuffleAnswerse: e.target.checked})} />
              Shuffle Answers
            </label>

            <div className="time-limit-option">
              <label htmlFor="timeLimit">Time Limit</label>
              <input
                type="number"
                id="timeLimit"
                className="time-limit-input"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz({...quiz, timeLimit: e.target.value})}
                min="1"
              />
              <span className="time-label">minutes</span>
            </div>

            <label>
              <input type="checkbox" checked={quiz.allowMultipleAttempts} onChange={(e) => setQuiz({...quiz, allowMultipleAttempts: e.target.checked})} />
              Allow Multiple Attempts
            </label>

            <div className="field">
              <label htmlFor="quizPoints">Points:</label>
              <input
                type="number"
                id="quizPoints"
                className="quiz-points-input"
                value={quiz.points}
                onChange={(e) => setQuiz({...quiz, points: Number(e.target.value)})}
                min="0"
              />
            </div>

            <div className="field">
              <label>
                <input type="checkbox" checked={quiz.showCorrectAnswers} onChange={(e) => setQuiz({...quiz, showCorrectAnswers: e.target.checked})} />
                Show Correct Answers
              </label>
            </div>


            <div className="field">
              <label>Access Code:</label>
              <input type="text" value={quiz.accessCode} onChange={(e) => setQuiz({...quiz, accessCode: e.target.value})} />
            </div>
            <div className="field">
              <label>
                <input type="checkbox" checked={quiz.oneQuestionAtATime} onChange={(e) => setQuiz({...quiz, oneQuestionAtATime: e.target.checked})} />
                One Question at a Time
              </label>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" checked={quiz.webcamRequired} onChange={(e) => setQuiz({...quiz, webcamRequired: e.target.checked})} />
                Webcam Required
              </label>
            </div>
            <div className="field">
              <label>
                <input type="checkbox" checked={quiz.lockQuestionsAfterAnswering} onChange={(e) => setQuiz({...quiz, lockQuestionsAfterAnswering: e.target.checked})} />
                Lock Questions After Answering
              </label>
            </div>
          </div>

          <div className="assign-section">
            <div className="assign-to">
              <label htmlFor="assignTo">Assign to</label>
              <input
                type="text"
                id="assignTo"
                value={quiz.assignTo}
                onChange={(e) => setQuiz({...quiz, assignTo: e.target.value})}
              />
            </div>

            <div className="date-field">
              <label htmlFor="dueDate">Due</label>
              <input
                type="datetime-local"
                id="dueDate"
                value={quiz.dueDate}
                onChange={(e) => setQuiz({...quiz, dueDate: e.target.value})}
              />
            </div>

            <div className="availability">
              <div className="date-field">
                <label htmlFor="availableFrom">Available from</label>
                <input
                  type="datetime-local"
                  id="availableFrom"
                  value={quiz.availableFrom}
                  onChange={(e) => setQuiz({...quiz, availableFrom: e.target.value})}
                />
              </div>

              <div className="date-field">
                <label htmlFor="untilDate">Until</label>
                <input
                  type="datetime-local"
                  id="untilDate"
                  value={quiz.untilDate}
                  onChange={(e) => setQuiz({...quiz, untilDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="publish-btn" onClick={handleSaveAndPublish}>Save & Publish</button>
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;

