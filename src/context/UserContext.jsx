import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial Fetch
    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=50')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch users');
                return res.json();
            })
            .then((data) => {
                setUsers(data.users || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Add User
    const addUser = (newUser) => {
        const createdUser = {
            ...newUser,
            id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        };
        setUsers((prevUsers) => [createdUser, ...prevUsers]);
    };

    // Edit User
    const updateUser = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
        );
    };

    // Delete User
    const deleteUser = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    return (
        <UserContext.Provider
            value={{
                users,
                loading,
                error,
                addUser,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// Custom hook for easy access
export function useUsers() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
}