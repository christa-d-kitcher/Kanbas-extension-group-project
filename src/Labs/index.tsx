import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from '../Nav';
import Assignment1 from './a1';
import Assignment3 from './a3';
import Assignment2 from './a2';
import Assignment4 from './a4';
import Assignment5 from './a5';
import store from './store';
import { Provider } from 'react-redux';

function Labs() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <Nav />
        <Routes>
          <Route path="a1" element={<Assignment1 />} />
          <Route path="a2" element={<Assignment2 />} />
          <Route path="a3" element={<Assignment3 />} />
          <Route path="a4" element={<Assignment4 />} />
          <Route path="a5" element={<Assignment5 />} />
          <Route path="/"  element={<Assignment5 />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default Labs;