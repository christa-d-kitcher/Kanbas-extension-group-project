import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quiz {
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
  currentQuiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },
  },
});

export const { setQuizzes, setCurrentQuiz } = quizSlice.actions;

export default quizSlice.reducer;
