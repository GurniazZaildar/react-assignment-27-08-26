import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUsers } from '../context/UserContext';

export default function AddUser({ initialData = null, isEdit = false, onClose }) {
  const { addUser, updateUser } = useUsers();
  const [usernames, setUsernames] = useState([]);
  const [fetchingUsernames, setFetchingUsernames] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      birthDate: '',
      phone: '',
      height: '',
      weight: '',
    },
  });

  // Fetch usernames dynamically from mock API
  useEffect(() => {
    setFetchingUsernames(true);
    fetch('https://dummyjson.com/users?limit=50')
      .then((res) => res.json())
      .then((data) => {
        const names = data.users ? data.users.map((u) => u.username) : [];
        setUsernames(names);
      })
      .catch(() => setUsernames([]))
      .finally(() => setFetchingUsernames(false));
  }, []);

  // Populate form fields if editing an existing user
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
      if (initialData.height || initialData.weight) {
        setShowAdditionalFields(true);
      }
    }
  }, [initialData, setValue]);

  const onSubmit = (formData) => {
    if (isEdit && initialData?.id) {
      updateUser({ ...formData, id: initialData.id });
    } else {
      addUser(formData);
    }
    if (onClose) onClose();
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-xl font-bold text-gray-800">
          {isEdit ? 'Edit User' : 'Add New User'}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className={`w-full p-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className={`w-full p-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full p-2 border rounded-2xl focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Dynamic Dropdown for Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <select
            {...register('username')}
            className={`w-full p-2 border rounded-2xl bg-white focus:outline-none focus:ring-1 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
          >
            <option value="">
              {fetchingUsernames ? 'Loading usernames...' : 'Select Username'}
            </option>
            {usernames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* DOB & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth*
            </label>
            <input
              type="date"
              {...register('birthDate', { required: 'Please select a username' })}
              className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone*
            </label>
            <input
              type="text"
              {...register('phone', { required: 'Please select a username' })}
              className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Dynamic Fields Toggle */}
        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="toggleExtraFields"
            checked={showAdditionalFields}
            onChange={(e) => setShowAdditionalFields(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="toggleExtraFields" className="text-sm font-medium text-gray-700 cursor-pointer">
            Include Height & Weight details
          </label>
        </div>

        {/* Height & Weight */}
        {showAdditionalFields && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                {...register('height')}
                placeholder="e.g. 175"
                className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                {...register('weight')}
                placeholder="e.g. 70"
                className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-4xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-4xl hover:bg-blue-700 transition"
          >
            {isEdit ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
}