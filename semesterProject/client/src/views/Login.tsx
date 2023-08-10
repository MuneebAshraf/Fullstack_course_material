import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import LOGIN from '../graphql/mutations/Login';
import {useNavigate} from 'react-router-dom';
import {useUserDispatch} from '../contexts/UserContext';
import {UserInput} from "../types";


const Login: React.FC = () => {
    const dispatch = useUserDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login, {loading, error}] = useMutation(LOGIN);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            const input:UserInput = {username, password} ;
            const user = await login({
                variables: {input}
            });
            dispatch?.({type: 'SET_USER', payload: user.data.login});
            //navigate to dashboard page with router
            navigate('/dashboard');

        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-login">Login</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Login;
