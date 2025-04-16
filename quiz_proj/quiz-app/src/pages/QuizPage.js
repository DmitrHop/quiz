import React from 'react';

const QuizPage = () => {
  return (
    <div style={styles.container}>
      <h2>Прохождение квиза</h2>
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