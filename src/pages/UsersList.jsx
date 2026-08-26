import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useUsers } from '../context/UserContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import AddUser from './AddUser';
import UserDetails from './UserDetails';

export default function UsersList() {
  const { users, loading, error, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [selectedUserIdForView, setSelectedUserIdForView] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const itemsPerPage = 25;

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

    if (!hasHadBirthdayThisYear) age--;
    return age;
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email ? user.email.toLowerCase() : '';
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || email.includes(search);
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
    if (sortBy === 'age') return calculateAge(a.birthDate) - calculateAge(b.birthDate);
    return a.id - b.id;
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteClick = (user) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            fetch(`https://dummyjson.com/users/${user.id}`, { method: 'DELETE' })
              .then(() => {
                deleteUser(user.id);
                setNotification(`User ${user.firstName} ${user.lastName} deleted successfully!`);
                setTimeout(() => setNotification(''), 3000);
              })
              .catch(() => {
                deleteUser(user.id);
                setNotification(`User ${user.firstName} ${user.lastName} deleted successfully!`);
                setTimeout(() => setNotification(''), 3000);
              });
          },
        },
        {
          label: 'Cancel',
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-4xl hover:bg-blue-700 transition"
        >
          + Add User
        </button>
      </div>

      {/* UI Toast Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-4xl border border-blue-200">
          {notification}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="p-2 border rounded-4xl w-full sm:w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort By:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="p-2 border rounded-4xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="id">Default</option>
            <option value="name">First Name</option>
            <option value="age">Age</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Age</th>
              <th className="p-3">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => {
                const age = calculateAge(user.birthDate);
                const isUnder50 = age !== 'N/A' && age < 50;

                return (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{1000 + user.id}</td>
                    <td className="p-3">{user.firstName}</td>
                    <td className="p-3">{user.lastName}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.birthDate || 'N/A'}</td>
                    <td className={`p-3 font-bold ${isUnder50 ? 'text-red-600' : 'text-green-600'}`}>
                      {age}
                    </td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedUserIdForView(user.id)}
                        className="p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => setSelectedUserForEdit(user)}
                        className="p-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition"
                        title="Edit User"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-4xl hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-4xl hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* View User Details Modal */}
      {selectedUserIdForView && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <UserDetails
            userId={selectedUserIdForView}
            onClose={() => setSelectedUserIdForView(null)}
          />
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xl">
            <AddUser onClose={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedUserForEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xl">
            <AddUser
              initialData={selectedUserForEdit}
              isEdit={true}
              onClose={() => setSelectedUserForEdit(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}