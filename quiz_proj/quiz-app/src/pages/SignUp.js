import React, { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    setError('');
    console.log({ username, email, password });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input style={styles.input} type="text" placeholder="Имя" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input style={styles.input} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input style={styles.input} type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button style={styles.button} type="submit">Зарегистрироваться</button>
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

export default SignUp;