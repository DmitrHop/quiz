import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from '../../quiz-app/src/components/LogIn';
import SignUp from '../../quiz-app/src/components/SignUp';
import MainPage from '../../quiz-app/src/components/MainPage';
import Profile from '../../quiz-app/src/components/Profile';
import QuizList from '../../quiz-app/src/components/QuizList';
import QuizPage from '../../quiz-app/src/components/QuizPage';
import QuizResults from '../../quiz-app/src/components/QuizResults';
import Teacher from '../../quiz-app/src/components/Teacher';
import QuizCreate from '../../quiz-app/src/components/QuizCreate';

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