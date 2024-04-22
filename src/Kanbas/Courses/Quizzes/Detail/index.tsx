import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
import moment from 'moment'
import { CiEdit } from 'react-icons/ci'
import { saveQuiz, updateQuiz, publishQuiz, unpublishQuiz } from '../client'
import { setCurrentQuiz } from '../quizReducer'
import { KanbasState } from '../../../store'
import './index.css'

const QuizDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const [editedQuiz, setEditedQuiz] = useState(quiz)
  const { courseId } = useParams()
  // console.log('quiz', quiz)

  const handleSave = async () => {
    if (quiz._id) {
      await updateQuiz(editedQuiz)
    } else {
      const newQuiz = await saveQuiz(editedQuiz)
      dispatch(setCurrentQuiz(newQuiz))
    }
    navigate('/Kanbas/Courses/QuizzesList/QuizDetails/QuizList')
  }

  const handlePublish = async () => {
    if (quiz.isPublished) {
      await unpublishQuiz(quiz._id)
    } else {
      await publishQuiz(quiz._id)
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)
  }

  return (
    <div className="container my-4">
      <div className="clearfix my-2">
        <button className="float-end btn btn-light me-2">
          <BsThreeDotsVertical />
        </button>
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/DetailEditor`}
          className="float-end btn btn-light me-2"
        >
          <CiEdit /> Edit
        </Link>
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/QuestionReview`}
          className="float-end btn btn-light me-2"
        >
          Review
        </Link>
        <button className="float-end btn btn-success me-2" onClick={handlePublish}>
          <MdOutlinePublishedWithChanges className="text-white" /> Published
        </button>
      </div>
      <hr />
      <div>
        <h2>{quiz.title}</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Quiz Type:</label>
            <select
              value={editedQuiz.quizType}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, quizType: e.target.value })}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="form-group">
            <label>Points:</label>
            <input
              type="number"
              value={editedQuiz.points}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, points: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label>Assignment Group:</label>
            <select
              value={editedQuiz.assignmentGroup}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, assignmentGroup: e.target.value })}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
          <div className="form-group">
            <label>Shuffle Answers:</label>
            <select
              value={editedQuiz.shuffleAnswers}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, shuffleAnswers: e.target.value })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Time Limit:</label>
            <input
              type="text"
              value={editedQuiz.timeLimit / 60}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, timeLimit: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Multiple Attempts:</label>
            <select
              value={editedQuiz.multipleAttempts}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, multipleAttempts: e.target.value })}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Show Correct Answers:</label>
            <select
              value={editedQuiz.showCorrectAnswers}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, showCorrectAnswers: e.target.value })}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Access Code:</label>
            <input
              type="text"
              value={editedQuiz.accessCode}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, accessCode: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>One Question at a Time:</label>
            <select
              value={editedQuiz.oneQuestionAtATime}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, oneQuestionAtATime: e.target.value })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Webcam Required:</label>
            <select
              value={editedQuiz.webcamRequired}
              className="form-control"
              onChange={e => setEditedQuiz({ ...editedQuiz, webcamRequired: e.target.value })}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Lock Questions After Answering:</label>
            <select
              value={editedQuiz.lockQuestionsAfterAnswering}
              className="form-control"
              onChange={e =>
                setEditedQuiz({ ...editedQuiz, lockQuestionsAfterAnswering: e.target.value })
              }
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </form>
      </div>
      <div className='my-5'>
        <table className="table border-top-1">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{moment(quiz.dueDate).format('MMM DD [at] ha')}</td>
              <td>Everyone</td>
              <td>{moment(quiz.availableDate).format('MMM DD [at] ha')}</td>
              <td>{moment(quiz.untilDate).format('MMM DD [at] ha')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="clearfix mb-5">
        <button type="submit" className="float-end btn btn-danger" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default QuizDetails
