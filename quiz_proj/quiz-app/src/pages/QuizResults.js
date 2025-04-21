import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizResults = () => {
  const { quizId } = useParams(); 
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/results/${quizId}/`)
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, [quizId]);

  return (
    <div style={styles.container}>
      <h2>Ваши результаты</h2>
      {results.length === 0 ? (
        <p>Результаты не найдены.</p>
      ) : (
        <ul>
          {results.map((r, idx) => (
            <li key={idx}>
              {r.quiz}: {r.score}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center'
  }
};

export default QuizResults;