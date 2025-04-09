import React, { useState, useEffect } from 'react';
import { getQuizzes } from '../api/quizApi';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesData = await getQuizzes();
      setQuizzes(quizzesData);
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Quiz List</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <a href={`/quiz/${quiz.id}`}>{quiz.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;