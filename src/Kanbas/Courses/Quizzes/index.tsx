import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
import { FaBan, FaPlus, FaEllipsisV } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoRocketOutline } from 'react-icons/io5'
import axios from 'axios' // Import axios for HTTP requests
import moment from 'moment'
import * as client from './client'
import { KanbasState } from '../../store'

import { setQuizzes, setCurrentQuiz, addQuiz, updateQuiz, deleteQuiz } from './quizReducer'

const API_BASE = process.env.REACT_APP_BASE_API_URL
const QUIZZES_API = `${API_BASE}/api/quizzes`

const QuizList = () => {
  const navigate = useNavigate()
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const { courseId } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesData = await client.getAllQuizzes()
      dispatch(setQuizzes(quizzesData))
    //   console.log(quizzesData)
    }
    fetchQuizzes()
  }, [])

  const handlePublish = async (quizId: string) => {
    await client.publishQuiz(quizId)
    const quizzesData = await client.getAllQuizzes()
    dispatch(setQuizzes(quizzesData))
  }

  const handleUnpublish = async (quizId: string) => {
    await client.unpublishQuiz(quizId)
    const quizzesData = await client.getAllQuizzes()
    dispatch(setQuizzes(quizzesData))
  }

  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${new Date().getTime().toString()}/DetailEditor`)
  }

  const handleQuizClick = (quizId: string) => {
    const currentQuiz = quizzes.find(quiz => quiz._id === quizId)
    dispatch(setCurrentQuiz(currentQuiz))
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizDetail`)
  }

  const handleEdit = (quizId: string) => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`)
  }

  const renderAvailability = (quiz: any) => {
    const currentDate = new Date()
    const availableDate = new Date(quiz.availableDate)
    const untilDate = new Date(quiz.untilDate)
    const dueDate = new Date(quiz.dueDate)

    if (currentDate > untilDate) {
      return 'Closed'
    } else if (currentDate >= availableDate && currentDate <= untilDate) {
      return 'Available'
    } else {
      return `Not available until ${availableDate.toDateString()}`
    }
  }

  const deleteQuiz = async (quizId: string) => {
    try {
      await axios.delete(`${QUIZZES_API}/${quizId}`)
      const quizzesData = await client.getAllQuizzes()
      dispatch(setQuizzes(quizzesData))
    } catch (error) {
      console.error('Error deleting quiz:', error)
    }
  }

  return (
    <div>
      {quizzes.length === 0 ? (
        <p>Click Add Quiz Button to add a new quiz</p>
      ) : (
        <div>
          <div className="row main-header pt-4 my-3">
            {/* Search Bar */}
            <div className="col">
              <form>
                <input
                  type="text"
                  className="form-control ms-1"
                  style={{ width: '250px' }}
                  id="search-assignment"
                  placeholder="Search for Quiz"
                />
              </form>
            </div>
            {/* Buttons */}
            <div className="col-auto">
              <button className="btn btn-danger btn-outline-dark mx-2 text-white" onClick={handleAddQuiz} >
                <FaPlus /> Quiz
              </button>
              <button className="btn btn-light btn-outline-dark me-1">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
          <ul className="list-group wd-modules">
            <li className="list-group-item">
              <div className="py-3">
                <FaEllipsisV className="me-2 mb-2" />{' '}
                <h3 className="d-inline mb-0">Assignment Quizzes</h3>
              </div>
              <ul className="list-group">
                {quizzes.map(quiz => (
                  <li key={quiz._id} className="list-group-item py-4 border-1 border-start">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div>
                        <IoRocketOutline className="mx-4 text-success" style={{fontSize:'25px'}}/>
                          <span
                            onClick={() => handleQuizClick(quiz._id)}
                            style={{ fontSize: '23px' }}
                          >
                            {quiz.title}
                          </span>
                        </div>
                        <div className="ms-5 ps-4 " style={{ color: '#666' }}>
                          <span>{renderAvailability(quiz)} | </span>
                          <span>
                            Due Date: {moment(quiz.dueDate).format('MMM DD h:mm a')} | {' '}
                          </span>
                          <span>Points: {quiz.points} | </span>
                          <span>Number of Questions: {quiz.questions.length}</span>
                        </div>
                      </div>
                      <div className='d-flex'>
                        {quiz.isPublished ? (
                          <span
                            role="img"
                            aria-label="Published"
                            onClick={() => handleUnpublish(quiz._id)}
                            style={{fontSize: '25px'}}
                          >
                            <MdOutlinePublishedWithChanges className="text-success" />
                          </span>
                        ) : (
                          <span
                            role="img"
                            aria-label="Unpublished"
                            onClick={() => handlePublish(quiz._id)}
                            style={{fontSize: '25px'}}
                          >
                            <FaBan className="text-danger" />
                          </span>
                        )}
                        <div>
                          {quiz.isPublished ? (
                            <button
                              style={{
                                backgroundColor: '#4caf50',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                              }}
                              className="btn btn-success ms-2"
                              onClick={() => handleUnpublish(quiz._id)}
                            >
                              Published
                            </button>
                          ) : (
                            <button
                              style={{
                                backgroundColor: '#757575',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                              }}
                              className="btn btn-danger ms-2"
                              onClick={() => handlePublish(quiz._id)}
                            >
                              Unpublished
                            </button>
                          )}
                          {/* context menu */}
                          <button
                            onClick={() => handleEdit(quiz._id)}
                            className="btn btn-primary mx-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteQuiz(quiz._id)}
                            className="btn btn-danger me-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default QuizList
