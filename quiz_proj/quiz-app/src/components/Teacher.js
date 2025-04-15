import React, { useEffect, useState } from 'react';
import quizApi from '../api/quizApi';

const Teacher = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get('/teacher/quizzes/')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
  }, []);

  const assignQuiz = (quizId) => {
    api.post(`/teacher/assign/${quizId}/`)
      .then(() => alert('Quiz scheduled!'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Teacher's panel</h2>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            {quiz.title}
            <button onClick={() => assignQuiz(quiz.id)}>Schedule</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teacher;