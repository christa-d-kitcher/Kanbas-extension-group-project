import { configureStore } from '@reduxjs/toolkit'
import modulesReducer from '../Courses/Modules/modulesReducer'
import assignmentsReducer from '../Courses/Assignments/assignmentsReducer'
import questionsReducer from "../Courses/Quizzes/QuestionsEditor/questionsReducer";
import quizReducer from "../Courses/Quizzes/quizReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[]
    module: any
  }
  assignmentsReducer: {
    assignments: any[]
    assignment: any
    selectedAssignmentIds: Set<string>
  }
  questionsReducer: {
    questions: any[]
    question: any
  }
  quizReducer: {
    quizzes: any[]
    quiz: any
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    questionsReducer,
    quizReducer,
  },
})

export default store
