import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizResults } from '../api/quizApi'; 

const QuizResults = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await getQuizResults(quizId);
      setResults(data);
    };

    fetchResults();
  }, [quizId]);

  if (!results) {
    return <div>Loading results...</div>;
  }

  return (
    <div>
      <h1>Results for Quiz: {results.quizTitle}</h1>
      <ul>
        {results.users.map((user, index) => (
          <li key={index}>
            {user.username}: {user.score} / {results.totalQuestions}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResults;