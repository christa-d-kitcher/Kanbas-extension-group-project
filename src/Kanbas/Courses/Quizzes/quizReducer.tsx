import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

interface Quiz {
  _id?: string
  title: string
  courseId: string
  description: string
  type: string
  assignmentGroup: string
  isPublished: boolean
  points: number
  publishedDate: string
  questions: any[]
  dueDate: string
  availableDate: string
  untilDate: string
  shuffleAnswers: boolean
  timeLimit: number
  multipleAttempts: boolean
  showCorrectAnswers: boolean
  accessCode: string
  oneQuestionAtATime: boolean
  webcamRequired: boolean
  lockQuestionsAfterAnswering: boolean
}

interface QuizState {
  quizzes: Quiz[]
  quiz: Quiz | null
}

const initialState: QuizState = {
  quizzes: [],
  quiz: {
    title: '',
    courseId: '',
    description: '',
    type: '',
    assignmentGroup: '',
    isPublished: false,
    points: 0,
    publishedDate: '',
    questions: [],
    dueDate: moment().add(7, 'days').format('YYYY-MM-DDTHH:mm'),
    availableDate: moment().format('YYYY-MM-DDTHH:mm'),
    untilDate: moment().add(14, 'days').format('YYYY-MM-DDTHH:mm'),
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: '',
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  },
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.quiz = action.payload
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload)
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map(quiz =>
        quiz._id === action.payload._id ? action.payload : quiz
      )
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload)
    },
    resetQuiz: (state) => {
      state.quiz = {
        title: '',
        courseId: '',
        description: '',
        type: '',
        assignmentGroup: '',
        isPublished: false,
        points: 0,
        publishedDate: '',
        questions: [],
        dueDate: moment().add(7, 'days').format('YYYY-MM-DDTHH:mm'),
        availableDate: moment().format('YYYY-MM-DDTHH:mm'),
        untilDate: moment().add(14, 'days').format('YYYY-MM-DDTHH:mm'),
        shuffleAnswers: false,
        timeLimit: 0,
        multipleAttempts: false,
        showCorrectAnswers: false,
        accessCode: '',
        oneQuestionAtATime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
      }
    },
  },
})


export const { setQuizzes, setCurrentQuiz, addQuiz, updateQuiz, deleteQuiz, resetQuiz } =
  quizSlice.actions

export default quizSlice.reducer
