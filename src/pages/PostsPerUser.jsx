import React, { useEffect, useState } from 'react';

const PostsPerUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users for the dropdown select
  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=50')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        if (data.users?.length > 0) {
          setSelectedUserId(data.users[0].id);
        }
      });
  }, []);

  // Fetch posts when selected user changes
  useEffect(() => {
    if (!selectedUserId) return;
    setLoading(true);
    fetch(`https://dummyjson.com/posts/user/${selectedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedUserId]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts Per User</h2>

      {/* User Selector */}
      <div className="max-w-xs">
        <label className="block text-sm font-medium mb-1">Select User:</label>
        <select
          className="w-full p-2 border rounded bg-white"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Posts List */}
      {loading ? (
        <div>Loading user posts...</div>
      ) : userPosts.length === 0 ? (
        <p className="text-gray-500">No posts found for this user.</p>
      ) : (
        <div className="space-y-3">
          {userPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded border shadow-sm">
              <h4 className="font-semibold text-md">{post.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPerUser;