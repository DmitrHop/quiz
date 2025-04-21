import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizCreate = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correct: 0 }
  ]);

  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      title,
      questions: questions.map((q) => ({
        text: q.text,
        options: q.options,
        correct: q.correct
      }))
    };

    axios.post('http://localhost:8000/api/quizzes/', quizData)
      .then(res => {
        console.log('Квиз создан');
        navigate('/quizzes');
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2> Создание нового квиза</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название квиза"
            style={styles.input}
            required
          />

          {questions.map((q, i) => (
            <div key={i} style={styles.questionBlock}>
              <h4 style={{ marginBottom: '8px' }}>Вопрос {i + 1}</h4>
              <input
                type="text"
                placeholder="Текст вопроса"
                value={q.text}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[i].text = e.target.value;
                  setQuestions(updated);
                }}
                style={styles.input}
                required
              />

              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  placeholder={`Вариант ${j + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[i].options[j] = e.target.value;
                    setQuestions(updated);
                  }}
                  style={styles.input}
                  required
                />
              ))}

              <label style={{ marginTop: '8px' }}>
                Правильный вариант:
                <select
                  value={q.correct}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[i].correct = parseInt(e.target.value);
                    setQuestions(updated);
                  }}
                  style={styles.select}
                >
                  {[0, 1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}

          <div style={styles.buttonRow}>
            <button type="button" onClick={handleAddQuestion} style={styles.buttonSecondary}>
               Добавить вопрос
            </button>
            <button type="submit" style={styles.buttonPrimary}>
               Сохранить квиз
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '90h',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    color: '#000'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%'
  },
  select: {
    marginLeft: '10px',
    padding: '8px',
    fontSize: '16px'
  },
  questionBlock: {
    backgroundColor: '#fafafa',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
  },
  buttonPrimary: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  buttonSecondary: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default QuizCreate;