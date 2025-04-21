import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '' }); 
  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/profile/')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  
    axios.get('http://localhost:8000/api/results/')
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  
    axios.get('http://localhost:8000/api/quizzes/')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
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