import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { KanbasState } from '../../../store'
import { addQuiz, updateQuiz, resetQuiz } from '../quizReducer'
import * as client from '../client'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlinePublishedWithChanges, MdOutlineUnpublished } from 'react-icons/md'
import QuestionsEditor from '../QuestionsEditor'
import './index.css'

export default function QuizEditor() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('Details')
  const { courseId, quizId } = useParams()
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes)
  const quiz = quizzes.find(q => q._id === quizId) || {
    _id: null,
    title: 'New Quiz',
    description: 'Quiz Description',
    points: 0,
    assignTo: '',
    dueDate: moment().add(7, 'days').format('YYYY-MM-DDTHH:mm'),
    availableFromDate: moment().format('YYYY-MM-DDTHH:mm'),
    availableUntilDate: moment().add(14, 'days').format('YYYY-MM-DDTHH:mm'),
    isPublished: false,
  }

  const [title, setTitle] = useState(quiz.title || 'New Quiz')
  const [description, setDescription] = useState(quiz.description || 'Quiz Description')
  const [points, setPoints] = useState(quiz.points || 0)
  const [assignTo, setAssignTo] = useState(quiz.assignTo || '')
  const [dueDate, setDueDate] = useState(
    quiz.dueDate || moment().add(7, 'days').format('YYYY-MM-DDTHH:mm')
  )
  const [availableFromDate, setAvailableFromDate] = useState(
    quiz.availableFromDate || moment().format('YYYY-MM-DDTHH:mm')
  )
  const [availableUntilDate, setAvailableUntilDate] = useState(
    quiz.availableUntilDate || moment().add(14, 'days').format('YYYY-MM-DDTHH:mm')
  )

  const handleAddQuiz = async (newQuiz: any) => {
    const createdQuiz = await client.saveQuiz(newQuiz)
    dispatch(addQuiz(createdQuiz))
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }

  const handleUpdateQuiz = async (updatedQuiz: any) => {
    await client.updateQuiz(updatedQuiz)
    dispatch(updateQuiz(updatedQuiz))
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }

  const handleSave = () => {
    const newQuiz = {
      ...quiz,
      title,
      description,
      points,
      dueDate,
      availableFromDate,
      availableUntilDate,
      assignTo,
      courseId: courseId,
    }
    if (quiz._id) {
      console.log(newQuiz)
      handleUpdateQuiz(newQuiz)
    } else {
      handleAddQuiz(newQuiz)
    }
  }

  const handleEditorChange = (content: any, editor: any) => {
    setDescription(content)
  }

  const handleSaveAndPublish = async () => {
    const newQuiz = {
      ...quiz,
      title,
      description,
      points,
      dueDate,
      availableFromDate,
      availableUntilDate,
      assignTo,
      courseId: courseId,
      isPublished: true,
    }
    if (quiz._id) {
      handleUpdateQuiz(newQuiz)
    } else {
      handleAddQuiz(newQuiz)
    }
  }

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
        <h5 className="float-end mt-2">Points: {points}</h5>
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
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label>Description:</label>
          <Editor
            apiKey="rbhkgq7fs4tvui8zgsogy4uf9kwqbr2rlc47ipr5b9yxtnlz"
            value={description}
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
              value={points}
              onChange={e => setPoints(parseInt(e.target.value, 10))}
            />
            <label>Assign to:</label>
            <input
              type="text"
              className="form-control"
              value={assignTo}
              onChange={e => setAssignTo(e.target.value)}
            />
            <label>Due Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
            <label>Available From:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={availableFromDate}
              onChange={e => setAvailableFromDate(e.target.value)}
            />
            <label>Until Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={availableUntilDate}
              onChange={e => setAvailableUntilDate(e.target.value)}
            />
          </div>
          <hr />
          <div className="action-buttons clearfix">
            <div className="float-start">
              <input type="checkbox" name="notify" />
              <label htmlFor="notify">Notify users this quiz has changed</label>
            </div>
            <div className="float-end">
              <Link to={`/Kanbas/Courses/${courseId}/Quizzes`} className="btn btn-light" onClick={ (e) => dispatch(resetQuiz())}>
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
