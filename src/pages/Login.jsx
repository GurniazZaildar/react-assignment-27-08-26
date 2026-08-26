import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(username, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-4xl shadow-md border">
            <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">Login</h2>

            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="w-full p-2 border rounded-lg mt-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full p-2 border rounded-lg mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-4xl font-medium hover:bg-blue-700"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;