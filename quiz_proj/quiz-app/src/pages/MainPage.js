import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Добро пожаловать в QuizApp!</h1>
      <p style={{ fontSize: '20px', marginBottom: '30px' }}>
        Создавайте, проходите и анализируйте свои квизы.
      </p>
      <Link to="/quizzes">
        <button style={{
          padding: '15px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Перейти к квизам
        </button>
      </Link>
    </div>
  );
};

export default MainPage;