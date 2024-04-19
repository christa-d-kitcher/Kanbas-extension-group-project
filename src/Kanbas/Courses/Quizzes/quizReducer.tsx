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
    questions: any[];
}

interface QuizState {
  quizzes: Quiz[];
  quiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  quiz: null,
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
      state.quizzes = state.quizzes.filter(quiz => quiz.id !== action.payload);
    },
  },
});

export const { setQuizzes, setCurrentQuiz, addQuiz, updateQuiz, deleteQuiz } = quizSlice.actions;

export default quizSlice.reducer;