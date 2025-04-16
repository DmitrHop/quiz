import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teacher = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setQuizzes([
      { id: 1, title: 'Python начало' },
      { id: 2, title: 'JavaScript Основы' },
      { id: 3, title: 'React для начинающих' },
    ]);
  
    setStudents([
      { id: 1, username: 'Denis Ogay' },
    ]);
  
    setAssignments([
      {
        id: 1,
        quizId: 1,
        studentId: 1,
        completed: true,
        score: 85
      },
      {
        id: 2,
        quizId: 2,
        studentId: 1,
        completed: false,
        score: null
      },
      {
        id: 3,
        quizId: 3,
        studentId: 1,
        completed: true,
        score: 92
      }
    ]);
  }, []);

  const assignQuiz = () => {
    if (!selectedQuiz || !selectedStudent) return;

    axios.post('/api/assignments/', {
      quiz_id: selectedQuiz,
      student_id: selectedStudent
    })
      .then(() => {
        setMessage('✅ Квиз назначен успешно!');
        setAssignments([...assignments, {
          id: Math.random(),
          quizId: selectedQuiz,
          studentId: selectedStudent,
          completed: false,
          score: null
        }]);
        setSelectedQuiz('');
        setSelectedStudent('');
      })
      .catch(err => {
        console.error(err);
        setMessage('❌ Ошибка при назначении');
      });
  };

  const getStudentName = id => students.find(s => s.id === id)?.username || '—';
  const getQuizTitle = id => quizzes.find(q => q.id === id)?.title || '—';

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2> Кабинет преподавателя</h2>

        <div style={{ marginBottom: '20px', color: 'green' }}>{message}</div>

        <div style={styles.row}>
          <select style={styles.select} value={selectedQuiz} onChange={(e) => setSelectedQuiz(e.target.value)}>
            <option value="">Выберите квиз</option>
            {quizzes.map(q => <option key={q.id} value={q.id}>{q.title}</option>)}
          </select>

          <select style={styles.select} value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Выберите студента</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.username}</option>)}
          </select>

          <button style={styles.button} onClick={assignQuiz}>Назначить</button>
        </div>

        <h3> Результаты студентов</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Студент</th>
              <th>Квиз</th>
              <th>Статус</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a.id}>
                <td>{getStudentName(a.studentId)}</td>
                <td>{getQuizTitle(a.quizId)}</td>
                <td>{a.completed ? '✅ Пройден' : '❌ Не пройден'}</td>
                <td>{a.completed ? `${a.score} баллов` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '200px',
  },
  row: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  select: {
    padding: '10px',
    flex: 1
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  thtd: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center'
  }
};

export default Teacher;