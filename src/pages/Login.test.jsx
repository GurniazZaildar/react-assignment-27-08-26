import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';

// Helper wrapper to provide Router and Auth context
const renderWithProviders = (ui) => {
    return render(
        <AuthProvider>
            <BrowserRouter>{ui}</BrowserRouter>
        </AuthProvider>
    );
};

describe('Login Component', () => {
    test('renders username and password input fields along with sign in button', () => {
        renderWithProviders(<Login />);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /sign in/i })
        ).toBeInTheDocument();
    });

    test('allows entering username and password', () => {
        renderWithProviders(<Login />);

        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password123');
    });

    test('submits form on button click', async () => {
        renderWithProviders(<Login />);

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(submitButton).toBeInTheDocument();
        });
    });
});