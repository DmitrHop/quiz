import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault(); 

    axios.post('http://localhost:8000/api/login/', {
      username,
      password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      console.log('Успешный вход!');
    })
    .catch(error => console.error(error));
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <input style={styles.input} type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input style={styles.input} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button style={styles.button} type="submit">Войти</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '16px', width: '300px'
  },
  input: {
    padding: '10px', fontSize: '16px'
  },
  button: {
    padding: '10px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none'
  }
};

export default Login;