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
import { setQuestions, setQuestion } from '../QuestionsEditor/questionsReducer'

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
    const updatedQuiz = {
      ...quiz,
      courseId: courseId,
      assignmentGroup: 'Quizzes',
      title: quiz.title || 'New Quiz',
      type: 'Graded Quiz',
      questions: questionList,
    }

    dispatch(setCurrentQuiz(updatedQuiz))

    if (quizId && quizId !== 'new') {
      await client.updateQuiz({
        ...quiz,
        courseId: courseId,
        assignmentGroup: 'Quizzes',
        title: quiz.title || 'New Quiz',
        type: 'Graded Quiz',
        question: questionList,
      })
      await client.updateQuiz(quiz)
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
    } else {
      await client.saveQuiz({
        ...quiz,
        courseId: courseId,
        assignmentGroup: 'Quizzes',
        title: quiz.title || 'New Quiz',
        type: 'Graded Quiz',
        questions: questionList,
      })
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
    }

    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setQuizzes(quizzesData))
  }

  const handleSaveAndPublish = async () => {
    dispatch(setCurrentQuiz({ ...quiz, questions: questionList }))

    if (quizId && quizId !== 'new') {
      await client.updateQuiz(quiz)
      await client.publishQuiz(quizId)
    } else {
      const newQuiz = await client.saveQuiz(quiz)
      await client.publishQuiz(newQuiz._id)
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
    }

    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setQuizzes(quizzesData))
  }

  //   useEffect(() => {
  //     if (!quizId || quizId === 'new') {
  //       dispatch(resetQuiz())
  //     } else {
  //       const currentQuiz = quizzes.find(q => q._id === quizId)
  //       if (currentQuiz) {
  //         dispatch(setCurrentQuiz(currentQuiz))
  //         //dispatch(setQuestions(currentQuiz.questions))
  //       }
  //     }
  //   }, [dispatch, quizId, quizzes])

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
          <label>Description:</label>
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
              value={quiz.dueDate.slice(0, 16)}
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, dueDate: e.target.value }))}
            />
            <label>Available From:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.availableDate.slice(0, 16)}
              onChange={e => dispatch(setCurrentQuiz({ ...quiz, availableDate: e.target.value }))}
            />
            <label>Until Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.untilDate.slice(0, 16)}
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
