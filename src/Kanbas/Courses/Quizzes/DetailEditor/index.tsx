import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { KanbasState } from '../../../store'
import { setCurrentQuiz, addQuiz, updateQuiz, resetQuiz, setQuizzes } from '../quizReducer'
import * as client from '../client'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlinePublishedWithChanges, MdOutlineUnpublished } from 'react-icons/md'
import QuestionsEditor from '../QuestionsEditor'
import './index.css'
import { setQuestions, setQuestion, resetQuestion } from '../QuestionsEditor/questionsReducer'

export default function QuizEditor() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('Details')
  const { courseId, quizId } = useParams()
  const [title, setTitle] = useState('')
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const questionList = Object.values(
    useSelector((state: KanbasState) => state.questionsReducer.questions)
  )

  const handleEditorChange = (content: any, editor: any) => {
    dispatch(setCurrentQuiz({ ...quiz, description: content }))
  }

  const handleSave = async () => {
    // console.log('quiz', quiz)
    const updatedQuiz = {
      ...quiz,
      courseId: courseId,
      title: quiz.title,
      assignmentGroup: 'Quizzes',
      type: 'Graded Quiz',
      questions: questionList,
    }
    // console.log('updatedQuiz', updatedQuiz)
    dispatch(setCurrentQuiz(updatedQuiz))
    const index = quizzes.findIndex(q => q._id === quizId)
    if (index !== -1) {
      await client.updateQuiz(updatedQuiz)
    } else {
      await client.saveQuiz(updatedQuiz)
    }
    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setQuizzes(quizzesData))
    dispatch(resetQuiz())
    dispatch(resetQuestion())
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/QuizDetail`)
  }

  const handleSaveAndPublish = async () => {
    dispatch(setCurrentQuiz({ ...quiz, questions: questionList }))

    if (quizId && quizId !== 'new') {
      await client.updateQuiz(quiz)
      await client.publishQuiz(quizId)
    } else {
      const newQuiz = await client.saveQuiz(quiz)
      await client.publishQuiz(newQuiz._id)
    }

    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setQuizzes(quizzesData))
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }

  const handleDescriptionChange = (event: any) => {
    dispatch(setCurrentQuiz({ ...quiz, description: event.target.value }))
  }

  useEffect(() => {
    if (!quizId || quizId === 'new') {
      dispatch(resetQuiz())
    } else {
      const currentQuiz = quizzes.find(q => q._id === quizId)
      if (currentQuiz) {
        dispatch(setCurrentQuiz(currentQuiz))
        //dispatch(setQuestions(currentQuiz.questions))
      }
    }
  }, [dispatch, quizId, quizzes])

  return (
    <div className="container my-3 mb-5">
      <div className="header clearfix">
        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`} className="btn btn-light float-end">
          <BsThreeDotsVertical />
        </Link>
        {quiz.isPublished ? (
          <span className="text-success float-end mx-3 mt-2">
            <MdOutlinePublishedWithChanges /> Published
          </span>
        ) : (
          <span className="text-muted float-end mx-3 mt-2">
            <MdOutlineUnpublished /> Not Published
          </span>
        )}
        <h5 className="float-end mt-2">Points: {quiz.points}</h5>
      </div>
      <hr />
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'Details' ? 'active' : ''}`}
          onClick={() => setActiveTab('Details')}
        >
          Details
        </button>
        <button
          className={`tab ${activeTab === 'Questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('Questions')}
        >
          Questions
        </button>
      </div>
      {activeTab === 'Details' && (
        <div>
          <label>Quiz Title:</label>
          <input
            type="text"
            className="form-control"
            value={quiz.title}
            onChange={e => {
              dispatch(setCurrentQuiz({ ...quiz, title: e.target.value }))
            }}
          />
          <label>Quiz Instructions:</label>
          {/* <textarea
            className="form-control"
            value={quiz.description}
            onChange={handleDescriptionChange}
            style={{ height: '500px' }} // Adjust height as needed
          /> */}
          <Editor
            apiKey="4yja473vg7ka09jquf9ervp03x8783j7emtczpx3aqm00edp"
            value={quiz.description}
            onEditorChange={handleEditorChange}
            init={{
              height: 500,
              menubar: 'file edit view insert format tools table help',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'undo redo',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <div className="my-3">
            <label>Quiz Type:</label>
            <select
              value={quiz.quizType}
              className="form-control"
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, quizType: e.target.value }))}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="my-3">
            <label>Assignment Group:</label>
            <select
              value={quiz.assignmentGroup}
              className="form-control"
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, assignmentGroup: e.target.value }))}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
          <h5>Options</h5>
          <div className="my-3">
            <div>
              <label>Shuffle Answers:</label>
              <input
                type="checkbox"
                checked={quiz.shuffleAnswers === 'Yes'}
                onChange={e =>
                  dispatch(
                    setCurrentQuiz({ ...quiz, shuffleAnswers: e.target.checked ? 'Yes' : 'No' })
                  )
                }
              />
            </div>
          </div>
          <div>
            <div className="row align-items-center">
              <div className="col-auto">
                <label>Time Limit:</label>
              </div>
              <div className="col">
                <input
                  type="checkbox"
                  checked={quiz.timeLimit > 0}
                  onChange={e =>
                    dispatch(
                      setCurrentQuiz({
                        ...quiz,
                        timeLimit: e.target.checked ? 60 : 0,
                      })
                    )
                  }
                />
              </div>
              {quiz.timeLimit > 0 && (
                <div className="col">
                  <input
                    type="number"
                    value={quiz.timeLimit / 60}
                    className="form-control"
                    onChange={e =>
                      dispatch(
                        setCurrentQuiz({ ...quiz, timeLimit: parseInt(e.target.value) * 60 })
                      )
                    }
                  />
                </div>
              )}
              <div className="col-auto">
                <label>Minutes</label>
              </div>
            </div>
            <div className="my-3">
              <label>Multiple Attempts:</label>
              <input
                type="checkbox"
                checked={quiz.multipleAttempts === 'Yes'}
                onChange={e =>
                  dispatch(
                    setCurrentQuiz({ ...quiz, multipleAttempts: e.target.checked ? 'Yes' : 'No' })
                  )
                }
              />
            </div>
            <div className="my-3">
              <label>Points:</label>
              <input
                type="number"
                className="form-control"
                value={quiz.points}
                onChange={e =>
                  dispatch(setCurrentQuiz({ ...quiz, points: parseInt(e.target.value) }))
                }
              />
              <label>Assign to:</label>
            </div>
            <input
              type="text"
              className="form-control"
              value={quiz.assignTo}
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, assignTo: e.target.value }))}
            />
            <label>Due Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.dueDate?.slice(0, 16)}
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, dueDate: e.target.value }))}
            />
            <label>Available From:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.availableDate?.slice(0, 16)}
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, availableDate: e.target.value }))}
            />
            <label>Until Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.untilDate?.slice(0, 16)}
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, untilDate: e.target.value }))}
            />
          </div>
          <hr />
          <div className="action-buttons clearfix">
            <div className="float-start">
              <input type="checkbox" name="notify" />
              <label htmlFor="notify">Notify users this quiz has changed</label>
            </div>
            <div className="float-end">
              <Link
                to={`/Kanbas/Courses/${courseId}/Quizzes`}
                className="btn btn-light"
                onClick={e => dispatch(resetQuiz())}
              >
                Cancel
              </Link>
              <button onClick={handleSaveAndPublish} className="btn btn-light mx-3">
                Save & Publish
              </button>
              <button onClick={handleSave} className="btn btn-danger">
                Save
              </button>
            </div>
          </div>
          <hr />
        </div>
      )}

      {activeTab === 'Questions' && <QuestionsEditor />}
    </div>
  )
}
