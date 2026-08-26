import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Quick navigation matching your navbar items
  const quickLinks = [
    {
      title: 'Users List',
      description: 'View, filter, and manage registered system users.',
      path: '/users',
      color: 'bg-blue-500',
      badge: 'Management',
    },
    {
      title: 'Add New User',
      description: 'Create new user profiles and set access permissions.',
      path: '/add-user',
      color: 'bg-indigo-500',
      badge: 'Action',
    },
    {
      title: 'Posts & Feed',
      description: 'Browse all published posts across user accounts.',
      path: '/posts',
      color: 'bg-purple-500',
      badge: 'Content',
    },
    {
      title: 'User Analytics & Charts',
      description: 'Visualize user engagement, posts per user, and site stats.',
      path: '/charts',
      color: 'bg-emerald-500',
      badge: 'Analytics',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-4xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome to UserHub</h1>
        <p className="text-blue-100 max-w-2xl text-lg">
          Manage users, track post interactions, and inspect platform metrics seamlessly from one unified dashboard.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/users"
            className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition shadow-md"
          >
            Manage Users
          </Link>
          <Link
            to="/add-user"
            className="bg-blue-700 bg-opacity-40 hover:bg-opacity-60 text-white px-5 py-2.5 rounded-xl font-semibold border border-white/20 transition"
          >
            + Add User
          </Link>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Total Users</span>
          <p className="text-3xl font-bold text-gray-800 mt-1">1,248</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Total Posts</span>
          <p className="text-3xl font-bold text-gray-800 mt-1">4,890</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Avg. Posts / User</span>
          <p className="text-3xl font-bold text-gray-800 mt-1">3.9</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-500">Active Status</span>
          <p className="text-3xl font-bold text-emerald-600 mt-1">99.8%</p>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all block"
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;