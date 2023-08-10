import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {useUserDispatch} from '../contexts/UserContext';
import {useNavigate} from "react-router-dom";
import CREATE from "../graphql/mutations/Create";

const CreateUser: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [createUser, {loading, error}] = useMutation(CREATE.USER);
    const navigate = useNavigate();
    const dispatch = useUserDispatch();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const input = {username, email, password};
        const user = await createUser({
            variables: {input}
        });
        dispatch?.({type: 'SET_USER', payload: user.data.createdUser});
        //navigate to dashboard page with router
        navigate('/dashboard');

        console.log('User details:', {username, email, password});
    };

    return (
        <div className="create-user-container">
            <h2>Create User</h2>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="btn-create-user">Create Account</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default CreateUser;
