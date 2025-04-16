import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';
import QuizCreate from './pages/QuizCreate';
import QuizList from './pages/QuizList';
import Profile from './pages/Profile';
import QuizResults from './pages/QuizResults';
import Teacher from './pages/Teacher';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/create" element={<QuizCreate />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/results/:quizId" element={<QuizResults />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </div>
  );
};

export default App;
