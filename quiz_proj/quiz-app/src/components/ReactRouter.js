import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import MainPage from './MainPage';
import Profile from './Profile';
import QuizList from './QuizList';
import QuizPage from './QuizPage';
import QuizResults from './QuizResults';
import Teacher from './Teacher';
import QuizCreate from './QuizCreate';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/mainpage" component={MainPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/quizlist" component={QuizList} />
          <Route path="/quiz/:quizId" component={QuizPage} />
          <Route path="/quizresults" component={QuizResults} />
          <Route path="/teacher" component={Teacher} />
          <Route path="/quizcreate" component={QuizCreate} />
          <Route path="/" exact component={LogIn} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;