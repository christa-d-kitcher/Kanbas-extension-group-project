import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizReducer';
import QuizList from './QuizFolder/QuizList';
import QuizDetails from './QuizFolder/QuizDetails';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

// need check route for quizlist and quizdetail
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
                {/* check path */}

        <Route path="/Kanbas/Courses/QuizzesList/QuizDetails" element={<QuizList />} /> 
        
        {/* check path */}

        <Route path="/Kanbas/Courses/QuizzesList/QuizDetails" element={<QuizDetails />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);
