import { createSlice } from '@reduxjs/toolkit'

interface Question {
  _id?: string
  id: string
  type: string
  title: string
  choices?: string[]
  correct: string[]
  points: number
}

interface QuestionState {
  question: Question
  questions: Question[]
}

const initialState: QuestionState = {
  question: {
    id: '',
    type: 'MULTIPLE_CHOICE',
    title: 'new question',
    choices: [''],
    correct: [''],
    points: 0,
  },
  questions: [],
}

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    addChoice: (state, action) => {
      state.question = {
        ...state.question,
        choices: [...(state.question.choices ?? []), action.payload],
      }
    },
    deleteChoiceById: (state, action) => {
      state.question = {
        ...state.question,
        choices: state.question.choices?.filter((choice, index) => index !== action.payload),
      }
    },
    updateChoiceById: (state, action) => {
      state.question = {
        ...state.question,
        choices: state.question.choices?.map((choice, index) =>
          index === action.payload.index ? action.payload.choice : choice
        ),
      }
    },
    updateCorrectById: (state, action) => {
      state.question = {
        ...state.question,
        correct: state.question.correct.map((correct, index) =>
          index === action.payload.index ? action.payload.correct : correct
        ),
      }
    },
    resetQuestion: state => {
      state.question = { id: '', type: 'MULTIPLE_CHOICE', title: 'new question', correct: [''], points: 0 }
    },
    setQuestion: (state, action) => {
      // Check if choices and correct are arrays, provide default empty arrays if not
      const choices = Array.isArray(action.payload.choices) ? action.payload.choices : [];
      const correct = Array.isArray(action.payload.correct) ? action.payload.correct : [];

      state.question = {
        ...action.payload,
        choices: choices,
        correct: correct
      };
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload]
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(question => question._id !== action.payload)
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map(question => {
        if (question._id === action.payload._id) {
          return action.payload
        }
        return question
      })
    },
  },
})

export const {
  setQuestion,
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  addChoice,
  deleteChoiceById,
  resetQuestion,
  updateChoiceById,
  updateCorrectById,
} = questionSlice.actions
export default questionSlice.reducer
