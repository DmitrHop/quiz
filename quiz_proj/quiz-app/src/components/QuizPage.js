import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizApi from '../api/quizApi';

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    api.get(`/quizzes/${id}/`)
      .then(res => setQuiz(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
      {quiz ? (
        <>
          <h2>{quiz.title}</h2>
          <ul>
            {quiz.questions.map(q => (
              <li key={q.id}>{q.text}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizPage;