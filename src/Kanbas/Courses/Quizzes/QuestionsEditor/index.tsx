import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { KanbasState } from '../../../store'
import { setQuestions, setQuestion } from './questionsReducer'
import { setCurrentQuiz, setQuizzes } from '../quizReducer'
import * as client from '../client'

function QuestionsEditor() {
  const { courseId, quizId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const questionList = Object.values(
    useSelector((state: KanbasState) => state.questionsReducer.questions)
  )
  const question = useSelector((state: KanbasState) => state.questionsReducer.question)

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsData = await client.getQuestionsByQuizId(quizId || '')
      dispatch(setQuestions(questionsData))
    }
    fetchQuestions()
  }, [dispatch, question, questionList.length])

  const questionType = (type: any) => {
    switch (type) {
      case 'MULTIPLE_CHOICE':
        return 'Multiple Choice'
      case 'TRUE_FALSE':
        return 'True/False'
      case 'FILL_IN_BLANKS':
        return 'Fill in the Blank'
      default:
        return 'Unknown'
    }
  }

  const handelDeleteQuestion = async () => {
    await client.deleteQuestion(quizId || '', question._id)
    const questionsData = await client.getQuestionsByQuizId(quizId || '')
    dispatch(setQuestions(questionsData))
  }
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }
  const handleSave = async () => {
    await client.updateQuiz(quiz)
    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setCurrentQuiz(quiz))
    dispatch(setQuestions(quiz.questions))
    dispatch(setQuestions(quiz.questions))
    dispatch(setQuizzes(quizzesData))
  }
  const handleSaveAndPublish = async () => {
    await client.updateQuiz(quiz)
    await client.publishQuiz(quizId || '')
    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setCurrentQuiz(quiz))
    dispatch(setQuestions(quiz.questions))
    dispatch(setQuizzes(quizzesData))
  }

  return (
    <div className='my-5'>
      {questionList.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {questionList.map((question: any) => (
              <tr key={question._id}>
                <td>
                  <p>{question.title}</p>
                </td>
                <td>
                  <p>{question.description}</p>
                </td>
                <td>
                  <p>{questionType(question.type)}</p>
                  {/* <p>{question.type}</p> */}
                </td>
                <td>
                  <Link
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuestionEditor/${question._id}`}
                    className="btn btn-secondary me-2"
                    onClick={(e) => dispatch(setQuestion(question))}
                  >
                    Edit
                  </Link>
                  <button onClick={handelDeleteQuestion} className="btn btn-danger">
                    Delete
                  </button>
                </td>
                {/* <div>
                  <div className="row">
                    <div className="col">
                      <p>{question.title}</p>
                    </div>
                    <div className="col">
                      <p>{question.description}</p>
                    </div>
                    <div className="col">
                      <p>{question.points}</p>
                    </div>
                    {question.choices?.map((choice: any) => <div className="col">{choice}</div>)}
                    {question.correct?.map((choice: any) => <div className="col">{choice}</div>)}
                  </div>
                </div> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="my-5">
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuestionEditor/${new Date().getTime().toString()}`}
          className="btn btn-secondary me-5"
        >
          {' '}
          + New Question{' '}
        </Link>
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuestionReview`}
          className="btn btn-secondary"
        >
          {' '}
          Go to Review{' '}
        </Link>
      </div>
      <hr />
      <div className="clearfix">
        <div className="float-start">
          <input type="checkbox" name="notify" />
          <label htmlFor="notify">Notify users this quiz has changed</label>
        </div>
        <div className="float-end">
          <button onClick={handleCancel} className="btn btn-ligit">
            Cancel
          </button>
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
  )
}

export default QuestionsEditor
