import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { KanbasState } from '../../../store'
import { setQuestions } from './questionsReducer'
import { setCurrentQuiz } from '../quizReducer'
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
    const fetchQuizzes = async () => {
      const currentQuiz = quizzes.find(quiz => quiz._id === quizId)
      const questions = await client.getQuestionsByQuizId(quizId || '')
      dispatch(setCurrentQuiz(currentQuiz))
      dispatch(setQuestions(questions))
    }
    fetchQuizzes()
  }, [dispatch, question, questionList.length])
  return (
    <div>
      {questionList.length > 0 && (
        <ul>
          {questionList.map((question: any) => (
            <li key={question._id}>
              <div>
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
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link
        to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuestionEditor/${new Date().getTime().toString()}`}
        className="btn btn-secondary"
      >
        {' '}
        + New Question{' '}
      </Link>
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuestionReview`} className="btn btn-secondary">
        {' '}
        Go to Review{' '}
      </Link>
    </div>
  )
}

export default QuestionsEditor
