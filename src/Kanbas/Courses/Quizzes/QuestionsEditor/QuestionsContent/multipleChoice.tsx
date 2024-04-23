import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { KanbasState } from '../../../../store'
import {
  setQuestion,
  setQuestions,
  addQuestion,
  updateQuestion,
  addChoice,
  deleteChoiceById,
  resetQuestion,
  updateChoiceById,
  updateCorrectById,
} from '../questionsReducer'
import * as client from '../../client'
import { FaArrowRight, FaTrash } from 'react-icons/fa'
import { updateQuiz } from '../../quizReducer'

function MultipleChoice() {
  const { courseId, quizId, questionId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const question = useSelector((state: KanbasState) => state.questionsReducer.question)
  const questions = useSelector((state: KanbasState) => state.questionsReducer.questions)
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const handleAddAnswer = () => {
    dispatch(addChoice(''))
  }

  const handelCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`)
  }
  

  const handleUpdateQuestion = async () => {
    const newQuestion = {
      ...question,
      courseId: courseId,
      choices: question.choices,
      correct: question.correct,
    }
    // console.log('question', newQuestion)
    // console.log('quiz', quiz)
    const newQuiz = { ...quiz, questions: newQuestion }
    // console.log('quiz1', newQuiz)
    await client.updateQuiz(newQuiz)
    dispatch(resetQuestion())

    const index = questions.findIndex(q => q._id === questionId)
    if (index !== -1) {
      dispatch(updateQuestion(question))
      dispatch(resetQuestion())
      // console.log('question11', question)
    } else {
      const correct = []
      const choices = []

      const answer = document.getElementById('m_correct') as HTMLInputElement
      correct.push(answer.value)

      for (let i = 0; i < question.choices.length; i++) {
        const choice = document.getElementById(i.toString()) as HTMLInputElement
        choices.push(choice.value)
      }

      const newQuestion = { ...question, choices: choices, correct: correct }
      // console.log('newQuestion', newQuestion)
      // dispatch(setQuestion(newQuestion))
      dispatch(addQuestion(newQuestion))
    }
    // dispatch(resetQuestion())
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`)
  }

  return (
    <div className="flex">
      <p>Enter your question and multiple answers, then select the one correct answer.</p>
      <h4>Question:</h4>
      <textarea
        rows={3}
        className="form-control"
        id="m_question"
        value={question.description || ''}
        onChange={e => dispatch(setQuestion({ ...question, description: e.target.value }))}
      ></textarea>
      <h4>Answers:</h4>

      <div className="row">
        <div className="col-2 ms-4">
          <FaArrowRight />
          <label className="ms-2">Correct Answers:</label>
        </div>
        <div className="col-7">
          <input
            type="text"
            className="form-control w-25"
            id="m_correct"
            value={question.correct || ''}
            onChange={e => dispatch(updateCorrectById({ index: 0, correct: e.target.value }))}
          />
        </div>
      </div>

      {(question.choices || []).map((choice: any, index: any) => (
        <React.Fragment key={choice.id || index}>
          <br />
          <div className="row">
            <div className="col-2 ms-4">
              <FaArrowRight />
              <label className="ms-2">Possible Answers:</label>
            </div>
            <div className="col-7">
              <input
                type="text"
                className="form-control w-25"
                id={index.toString()}
                value={choice}
                onChange={e => dispatch(updateChoiceById({ index: index, choice: e.target.value }))}
              />
            </div>
            <div className="col-2 ms-5">
              <button className="btn btn-danger" onClick={() => dispatch(deleteChoiceById(index))}>
                <FaTrash />
              </button>
            </div>
          </div>
        </React.Fragment>
      ))}

      <button className="btn btn-danger mt-3" onClick={handleAddAnswer}>
        + Add Another Answer
      </button>

      <div>
        <button className="btn btn-secondary mt-3" onClick={handelCancel}>
          Cancel
        </button>
        <button className="btn btn-success mt-3 ms-3" onClick={handleUpdateQuestion}>
          Update Question
        </button>
      </div>
    </div>
  )
}

export default MultipleChoice
