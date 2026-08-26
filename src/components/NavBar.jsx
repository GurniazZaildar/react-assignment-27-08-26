import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Users List', path: '/users' },
        { name: 'Add New User', path: '/add-user' },
        { name: 'Posts', path: '/posts' },
        { name: 'Posts Per User', path: '/posts-per-user' },
        { name: 'User Charts', path: '/charts' },
        { name: 'Settings', path: '/settings' },
    ];

    // Helper function to style active vs inactive links
    const getLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-3xl text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
        }`;

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

                {/* Brand Logo */}
                <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-400">
                    <img src="/icons8-cloud-storage-3d-fluency-96.png" alt="Logo" className="w-8 h-8" />
                    <span>UserHub</span>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-4">
                    {links.map((link) => (
                        <NavLink key={link.path} to={link.path} className={getLinkClass}>
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl p-2 rounded  text-gray-400 hover:text-white "
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800 ">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md  ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}