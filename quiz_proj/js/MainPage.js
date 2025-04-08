import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <nav>
        <ul>
          <li><Link to="/start a quiz">Start a Quiz</Link></li>
          <li><Link to="/quizzes">View Quizzes</Link></li>
          <li><Link to="/teacher">Teacher's Dashboard</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MainPage;