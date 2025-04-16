import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockQuizzes = [
      { id: 1, title: 'Python начало' },
      { id: 2, title: 'JavaScript Основы' },
      { id: 3, title: 'React для начинающих' },
    ];
    setQuizzes(mockQuizzes);

  }, []);

  const handleStartQuiz = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2> Доступные квизы</h2>
        {quizzes.length === 0 ? (
          <p>Нет доступных квизов</p>
        ) : (
          <ul style={styles.list}>
            {quizzes.map((quiz) => (
              <li key={quiz.id} style={styles.listItem}>
                <span>{quiz.title}</span>
                <button style={styles.button} onClick={() => handleStartQuiz(quiz.id)}>Пройти</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '10px 0'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default QuizList;