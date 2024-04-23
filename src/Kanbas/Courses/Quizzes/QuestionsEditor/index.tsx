import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { KanbasState } from '../../../store'
import { setQuestions, setQuestion, resetQuestion,deleteQuestion } from './questionsReducer'
import { setCurrentQuiz, setQuizzes, resetQuiz, updateQuiz, addQuiz } from '../quizReducer'
import * as client from '../client'

function QuestionsEditor() {
  const { courseId, quizId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions)
  const question = useSelector((state: KanbasState) => state.questionsReducer.question)

  useEffect(() => {
    const fetchQuestions = async () => {
      await client.getQuestionsByQuizId(quizId ?? '').then(data => {
        if (data) {
          dispatch(setQuestions(data))
          dispatch(setCurrentQuiz({ ...quiz, questions: data }))
        }
      })
    }
    fetchQuestions()
  }, [questionList.length, quizId])

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

  const handelDeleteQuestion = async (questionId:any) => {
    dispatch(deleteQuestion(questionId))
    await client.deleteQuestion(quizId, questionId)
    const questionsData = await client.getQuestionsByQuizId(quizId || '')
    dispatch(setQuestions(questionsData))
    dispatch(resetQuestion())
    dispatch(resetQuiz())
  }
  const handleCancel = () => {
    dispatch(resetQuiz())
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }
  const handleSave = async () => {
    console.log('quiz', quiz)
    const updatedQuiz = {
      ...quiz,
      courseId: courseId,
      assignmentGroup: 'Quizzes',
      title: quiz.title,
      type: 'Graded Quiz',
    }
    // console.log('updatedQuiz', updatedQuiz)
    dispatch(setCurrentQuiz(updatedQuiz))
    const index = quizzes.findIndex(q => q._id === quizId)
    if (index !== -1) {
      await client.updateQuiz(quiz)
    } else {
      await client.saveQuiz(updatedQuiz)
    }
    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setQuizzes(quizzesData))
    dispatch(resetQuiz())
    dispatch(resetQuestion())
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }

  const handleSaveAndPublish = async () => {
    // console.log('quiz')
    dispatch(setCurrentQuiz({ ...quiz, questions: questionList, courseId: courseId }))
    const index = quizzes.findIndex(q => q._id === quizId)
    if (index !== -1) {
      await client.updateQuiz(quiz)
      await client.publishQuiz(quizId || '')
    } else {
      await client.saveQuiz(quiz)
      await client.publishQuiz(quizId || '')
    }
    const quizzesData = await client.getQuizzesByCourseId(courseId || '')
    dispatch(setQuizzes(quizzesData))
    dispatch(resetQuiz())
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }

  return (
    <div>
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
            {questionList?.map((question: any) => (
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
                    onClick={e => dispatch(setQuestion(question))}
                  >
                    Edit
                  </Link>
                  <button onClick={()=>handelDeleteQuestion(question._id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
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
