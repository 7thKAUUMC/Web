import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import TodoDetailPage from './pages/TodoDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo/:id" element={<TodoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;