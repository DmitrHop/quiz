import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ username: 'Bulba', email: 'ogay-den@mail.ru' }); // можно заменить на авторизацию
  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes([
      { id: 1, title: 'Python начало' },
      { id: 2, title: 'JavaScript Основы' },
      { id: 3, title: 'React для начинающих' },
    ]);

    setResults([
      { id: 1, quizId: 1, completed: true, score: 85 },
      { id: 2, quizId: 2, completed: false, score: null },
      { id: 3, quizId: 3, completed: true, score: 92 },
    ]);

  }, []);

  const getQuizTitle = (id) => quizzes.find(q => q.id === id)?.title || '—';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2> Личный кабинет</h2>
        <p><strong>Имя пользователя:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <h3 style={{ marginTop: '30px' }}> Мои результаты</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Квиз</th>
              <th>Статус</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{getQuizTitle(r.quizId)}</td>
                <td>{r.completed ? ' Пройден' : ' Не пройден'}</td>
                <td>{r.completed ? `${r.score} баллов` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '200px',
  },
  table: {
    width: '120%',
    borderCollapse: 'collapse',
    marginTop: '30px'
  },
  thtd: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center'
  }
};

export default Profile;