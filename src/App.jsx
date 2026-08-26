import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import AddUser from './pages/AddUser';
import Posts from './pages/Posts';
import PostsPerUser from './pages/PostsPerUser';
import UserCharts from './pages/UserCharts';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './i18n/i18n';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <NavBar />
          <main className="w-full py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-user"
                element={
                  <ProtectedRoute>
                    <AddUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <Posts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts-per-user"
                element={
                  <ProtectedRoute>
                    <PostsPerUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/charts"
                element={
                  <ProtectedRoute>
                    <UserCharts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}