import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { MdErrorOutline } from 'react-icons/md'
import { CiSquareChevRight, CiEdit } from 'react-icons/ci'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import { KanbasState } from '../../../../store'
import * as client from '../../client'
import { updateQuiz } from '../../quizReducer'

function QuestionReview() {
  const dispatch = useDispatch()
  const { quizId, courseId } = useParams()
  const navigate = useNavigate()
  const quizzes = useSelector((state: KanbasState) => state.quizReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz)
  const currentQuiz = quizzes.find(quiz => quiz._id === quizId)
  // console.log('currentQuiz', currentQuiz)
  const questions = useSelector((state: any) => {
    const questionData = state.questionsReducer.questions
    // return questionData ? Object.values(questionData) : []
    return questionData ? questionData : []
  })
  // const questions = currentQuiz?.questions;
  // console.log('quizId', quizId)
  // console.log('courseId', courseId)
  console.log('questions', questions)
  const [questionNum, setQuestionNum] = useState(0)
  const [ifFirst, setIfFirst] = useState(false)

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  const handleNext = () => {
    const isLastQuestion = questionNum === questions.length - 1
    setQuestionNum(prev => (prev + 1) % questions.length) // Loop back to first question after the last one
    setIfFirst(isLastQuestion)
  }
  const handlePre = () => {
    setQuestionNum(prev => (prev - 1 + questions.length) % questions.length) // Loop back to last question after the first one
  }

  function questionAnswer() {
    const question = questions[questionNum]
    switch ((question as any).type) {
      case 'MULTIPLE_CHOICE':
        const multipleChoiceQuestion = question as { choices: string[] }
        return multipleChoiceQuestion.choices.map((choice: string) => (
          <div key={choice}>
            <input type="radio" id={choice} name="question" value={choice} />
            <label htmlFor={choice}>{choice}</label>
          </div>
        ))
      case 'TRUE_FALSE':
        return ['True', 'False'].map(choice => (
          <div key={choice}>
            <input type="radio" id={choice} name="question" value={choice} />
            <label htmlFor={choice}>{choice}</label>
          </div>
        ))
      case 'FILL_IN_BLANKS':
        return (
          <input type="text" id="fill-in-answer" name="question" placeholder="Enter your answer" />
        )
      default:
        return <p>No answer options available for this question type.</p>
    }
  }

  const handleUpdateQuiz = async (quiz:any) => {
    // console.log('quizId', quizId)
    const updatedQuiz = await client.updateQuiz(quiz)
    dispatch(updateQuiz(updatedQuiz))
  }

  const handleSubmitQuiz = () => {
    handleUpdateQuiz(quiz)
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)
  }

  function renderQuestionList() {
    // console.log(questions)
    return questions.map((question: any, index: number) => (
      <div
        key={question._id}
        style={{ fontWeight: index === questionNum ? 'bold' : 'normal', color: '#C34847' }}
      >
        Question {index + 1}: {question.title}
      </div>
    ))
  }
  return (
    <div className="mb-5 pb-5">
      <h1>{currentQuiz?.title}</h1>
      <div
        className="p-3 me-4 my-3"
        style={{ background: '#F9ECE8', color: '#CC5546', borderRadius: '10px', fontSize: '18px' }}
      >
        <MdErrorOutline className="mx-2" />
        This is a preview of the published version of the quiz
      </div>
      <div style={{ color: '#55666E' }}>Started: {formattedDate}</div>
      <h1>Quiz Instructions</h1>
      <hr className="me-4" />
      <div>
        <div className="px-4 clearfix">
          <CiSquareChevRight
            className="float-start"
            style={{ fontSize: '40px', color: '#8AA8BA' }}
          />
          <div className="card float-end" style={{ width: '97%' }}>
            <div className="card-header bg-light clearfix">
              <h3 className="float-start">{(questions[questionNum] as any).title}</h3>
              <h3 className="float-end" style={{ color: '#6F6F6F' }}>
                {(questions[questionNum] as any).points} pts
              </h3>
            </div>
            <div className="card-body">
              <div style={{ fontSize: '18px' }}>{(questions[questionNum] as any).description}</div>
              <hr />
              <div>{questionAnswer()}</div>
            </div>
          </div>
          <div className="clearfix py-4">
            <button className="btn btn-light float-end me-5 mt-3" onClick={handleNext}>
              {ifFirst ? 'First' : 'Next'} <FaCaretRight />
            </button>
            <button className="btn btn-light float-end me-3 mt-3" onClick={handlePre}>
              <FaCaretLeft /> Previous
            </button>
          </div>
        </div>
        <div className="mb-5 pd-5">
          <div
            className="p-3 me-4 my-3 clearfix text-center"
            style={{ color: '#CC5546', fontSize: '18px', border: '1px solid #CFCFCF' }}
          >
            <button className="btn btn-light float-end ms-5" onClick={handleSubmitQuiz}>
              Submit Quiz
            </button>
            <div className="float-end mt-1" style={{ color: '#55666E' }}>
              Quiz saved at {formattedDate}
            </div>
          </div>
        </div>
        <div
          className="p-3 me-4"
          style={{
            color: '#CC5546',
            fontSize: '18px',
            border: '1px solid #CFCFCF',
            background: '#F5F5F5',
          }}
        >
          <div style={{ color: '#55666E' }}>
            <CiEdit className="me-2" />
            Keep Editing This Quiz
          </div>
        </div>
        <h2 className="my-3">Questions:</h2>
        {/* {currentQuiz.questions.map((item: any) => {
        return <div key={item._id}>{item.title}</div>
      })} */}
        {renderQuestionList()}
      </div>
    </div>
  )
}

export default QuestionReview
