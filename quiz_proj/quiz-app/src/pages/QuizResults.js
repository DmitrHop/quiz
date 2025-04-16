import React from 'react';

const QuizResults = () => {
  //  запрос backend для получения результатов
  const results = [
    { quiz: 'React Basics', score: 80 },
    { quiz: 'HTML/CSS', score: 90 },
  ];

  return (
    <div style={styles.container}>
      <h2>Ваши результаты</h2>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            {r.quiz}: {r.score}%
          </li>
        ))}
      </ul>
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