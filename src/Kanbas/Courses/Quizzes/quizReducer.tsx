import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quiz {
    _id?: string;
    id: string;
    title: string;
    description: string;
    published: boolean;
    available: boolean;
    dueDate: string;
    points: number;
    timeLimit: number,
    type: string,
    assignmentGroup: string,
    isPublished: boolean,
    shuffleAnswers: boolean,
    multipleAttempts: boolean,
    oneQuestionAtATime: boolean,
    webcamRequired: boolean,
    lockQuestionsAfterAnswering: boolean,
    questions: any[];
}

interface QuizState {
  quizzes: Quiz[];
  quiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  quiz: { id: '', title: '', description: '', published: false, available: false, dueDate: '', points: 0, timeLimit: 0, type: '', assignmentGroup: '', isPublished: false, shuffleAnswers: false, multipleAttempts: false, oneQuestionAtATime: false, webcamRequired: false, lockQuestionsAfterAnswering: false, questions: [] },
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.quiz = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map(quiz =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
    },
    resetQuiz: (state) => {
      state.quiz = {_id: '', id: '', title: '', description: '', published: false, available: false, dueDate: '', points: 0, timeLimit: 0, type: '', assignmentGroup: '', isPublished: false, shuffleAnswers: false, multipleAttempts: false, oneQuestionAtATime: false, webcamRequired: false, lockQuestionsAfterAnswering: false, questions: [] };
    },
  },
});

export const { setQuizzes, setCurrentQuiz, addQuiz, updateQuiz, deleteQuiz, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;