import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFound from '../pages/NotFound';

describe('NotFound Component', () => {
    test('renders 404 heading and error message', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });

    test('renders navigation link pointing to home page', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const homeLink = screen.getByRole('link', { name: /go back home/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });
});