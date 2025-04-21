import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const { quizId } = useParams(); 
  const [quiz, setQuiz] = useState(null); 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/quizzes/${quizId}/`)
      .then(res => setQuiz(res.data))
      .catch(err => console.error(err));
  }, [quizId]);

  return (
    <div style={styles.container}>
      <h2>Прохождение квиза</h2>
      {quiz ? (
        <div>
          <h3>{quiz.title}</h3>
          {/* вопросы и варианты ответа */}
        </div>
      ) : (
        <p>Загрузка...</p>
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

export default QuizPage;