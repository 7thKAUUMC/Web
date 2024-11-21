import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoInfo from './components/TodoInfo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todo/:id" element={<TodoInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
