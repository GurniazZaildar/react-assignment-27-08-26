import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading posts...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-semibold text-lg text-blue-600 capitalize">
              {post.title}
            </h3>
            <p className="text-gray-700 text-sm mt-2">{post.body}</p>
            <div className="flex gap-2 mt-3">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;