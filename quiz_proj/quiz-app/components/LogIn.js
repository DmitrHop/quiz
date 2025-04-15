import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import quizApi from '../api/quizApi';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await quizApi.post('login/', { username, password });
            localStorage.setItem('token', response.data.token);
            history.push('/mainpage'); 
        } catch (error) {
            alert('Log in error');
        }
    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default LogIn;