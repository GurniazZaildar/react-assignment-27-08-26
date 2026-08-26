import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Always initialize as null so refreshes reset auth state
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.accessToken) {
            setToken(data.accessToken);
            setUser(data);
            return { success: true };
        } else {
            return { success: false, message: data.message || 'Invalid credentials' };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, isAuthenticated: !!token }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);