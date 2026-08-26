import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function UserDetails({ userId, onClose }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        fetch(`https://dummyjson.com/users/${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch user details');
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full mx-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h2 className="text-xl font-bold text-gray-800">User Details</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 font-bold text-xl"
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            {loading && (
                <div className="py-8 flex justify-center">
                    <Spinner />
                </div>
            )}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && user && (
                <div className="space-y-4">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-center space-x-4 mb-4 bg-gray-50 p-3 rounded-2xl">
                        <img
                            src={user.image}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-16 h-16 rounded-full border bg-white object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                    </div>

                    {/* User Details Table (7 Key Fields) */}
                    <div className="overflow-hidden border border-gray-200 rounded-2xl">
                        <table className="w-full text-left text-sm">
                            <tbody className="divide-y divide-gray-200">
                                <tr className="bg-gray-50">
                                    <th className="p-3 font-semibold text-gray-600 w-1/3">User ID</th>
                                    <td className="p-3 text-gray-800">{user.id}</td>
                                </tr>
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Email</th>
                                    <td className="p-3 text-gray-800">{user.email}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <th className="p-3 font-semibold text-gray-600">Phone</th>
                                    <td className="p-3 text-gray-800">{user.phone}</td>
                                </tr>
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Gender</th>
                                    <td className="p-3 text-gray-800 capitalize">{user.gender}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <th className="p-3 font-semibold text-gray-600">Birth Date</th>
                                    <td className="p-3 text-gray-800">{user.birthDate || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Address</th>
                                    <td className="p-3 text-gray-800">
                                        {user.address?.address}, {user.address?.city}
                                    </td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <th className="p-3 font-semibold text-gray-600">Company</th>
                                    <td className="p-3 text-gray-800">
                                        {user.company?.name} ({user.company?.title})
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end pt-2">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-4xl hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}