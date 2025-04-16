import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleGoToQuiz = (e) => {
    e.preventDefault();
    if (quizId) {
      navigate(`/quiz/${quizId}`);
      setQuizId('');
    }
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Главная</Link> |{' '}
      <Link to="/quizzes">Все квизы</Link> |{' '}
      <Link to="/create">Создать квиз</Link> |{' '}
      <Link to="/profile">Личный Профиль</Link> |{' '}
      <Link to="/teacher">Кабинет Преподаватель</Link> |{' '}
      <Link to="/login">Вход</Link> |{' '}
      <Link to="/signup">Регистрация</Link>

      <form onSubmit={handleGoToQuiz} style={{ display: 'inline-block', marginLeft: '20px' }}>
        <input
          type="number"
          placeholder="ID квиза"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          style={{ width: '80px' }}
        />
        <button type="submit">Пройти</button>
      </form>
    </nav>
  );
};

export default Navbar;